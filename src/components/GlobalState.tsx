'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SitemapNode {
    links: Record<string, string>;
}

let SITEMAP: Record<string, SitemapNode> = {};

// 匹配列表
const PATTERNS = [
    {
        lang: ["html"],
        regexps: [
            /https:\/\/xplanc\.org\/primers\/document\/zh\/03\.HTML\/EX\.HTML%20%E5%85%83%E7%B4%A0\/EX\.(.+?)\.md/g
        ],
    },

    {
        lang: ["python", "py"],
        regexps: [
            /https:\/\/xplanc\.org\/primers\/document\/zh\/02\.Python\/EX\.%E5%86%85%E5%BB%BA%E5%87%BD%E6%95%B0\/EX\.(.+?)\.md/g
        ],
    },

    {
        lang: ["lua"],
        regexps: [
            /https:\/\/xplanc\.org\/primers\/document\/zh\/09\.Lua\/91\.%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0\/EX\.(.+?)\.md/g,
            /https:\/\/xplanc\.org\/primers\/document\/zh\/09\.Lua\/92\.%E5%86%85%E7%BD%AE%E6%A8%A1%E5%9D%97\/EX\.(.+?)-module\.md/g,
        ],
    },

    {
        lang: ["c", "cpp", "c++"],
        regexps: [
            /https:\/\/xplanc\.org\/primers\/document\/zh\/06\.C\/EX\.%E6%A0%87%E5%87%86%E5%BA%93\.hide\/EX\.(.+?)\.md/g,
            /https:\/\/xplanc\.org\/primers\/document\/zh\/06\.C\/99\.API%20%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C\/EX\.(.+?)\.md/g,
        ]
    },

    {
        lang: ["bash", "shell", "sh"],
        regexps: [
            /https:\/\/xplanc\.org\/primers\/document\/zh\/10.Bash\/90\.%E5%B8%AE%E5%8A%A9%E6%89%8B%E5%86%8C\/EX\.(.+?)\.md/g
        ],
    },
]

export interface GlobalStateProps {
    sitemap?: Record<string, SitemapNode>;
    setSitemap?: (v?:Record<string, SitemapNode>)=>void;
}

export const GlobalState = createContext<GlobalStateProps>({});

export function useGlobalState() {
    return useContext(GlobalState);
}

export interface GlobalStateProviderProps {
    children?: React.ReactNode;
}

export function GlobalStateProvider(props:GlobalStateProviderProps) {
    const [sitemap, setSitemap] = useState<Record<string, SitemapNode>>();

    useEffect(() => {
        fetch("https://xplanc.org/primers/sitemap.xml").then((response) => {
            response.text().then((data) => {
                let sitemap: Record<string, SitemapNode> = {};

                for (const pattern of PATTERNS) {
                    let links:[string, string][] = []

                    for (const regexp of pattern.regexps) {
                        const matches = String(data).matchAll(regexp);
                        links = links.concat(Array.from(matches).map(match => [match[1], match[0]]));  
                    }

                    for (const lang of pattern.lang) {
                        sitemap[lang] = {
                        links: Object.fromEntries(links),
                    }
                    }
                    
                }

                setSitemap(sitemap);
            });
        });
    }, []);

    return (
        <GlobalState.Provider
            value={{
                sitemap,
                setSitemap
            }}
        >
            {props.children}
        </GlobalState.Provider>
    )
}