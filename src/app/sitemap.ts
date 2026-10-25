import type { MetadataRoute } from 'next'
import { DOCUMENT_CONFIG } from '@/config';
import { categories as getGategories, type Article } from '@/utils/document';
import { absoluteUrl, articlePath, categoryPath, homePath } from '@/utils/seo';

export const dynamic = 'force-static'

function latestTime(list:Article[]):Date {
    if (list.length === 0) {
        return new Date();
    }

    return list.reduce((latest, article) => article.state.updatedTime > latest ? article.state.updatedTime : latest, new Date(0));
}

export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles);
    const latest = latestTime(articles);
    const sites:MetadataRoute.Sitemap = [];

    // 首页
    sites.push({
        url: absoluteUrl('/'),
        lastModified: latest,
        changeFrequency: 'daily',
        priority: 1,
    });

    // 首页分页
    const pages = Math.ceil(articles.length / DOCUMENT_CONFIG.pageSize);
    for (let page = 2; page <= pages; page += 1) {
        sites.push({
            url: absoluteUrl(homePath(page)),
            lastModified: latest,
            changeFrequency: 'weekly',
            priority: 0.6,
        });
    }

    for (const category of categories) {
        const categoryLatest = latestTime(category.articles);

        // 分类首页
        sites.push({
            url: absoluteUrl(categoryPath(category.name)),
            lastModified: categoryLatest,
            changeFrequency: 'weekly',
            priority: 0.8,
        });

        // 分类分页
        const categoryPages = Math.ceil(category.articles.length / DOCUMENT_CONFIG.pageSize);
        for (let page = 2; page <= categoryPages; page += 1) {
            sites.push({
                url: absoluteUrl(categoryPath(category.name, page)),
                lastModified: categoryLatest,
                changeFrequency: 'weekly',
                priority: 0.5,
            });
        }

        // 文章
        for (const article of category.articles) {
            sites.push({
                url: absoluteUrl(articlePath(category.name, article.name)),
                lastModified: article.state.updatedTime,
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        }
    }

    return sites;
}
