import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Frame from "@/components/Frame";
import Pagination from "@/components/Pagination";
import { DOCUMENT_CONFIG } from "@/config";
import { categories as getGategories } from "@/utils/document";
import { absoluteUrl } from "@/utils/seo";

export const metadata: Metadata = {
    alternates: {
        canonical: absoluteUrl('/'),
    },
};

export default async function Home() {
    const categories = await getGategories();
    const articles = categories.flatMap(category => category.articles).sort((x, y) => y.state.createdTime.getTime() - x.state.createdTime.getTime());
    const last = Math.ceil(articles.length / DOCUMENT_CONFIG.pageSize);

    return (
        <Frame categories={categories} articles={articles.slice(0,30)}>
            {
                articles.slice(0, DOCUMENT_CONFIG.pageSize).map((article, i) => {
                    return (
                        <ArticleCard key={i} {...article}/>
                    )
                })
            }
            <Pagination
                next={last > 1 ? `/page/2` : undefined}
                current={1}
                total={last}
            />
            
        </Frame>
    );
}
