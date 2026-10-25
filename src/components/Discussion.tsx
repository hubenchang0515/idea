"use client";
import Giscus from '@giscus/react';
import Card from './Card';

export default function Discussion() {
    return (
        <Card className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                <span className="h-4 w-1 rounded-full bg-gradient-to-b from-sky-400 to-emerald-400"></span>
                评论
            </div>
            <Giscus
                id="comments"
                repo="hubenchang0515/comments"
                repoId="R_kgDOQCfF2Q"
                category="Announcements"
                categoryId="DIC_kwDOQCfF2c4CwpFg"
                mapping="url"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme='preferred_color_scheme'
                lang='zh-CN'
                loading="lazy"
                strict="1"
            />
        </Card>
    );
}