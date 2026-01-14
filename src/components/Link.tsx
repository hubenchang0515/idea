"use client";

import NextLink from "next/link";
import { SITE_CONFIG } from '@/config';
import React from "react";

export interface LinkProps {
    className?: string;
    href: string;
    children?: React.ReactNode;
}

export default function Link(props:LinkProps) {

    if (!props.href) {
        return <NextLink {...props} href="#"/>
    }

    if (props.href.toString().startsWith("http") && !props.href.toString().startsWith(SITE_CONFIG.origin + SITE_CONFIG.basePath)) {
        return <NextLink target="_blank" rel="noopener" {...props}/>
    }
    
    return (
        <NextLink {...props}/>
    )
}