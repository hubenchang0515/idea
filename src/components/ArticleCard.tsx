import { content, type Article as ArticleProps} from '@/utils/document'
import Markdown from './Markdown';
import Link from './Link';
import Card from './Card';

export default async function ArticleCard(props:ArticleProps) {
    const text = await content(props.category, props.name);
    const href = `/${encodeURIComponent(props.category)}/${encodeURIComponent(props.name)}`;
    const previewLines = text.split('\n').slice(0, 10);
    const codeTruncated = previewLines.filter(line => /^\s{0,3}(?:```|~~~)/.test(line)).length % 2 === 1;
    const date = new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(props.state.createdTime);

    return (
        <Card className="glass card-hover group overflow-hidden rounded-2xl p-0">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-2.5">
                <Link
                    href={`/${encodeURIComponent(props.category)}`}
                    className="pill pill-accent hover:bg-sky-500 hover:text-white"
                >
                    {props.category}
                </Link>
                <span className="text-xs text-[var(--muted)]">{date}</span>
            </div>
            <div className="article-preview px-4 py-3">
                <Markdown 
                    content={previewLines.join('\n')}
                    href={href} 
                />
                {
                    codeTruncated &&
                    <Link
                        href={href}
                        className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-[var(--border)] bg-sky-500/5 px-3 py-2 text-xs leading-relaxed text-[var(--muted)] transition-colors hover:border-sky-400/60 hover:bg-sky-500/10 hover:text-[var(--foreground)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="mt-0.5 size-3.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        代码块被截断。
                    </Link>
                }
            </div>
            <Link 
                href={href} 
                className="flex items-center justify-center gap-1.5 border-t border-[var(--border)] px-4 py-2.5 text-sm text-[var(--muted)] transition-colors hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
                查看全文
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </Link>
        </Card>
    )
}
