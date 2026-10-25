import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Frame from "@/components/Frame";
import JsonLd from "@/components/JsonLd";
import Pagination from "@/components/Pagination";
import { DOCUMENT_CONFIG, SITE_CONFIG } from "@/config";
import { articles as getArticles, categories as getGategories } from "@/utils/document";
import { absoluteUrl, categoryPath, excerpt, OG_IMAGE } from "@/utils/seo";

export interface PageParams {
    category:string;    // 分类： 例如 Python 等
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const category of await getGategories()) {
        if (process.env.NODE_ENV === 'development') {
            paramsList.push({
                category: encodeURIComponent(category.name),
            });
        } else {
            paramsList.push({
                category: category.name,
            });
        }
    }
    
    return paramsList;
}

function categoryDescription(name:string, list:{name:string}[]): string {
    const samples = list.slice(0, 3).map(item => item.name.replace(/\.md$/, '')).join('、');
    return excerpt(`「${name}」分类共收录 ${list.length} 篇文章${samples ? `，包括 ${samples} 等` : ''}。`, 150);
}

export async function generateMetadata({params}:{params:Promise<PageParams>}):Promise<Metadata> {
    const path = await params;
    const name = decodeURIComponent(path.category);
    const list = await getArticles(name).catch(() => []);
    const title = `${name} 分类`;
    const description = categoryDescription(name, list);
    const canonical = absoluteUrl(categoryPath(name));

    return {
        title,
        description,
        keywords: [name, '编程', '开发笔记', SITE_CONFIG.brand],
        alternates: {
            canonical,
        },
        openGraph: {
            type: 'website',
            locale: 'zh_CN',
            url: canonical,
            siteName: SITE_CONFIG.brand,
            title: `${title} | ${SITE_CONFIG.brand}`,
            description,
            images: [OG_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [OG_IMAGE.url],
        },
        robots: list.length > 0 ? undefined : { index: false, follow: true },
    };
}

export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = await params;
    const name = decodeURIComponent(path.category);
    const categories = await getGategories();
    const category = categories.find((item) => item.name === name);
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const last = Math.ceil((category?.articles.length??0) / DOCUMENT_CONFIG.pageSize);
    const canonical = absoluteUrl(categoryPath(name));
    const description = categoryDescription(name, category?.articles ?? []);

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${canonical}#collection`,
            url: canonical,
            name: `${name} 分类`,
            description,
            inLanguage: 'zh-CN',
            about: name,
            isPartOf: {
                '@type': 'WebSite',
                '@id': `${absoluteUrl('/')}#website`,
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: '首页',
                    item: absoluteUrl('/'),
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name,
                    item: canonical,
                },
            ],
        },
    ];

    return (
        <Frame categories={categories} articles={articles.slice(0, 30)}>
            <JsonLd data={jsonLd}/>
            <Pagination
                next={last > 1 ? categoryPath(name, 2) : undefined}
                current={1}
                total={last}
            />
            {
                category?.articles.slice(0, DOCUMENT_CONFIG.pageSize).map((article, i) => {
                    return (
                        <ArticleCard key={i} {...article}/>
                    )
                })
            }
            <Pagination
                next={last > 1 ? categoryPath(name, 2) : undefined}
                current={1}
                total={last}
            />
        </Frame>
    )
}
