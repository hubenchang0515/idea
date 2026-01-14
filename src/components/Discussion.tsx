"use client";
import Giscus from '@giscus/react';

export default function Discussion() {
    return (
        <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2'>
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
            />
        </div>
    );
}