import { LINKS, OWNER_CONFIG, SITE_CONFIG } from "@/config";
import React from "react";
import Link from "./Link";
import Card from './Card';
import GitHubIcon from "@/assets/icons/GitHubIcon";
import { Article, Category } from "@/utils/document";

export interface FrameProps
{
    categories?: Category[];
    articles?: Article[];
    children?: React.ReactNode;
}

export default function Frame(props:FrameProps)
{
    const year = new Date().getFullYear();

    return (
        <div className="flex min-h-dvh flex-col">
            <header className="px-2 pt-2">
                <div className="glass mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-2xl px-3 py-2 sm:px-4">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <img src={`${SITE_CONFIG.basePath}/favicon.svg`} alt="" className="size-9 transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" />
                        <span className="flex flex-col leading-tight">
                            <span className="text-base font-bold tracking-wide text-[var(--foreground)]">{SITE_CONFIG.title}</span>
                            <span className="text-[11px] text-[var(--muted)]">{SITE_CONFIG.description}</span>
                        </span>
                    </Link>
                    <nav className="flex items-center gap-0.5 text-sm">
                        <Link href="/" className="nav-pill">首页</Link>
                        <Link href={SITE_CONFIG.repo} className="nav-pill" title="GitHub 仓库">
                            <GitHubIcon/>
                            <span className="hidden sm:inline">GitHub</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-2 p-2 md:flex-row md:items-start">
                <aside className="order-2 w-full md:order-1 md:w-64 xl:w-80">
                    <div className="flex flex-col gap-2">
                        <Card className="glass card-hover rounded-2xl p-4 text-center">
                            <Link href="/" className="group mx-auto block w-28">
                                <span className="block rounded-full bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 p-1 shadow-lg shadow-sky-500/20">
                                    <img src={OWNER_CONFIG.avatar} alt={OWNER_CONFIG.name} className="aspect-square w-full rounded-full bg-white object-cover transition-transform duration-300 group-hover:scale-[1.03] dark:bg-slate-800"/>
                                </span>
                            </Link>
                            <p className="mt-3 text-xl font-bold leading-tight">
                                <Link href="/">{OWNER_CONFIG.name}</Link>
                            </p>
                            <p className="mt-0.5 text-sm text-[var(--muted)]">
                                <Link href={`https://github.com/${OWNER_CONFIG.username}`}>@{OWNER_CONFIG.username}</Link>
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{OWNER_CONFIG.brief}</p>
                        </Card>
                        <Card className="glass rounded-2xl p-3">
                            <p className="sidebar-title">作品</p>
                            <div className='grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2'>
                                {
                                    LINKS.map((item, i) => {
                                        return (
                                            <Link key={i} href={item.url} title={item.title} className="group grid place-items-center rounded-xl p-1 transition duration-200 hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-white/10">
                                                <img src={item.icon} alt={item.title} className="size-10 rounded-lg" />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                        {
                            props.categories && 
                            <Card className="glass rounded-2xl p-3">
                                <p className="sidebar-title pb-0">分类</p>
                                <div className='mt-2 flex flex-col gap-0.5'>
                                    {
                                        props.categories?.map((item, i) => {
                                            return (
                                                <Link key={i} href={`/${encodeURIComponent(item.name)}`} title={item.name} className="group flex items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-sm text-[var(--muted)] transition-colors hover:bg-white/70 hover:text-[var(--foreground)] dark:hover:bg-white/10">
                                                    <span className="truncate">{item.name}</span>
                                                    <span className="pill shrink-0 group-hover:bg-emerald-500 group-hover:text-white">{item.articles.length}</span>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </Card>
                        }
                    </div>
                </aside>
                <div className="order-1 flex w-full min-w-0 flex-1 flex-col gap-2 overflow-hidden md:order-2">
                    { props.children }
                </div>
                <aside className="order-3 w-full md:w-64 xl:w-80">
                    <div className="flex flex-col gap-2">
                    {
                        props.articles && 
                        <Card className="glass rounded-2xl p-3">
                            <p className="sidebar-title">最新文章</p>
                            <div className='flex flex-col gap-0.5'>
                                {
                                    props.articles?.map((item, i) => {
                                        return (
                                            <Link key={i} title={item.name.replace(/\.md$/, '')} href={`/${encodeURIComponent(item.category)}/${encodeURIComponent(item.name)}`} className="group flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm text-[var(--muted)] transition-colors hover:bg-white/70 hover:text-[var(--foreground)] dark:hover:bg-white/10">
                                                <span className="size-1.5 shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 opacity-60 transition-opacity group-hover:opacity-100" />
                                                <span className="min-w-0 flex-1 truncate">{item.name.replace(/\.md$/, '')}</span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    }
                    </div>
                </aside>
            </main>
            <footer className="mx-auto w-full max-w-[1600px] px-2 pb-4 pt-2">
                <div className="glass flex flex-col items-center justify-between gap-2 rounded-2xl px-4 py-3 text-xs text-[var(--muted)] sm:flex-row">
                    <p>© {year} {OWNER_CONFIG.name} · {SITE_CONFIG.title}</p>
                    <p className="flex items-center gap-2">
                        <span>{SITE_CONFIG.description}</span>
                        <span className="opacity-40">/</span>
                        <Link href={SITE_CONFIG.repo} className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">源码</Link>
                    </p>
                </div>
            </footer>
        </div>
    )
}
