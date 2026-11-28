"use client";

import NextLink, { useLinkStatus } from "next/link";
import { SITE_CONFIG } from '@/config';
import React from "react";
import { createPortal } from "react-dom";

export interface LinkProps {
    className?: string;
    href?: string;
    title?: string;
    children?: React.ReactNode;
}

function NavigationLoading() {
    const { pending } = useLinkStatus();

    if (!pending) return null;

    return createPortal(
        <div role="status" className="navigation-loading glass-strong pointer-events-none fixed top-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <span aria-hidden="true" className="size-4 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent)] motion-safe:animate-spin" />
            正在加载…
        </div>,
        document.body,
    );
}

export default function Link(props:LinkProps) {

    if (!props.href) {
        return <NextLink className={props.className ?? "cursor-default text-transparent"} prefetch={false} {...props} href="" onClick={(ev)=>ev.preventDefault()}/>
    }

    if (props.href.toString().startsWith("http") && !props.href.toString().startsWith(SITE_CONFIG.origin + SITE_CONFIG.basePath)) {
        return <NextLink className={props.className ?? "transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"} prefetch={false} target="_blank" rel="noopener" href={props.href} {...props} />
    }
    
    return (
        <NextLink className={props.className ?? "transition-colors duration-200 hover:text-emerald-600 dark:hover:text-emerald-400"} prefetch={false} {...props} href={props.href}>
            {props.children}
            <NavigationLoading />
        </NextLink>
    )
}
