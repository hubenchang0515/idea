import Discussion from "@/components/Discussion";
import Frame from "@/components/Frame";
import Markdown from "@/components/Markdown";
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
    const text = await content(decodeURIComponent(path.category), decodeURIComponent(path.article));
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());

    return (
        <Frame categories={categories} articles={articles.slice(0,30)}>
            <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2'>
                <Markdown content={text}/>
            </div>
            <Discussion/>
        </Frame>
    )
}