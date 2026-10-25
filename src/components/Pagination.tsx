import HomeIcon from "@/assets/icons/HomeIcon";
import Link from "./Link";

export interface PaginationProps {
    prev?: string;
    next?: string;
    current?: number;
    total?: number;
}

function ArrowLeft() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    )
}

function ArrowRight() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
    )
}

export default function Pagination(props:PaginationProps) {
    return (
        <div className="glass flex items-center justify-between gap-2 rounded-2xl px-2 py-2 sm:px-3">
            {
                props.prev
                    ? <Link href={props.prev} className="pagination-btn"><ArrowLeft/>上一页</Link>
                    : <span className="pagination-btn pagination-disabled"><ArrowLeft/>上一页</span>
            }
            <div className="flex items-center gap-1.5">
                <Link href="/" title="返回首页" className="pagination-home"><HomeIcon/></Link>
                {
                    props.current !== undefined && props.total !== undefined &&
                    <span className="text-xs tabular-nums text-[var(--muted)]">
                        <span className="font-semibold text-[var(--foreground)]">{props.current}</span>
                        <span className="mx-1 opacity-60">/</span>
                        {props.total}
                    </span>
                }
            </div>
            {
                props.next
                    ? <Link href={props.next} className="pagination-btn">下一页<ArrowRight/></Link>
                    : <span className="pagination-btn pagination-disabled">下一页<ArrowRight/></span>
            }
        </div>
    )
}
