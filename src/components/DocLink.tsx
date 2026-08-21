"use client";
import { useGlobalState } from "./GlobalState";

export interface DocLinkProps {
    text: string;
    lang: string;
}

export default function DocLink(props:DocLinkProps) {
    const {sitemap} = useGlobalState();
    const href = sitemap?.[props.lang]?.links[props.text.replace(/^\W+|\W+$/g, '')];
    
    if (href) {
        return <a href={href} style={{color:'unset', textDecoration:'underline'}} target="_blank">{props.text}</a>
    } else {
        return <span>{props.text}</span>
    }
}