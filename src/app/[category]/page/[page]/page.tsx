import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Frame from "@/components/Frame";
import Pagination from "@/components/Pagination";
import { DOCUMENT_CONFIG, SITE_CONFIG } from "@/config";
import { articles as getArticles, categories as getGategories } from "@/utils/document";
import { absoluteUrl, categoryPath, excerpt, OG_IMAGE } from "@/utils/seo";

export interface PageParams {
    category:string;    // 分类： 例如 Python 等
    page:string;        // 页码
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    const categories = await getGategories();
    for (const category of categories) {
        for (let i = 1; i <= Math.ceil(category.articles.length / DOCUMENT_CONFIG.pageSize); i += 1) {
            if (process.env.NODE_ENV === 'development') {
                paramsList.push({
                    category: encodeURIComponent(category.name),
                    page: `${i}`,
                });
            } else {
                paramsList.push({
                    category: category.name,
                    page: `${i}`,
                });
            }
            
        }
    }
    
    
    return paramsList;
}

export async function generateMetadata({params}:{params:Promise<PageParams>}):Promise<Metadata> {
    const path = await params;
    const name = decodeURIComponent(path.category);
    const page = Math.max(1, Number(path.page) || 1);
    const list = await getArticles(name).catch(() => []);
    const total = Math.max(1, Math.ceil(list.length / DOCUMENT_CONFIG.pageSize));
    const isFirst = page <= 1;
    const canonical = isFirst ? absoluteUrl(categoryPath(name)) : absoluteUrl(categoryPath(name, page));
    const title = isFirst ? `${name} 分类` : `${name} 分类 - 第 ${page} 页`;
    const samples = list.slice((page - 1) * DOCUMENT_CONFIG.pageSize, page * DOCUMENT_CONFIG.pageSize)
        .slice(0, 3)
        .map(item => item.name.replace(/\.md$/, ''))
        .join('、');
    const description = excerpt(`「${name}」分类第 ${page} 页${samples ? `：${samples} 等` : ''}，共 ${total} 页。`, 150);

    return {
        title,
        description,
        keywords: [name, `第 ${page} 页`, '编程', '开发笔记', SITE_CONFIG.brand],
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
    const name = decodeURIComponent(path.category);
    const category = categories.find((item) => item.name === name);
    const page = Number(path.page);
    const last = Math.ceil((category?.articles.length??0) / DOCUMENT_CONFIG.pageSize);

    return (
        <Frame categories={categories} articles={articles.slice(0, 30)}>
            <Pagination
                prev={page > 1 ? categoryPath(name, page-1) : undefined}
                next={page < last ? categoryPath(name, page+1) : undefined}
                current={page}
                total={last}
            />
            {
                category?.articles.slice((page - 1)*DOCUMENT_CONFIG.pageSize, (page)*DOCUMENT_CONFIG.pageSize).map((article, i) => {
                    return (
                        <ArticleCard key={i} {...article}/>
                    )
                })
            }
            <Pagination
                prev={page > 1 ? categoryPath(name, page-1) : undefined}
                next={page < last ? categoryPath(name, page+1) : undefined}
                current={page}
                total={last}
            />
        </Frame>
    );
}
