import { OWNER_CONFIG, SITE_CONFIG } from '@/config';

export const SITE_TITLE = `${SITE_CONFIG.brand}`;
export const SITE_DESCRIPTION = `${SITE_CONFIG.brand}：${OWNER_CONFIG.name} 的个人博客，记录编程、开发、工具与生活中的想法。`;

// 站内绝对地址
export function absoluteUrl(pathname = '/'): string {
    const origin = SITE_CONFIG.origin.replace(/\/+$/, '');
    const basePath = SITE_CONFIG.basePath.replace(/\/+$/, '');
    const suffix = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${origin}${basePath}${suffix}`;
}

// 首页地址（分页）
export function homePath(page = 1): string {
    return page > 1 ? `/page/${page}` : '/';
}

// 分类地址（分页）
export function categoryPath(name:string, page = 1): string {
    const base = `/${encodeURIComponent(name)}`;
    return page > 1 ? `${base}/page/${page}` : base;
}

// 文章地址
export function articlePath(category:string, article:string): string {
    return `/${encodeURIComponent(category)}/${encodeURIComponent(article)}`;
}

// 从 Markdown 中提取纯文本摘要
export function excerpt(markdown:string, maxLength = 160): string {
    const text = markdown
        .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/~~~[\s\S]*?~~~/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^\s*>\s?/gm, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/[*_~`]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}…`;
}

export const OG_IMAGE = {
    url: absoluteUrl('/og.png'),
    width: 1200,
    height: 630,
    alt: SITE_TITLE,
};
