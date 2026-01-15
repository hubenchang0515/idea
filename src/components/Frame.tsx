import { LINKS, OWNER_CONFIG } from "@/config";
import React from "react";
import Link from "./Link";
import { Article, Category } from "@/utils/document";

export interface FrameProps
{
    categories?: Category[];
    articles?: Article[];
    children?: React.ReactNode;
}

export default function Frame(props:FrameProps)
{
    return (
        <div>
            <main className="w-full max-w-450 m-auto p-2 flex flex-col md:flex-row gap-2">
                <aside className="order-2 md:order-1 md:w-80">
                    <div className="flex flex-col gap-2">
                        <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2'>
                            <Link href="/"><img src={OWNER_CONFIG.avatar} className="w-40 m-auto"/></Link>
                            <p className="text-xl font-bold"><Link href="/">{OWNER_CONFIG.name}</Link></p>
                            <p className="text-gray-400"><Link href={`https://github.com/${OWNER_CONFIG.username}`}>{OWNER_CONFIG.username}</Link></p>
                            <p>{OWNER_CONFIG.brief}</p>
                        </div>
                        <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-2'>
                            {
                                LINKS.map((item, i) => {
                                    return (
                                        <Link key={i} href={item.url} title={item.title} className="hover:bg-pink-100 dark:hover:bg-emerald-500">
                                            <img src={item.icon} className="p-1" />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        {
                            props.categories && 
                            <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2 flex flex-col gap-2'>
                                {
                                    props.categories?.map((item, i) => {
                                        return (
                                            <Link key={i} className='px-1 hover:bg-pink-100 dark:hover:bg-emerald-500 flex justify-between' href={`/${encodeURIComponent(item.name)}`} title={item.name}>
                                                <span className="truncate">{item.name}</span>
                                                <span>{item.articles.length}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </aside>
                <div className="order-1 md:order-2 flex-1 flex flex-col gap-2 overflow-hidden">
                    { props.children }
                </div>
                <aside className="order-3 md:w-80">
                    <div className="flex flex-col gap-2">
                    {
                        props.articles && 
                        <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2 flex flex-col gap-2'>
                            {
                                props.articles?.map((item, i) => {
                                    return (
                                        <Link key={i} title={item.name.replace(/\.md$/, '')} className='truncate px-1 hover:bg-pink-100 dark:hover:bg-emerald-500' href={`/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`}>{item.name.replace(/\.md$/, '')}</Link>
                                    )
                                })
                            }
                        </div>
                    }
                    </div>
                </aside>
            </main>
        </div>
    )
}