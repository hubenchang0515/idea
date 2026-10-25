import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Frame from "@/components/Frame";
import Pagination from "@/components/Pagination";
import { DOCUMENT_CONFIG, SITE_CONFIG } from "@/config";
import { categories as getGategories } from "@/utils/document";
import { absoluteUrl, excerpt, homePath, OG_IMAGE, SITE_DESCRIPTION } from "@/utils/seo";

export interface PageParams {
    page:string;    // 页码
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    for (let i = 1; i <= Math.ceil(articles.length / DOCUMENT_CONFIG.pageSize); i += 1) {
        paramsList.push({
            page: `${i}`,
        });
    }
    
    return paramsList;
}

export async function generateMetadata({params}:{params:Promise<PageParams>}):Promise<Metadata> {
    const path = await params;
    const page = Math.max(1, Number(path.page) || 1);
    const categories = await getGategories();
    const list = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const total = Math.max(1, Math.ceil(list.length / DOCUMENT_CONFIG.pageSize));
    const isFirst = page <= 1;
    const canonical = isFirst ? absoluteUrl('/') : absoluteUrl(homePath(page));
    const title = isFirst ? '首页' : `第 ${page} 页`;
    const samples = list.slice((page - 1) * DOCUMENT_CONFIG.pageSize, page * DOCUMENT_CONFIG.pageSize)
        .slice(0, 3)
        .map(item => item.name.replace(/\.md$/, ''))
        .join('、');
    const description = excerpt(isFirst
        ? SITE_DESCRIPTION
        : `${SITE_CONFIG.brand}文章列表第 ${page} 页${samples ? `：${samples} 等` : ''}，共 ${total} 页。`, 150);

    return {
        title,
        description,
        keywords: [SITE_CONFIG.brand, `第 ${page} 页`, '编程', '开发笔记', '技术博客'],
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
        robots: isFirst || page > total ? { index: false, follow: true } : undefined,
    };
}

export default async function Page({params}:{params:Promise<PageParams>}) {
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const path = await params;
    const page = Number(path.page);
    const last = Math.ceil(articles.length / DOCUMENT_CONFIG.pageSize);

    return (
        <Frame categories={categories} articles={articles.slice(0, 30)}>
            <Pagination
                prev={page > 1 ? homePath(page-1) : undefined}
                next={page < last ? homePath(page+1) : undefined}
                current={page}
                total={last}
            />
            {
                articles.slice((page - 1)*DOCUMENT_CONFIG.pageSize, (page)*DOCUMENT_CONFIG.pageSize).map((article, i) => {
                    return (
                        <ArticleCard key={i} {...article}/>
                    )
                })
            }
            <Pagination
                prev={page > 1 ? homePath(page-1) : undefined}
                next={page < last ? homePath(page+1) : undefined}
                current={page}
                total={last}
            />
        </Frame>
    );
}
