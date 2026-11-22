import HomeIcon from "@/assets/icons/HomeIcon";
import Link from "./Link";

export interface PaginationProps {
    prev?: string;
    next?: string;
    prevLabel?: string;
    nextLabel?: string;
    showCenter?: boolean;
    stackOnMobile?: boolean;
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
    const prevLabel = props.prevLabel ?? '上一页';
    const nextLabel = props.nextLabel ?? '下一页';
    const width = props.stackOnMobile ? 'max-w-full sm:max-w-[45%]' : 'max-w-[45%]';
    const direction = props.stackOnMobile ? 'flex-col items-stretch sm:flex-row sm:items-center' : 'items-center';
    const prevJustify = props.stackOnMobile ? 'relative justify-center sm:justify-start' : '';
    const nextJustify = props.stackOnMobile ? 'relative justify-center sm:justify-end' : 'justify-end';
    const prevArrow = props.stackOnMobile ? 'absolute left-3 sm:static' : '';
    const nextArrow = props.stackOnMobile ? 'absolute right-3 sm:static' : '';

    return (
        <div className={`glass flex justify-between gap-2 rounded-2xl px-2 py-2 sm:px-3 ${direction}`}>
            {
                props.prev
                    ? <Link href={props.prev} title={prevLabel} className={`pagination-btn ${width} min-w-0 ${prevJustify}`}><span className={prevArrow}><ArrowLeft/></span><span className="min-w-0 truncate">{prevLabel}</span></Link>
                    : <span className={`pagination-btn pagination-disabled ${width} min-w-0 ${prevJustify} ${props.stackOnMobile ? 'self-start sm:self-auto' : ''}`}><span className={prevArrow}><ArrowLeft/></span></span>
            }
            {
                props.showCenter !== false &&
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
            }
            {
                props.next
                    ? <Link href={props.next} title={nextLabel} className={`pagination-btn ${width} min-w-0 ${nextJustify}`}><span className="min-w-0 truncate">{nextLabel}</span><span className={nextArrow}><ArrowRight/></span></Link>
                    : <span className={`pagination-btn pagination-disabled ${width} min-w-0 ${nextJustify} ${props.stackOnMobile ? 'self-end sm:self-auto' : ''}`}><span className={nextArrow}><ArrowRight/></span></span>
            }
        </div>
    )
}
