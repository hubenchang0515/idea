import ArticleCard from "@/components/ArticleCard";
import Frame from "@/components/Frame";
import Link from "@/components/Link";
import { DOCUMENT_CONFIG } from "@/config";
import { categories as getGategories } from "@/utils/document";

export default async function Home() {
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());

    return (
        <Frame categories={categories} articles={articles.slice(0,30)}>
            {
                articles.slice(0, DOCUMENT_CONFIG.pageSize).map((article, i) => {
                    return (
                        <ArticleCard key={i} {...article}/>
                    )
                })
            }
            <div className="bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2 flex justify-between">
                <span></span>
                <Link href="/page/2">下一页</Link>
            </div>
        </Frame>
    );
}
