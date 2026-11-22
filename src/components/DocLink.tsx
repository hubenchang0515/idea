import { primerHref } from "@/utils/primers";

export interface DocLinkProps {
    text: string;
    lang: string;
    href?: string;
    linked?: Set<string>;
}

export default function DocLink(props:DocLinkProps) {
    const href = props.href ?? primerHref(props.text, props.lang);

    if (href && !props.linked?.has(href)) {
        props.linked?.add(href);
        return <a href={href} style={{color:'unset', textDecoration:'underline'}} target="_blank">{props.text}</a>
    } else {
        return <span>{props.text}</span>
    }
}
