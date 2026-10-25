import HomeIcon from "@/assets/icons/HomeIcon";
import ListIcon from "@/assets/icons/ListIcon";
import Card from "@/components/Card";
import Discussion from "@/components/Discussion";
import Frame from "@/components/Frame";
import Link from "@/components/Link";
import Markdown from "@/components/Markdown";
import { SITE_CONFIG } from "@/config";
import { categories as getGategories, content } from "@/utils/document";

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

export default async function Page({params}:{params:Promise<PageParams>}) {
    const path = await params;
    const categoryName = decodeURIComponent(path.category);
    const articleName = decodeURIComponent(path.article);
    const text = await content(categoryName, articleName);
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const article = categories.find((item) => item.name === categoryName)?.articles.find((item) => item.name === articleName);
    const href = `${SITE_CONFIG.origin}${SITE_CONFIG.basePath}/${path.category}/${path.article}`;
    const title = articleName.replace(/\.md$/, '');
    const categoryHref = `/${path.category}`;
    const created = article ? new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(article.state.createdTime) : undefined;

    return (
        <Frame categories={categories} articles={articles.slice(0,30)}>
            <Card className="glass overflow-hidden rounded-2xl p-0">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
                    <nav className="flex min-w-0 items-center gap-1.5 text-xs text-[var(--muted)]">
                        <Link href="/" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">首页</Link>
                        <span className="opacity-40">/</span>
                        <Link href={categoryHref} className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">{categoryName}</Link>
                        <span className="opacity-40">/</span>
                        <span className="truncate text-[var(--foreground)] opacity-80">{title}</span>
                    </nav>
                    <div className="flex items-center gap-1 text-[var(--muted)]">
                        {
                            created &&
                            <span className="mr-1 hidden text-xs sm:inline">{created}</span>
                        }
                        <Link href="/" className="icon-btn" title="返回首页"><HomeIcon/></Link>
                        <Link href={categoryHref} className="icon-btn" title="分类列表"><ListIcon/></Link>
                    </div>
                </div>
                <div className="px-4 py-3 sm:px-6">
                    <Markdown content={text} href={href}/>
                </div>
            </Card>
            <Discussion/>
        </Frame>
    )
}
