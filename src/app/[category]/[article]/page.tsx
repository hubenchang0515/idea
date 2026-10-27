import type { Metadata } from "next";
import HomeIcon from "@/assets/icons/HomeIcon";
import ListIcon from "@/assets/icons/ListIcon";
import Card from "@/components/Card";
import Discussion from "@/components/Discussion";
import Frame from "@/components/Frame";
import JsonLd from "@/components/JsonLd";
import Link from "@/components/Link";
import Markdown from "@/components/Markdown";
import { OWNER_CONFIG, SITE_CONFIG } from "@/config";
import { categories as getGategories, content, state } from "@/utils/document";
import { absoluteUrl, articlePath, categoryPath, excerpt, OG_IMAGE } from "@/utils/seo";

export interface PageParams {
    category:string;    // 分类： 例如 Python 等
    article:string;     // 文章： xxx.md
}

// 生成静态页面路径
export async function generateStaticParams() {
    const paramsList:PageParams[] = []
    for (const category of await getGategories()) {
        for (const article of category.articles) {
            if (process.env.NODE_ENV === 'development') {
                paramsList.push({
                    category: encodeURIComponent(category.name),
                    article: encodeURIComponent(article.name),
                });
            } else {
                paramsList.push({
                    category: category.name,
                    article: article.name,
                });
            }
        }
    }
    
    return paramsList;
}

export async function generateMetadata({params}:{params:Promise<PageParams>}):Promise<Metadata> {
    const path = await params;
    const categoryName = decodeURIComponent(path.category);
    const articleName = decodeURIComponent(path.article);
    const title = articleName.replace(/\.md$/, '');

    try {
        const [markdown, articleState] = await Promise.all([
            content(categoryName, articleName),
            state(categoryName, articleName),
        ]);
        const description = excerpt(markdown.replace(/^#\s+.*\r?\n/, ''), 150);
        const canonical = absoluteUrl(articlePath(categoryName, articleName));
        const publishedTime = articleState.createdTime.toISOString();
        const modifiedTime = articleState.updatedTime.toISOString();

        return {
            title,
            description,
            keywords: [title, categoryName, '编程', '开发笔记', SITE_CONFIG.brand],
            alternates: {
                canonical,
            },
            openGraph: {
                type: 'article',
                locale: 'zh_CN',
                url: canonical,
                siteName: SITE_CONFIG.brand,
                title,
                description,
                publishedTime,
                modifiedTime,
                authors: [OWNER_CONFIG.name],
                section: categoryName,
                tags: [categoryName],
                images: [OG_IMAGE],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [OG_IMAGE.url],
            },
        };
    } catch {
        return {
            title,
            robots: { index: false, follow: true },
        };
    }
}

export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = await params;
    const categoryName = decodeURIComponent(path.category);
    const articleName = decodeURIComponent(path.article);
    const text = await content(categoryName, articleName);
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const article = categories.find((item) => item.name === categoryName)?.articles.find((item) => item.name === articleName);
    const canonical = absoluteUrl(articlePath(categoryName, articleName));
    const title = articleName.replace(/\.md$/, '');
    const categoryHref = categoryPath(categoryName);
    const description = excerpt(text.replace(/^#\s+.*\r?\n/, ''), 200);
    const created = article ? new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(article.state.createdTime) : undefined;

    const personId = `${absoluteUrl('/')}#person`;
    const siteId = `${absoluteUrl('/')}#website`;
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${canonical}#article`,
            headline: title,
            name: title,
            description,
            url: canonical,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonical,
            },
            datePublished: article?.state.createdTime.toISOString(),
            dateModified: article?.state.updatedTime.toISOString(),
            inLanguage: 'zh-CN',
            articleSection: categoryName,
            author: {
                '@type': 'Person',
                '@id': personId,
                name: OWNER_CONFIG.name,
                url: OWNER_CONFIG.url,
            },
            publisher: {
                '@type': 'Person',
                '@id': personId,
                name: OWNER_CONFIG.name,
                url: OWNER_CONFIG.url,
            },
            isPartOf: {
                '@type': 'WebSite',
                '@id': siteId,
                name: SITE_CONFIG.brand,
                url: absoluteUrl('/'),
            },
            image: [OG_IMAGE.url],
            keywords: [categoryName, '编程', '开发笔记'].join(', '),
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
                    name: categoryName,
                    item: absoluteUrl(categoryPath(categoryName)),
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: title,
                    item: canonical,
                },
            ],
        },
    ];

    return (
        <Frame categories={categories} articles={articles.slice(0,30)}>
            <JsonLd data={jsonLd}/>
            <Card className="glass overflow-hidden rounded-2xl p-0">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
                    <nav className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-xs text-[var(--muted)]">
                        <Link href="/" className="shrink-0 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">首页</Link>
                        <span className="shrink-0 opacity-40">/</span>
                        <Link href={categoryHref} className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">{categoryName}</Link>
                        <span className="shrink-0 opacity-40">/</span>
                        <span className="truncate text-[var(--foreground)] opacity-80">{title}</span>
                    </nav>
                    <div className="flex items-center gap-1 text-[var(--muted)]">
                        {
                            created &&
                            <span className="mr-1 hidden text-xs sm:inline">{created}</span>
                        }
                        <Link href="/" className="icon-btn hidden sm:inline-flex" title="返回首页"><HomeIcon/></Link>
                        <Link href={categoryHref} className="icon-btn hidden sm:inline-flex" title="分类列表"><ListIcon/></Link>
                    </div>
                </div>
                <div className="px-4 py-3 sm:px-6">
                    <Markdown content={text} href={canonical}/>
                </div>
            </Card>
            <Discussion/>
        </Frame>
    )
}
