import ReactMarkdown, { Components } from 'react-markdown'
import Image from './Image';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as highlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from './Link';
import DocLink from './DocLink';

export async function hash(algorithm:string, data:BufferSource) {
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}

// 哈希锚点
export async function anchorHash(text:string) {
    return (await hash('SHA-256', new TextEncoder().encode(text))).substring(0, 6);
}

export interface MarkdownProps {
    content:string;
    href:string;
}

function CodeNode(props:{node:rendererNode, stylesheet: { [key: string]: React.CSSProperties }, context:string, rows:number}) {
    if (props.node.type === 'text') {
        if (props.node.value === undefined || props.node.value === "") {                        // 空字符串
            return null
        } else if (/^\s+$/.test(props.node.value.toString())) {                                 // 空白字符串
            return <span>{props.node.value}</span>
        } else if (/^\S+$/.test(props.node.value.toString())) {                                 // 不含空白字符
            return <DocLink text={props.node.value.toString()} lang={props.context}/>
        } else {
            const items = props.node.value.toString().split(/(\s+)/)
            return items.map((item, i) => <CodeNode key={i} {...props} node={{type:'text', value:item}}/>)
        }
        
    } else if (props.node.type === 'element') {
        const style = props.node.properties?.className.reduce((result, name) => {
            result = {...result, ...props.stylesheet[name]};
            return result;
        }, {});
        if (props.node.properties?.className?.includes('linenumber')) {
            style.display = "inline-block";
            style.minWidth = `${props.rows}em`;
            style.paddingRight = "1em";
            style.textAlign = "right";
            style.userSelect = "none";
        }
        return <span className={props.node.properties?.className.join(" ")} style={style}>
        {
            props.node.children?.map((subnode, i) => <CodeNode key={i} {...props} node={subnode} />)
        }
        </span>
    }
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <article className='markdown-body'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MakeComponents(props.href)}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}

const MakeComponents = (href:string):Components => {
    return {
        async h1(props) { 
            return (
                <h1 className='text-3xl my-6 font-bold text-center text-slate-800 dark:text-sky-300 underline decoration-emerald-400/60 decoration-2 underline-offset-8'>
                    <Link 
                        href={href} className='cursor-pointor'
                    >
                    {props.children}
                    </Link>
                </h1>
            )
        },

        async h2(props) { 
            const anchor = await anchorHash(props.children?.toString()??'');
            return (
                <h2 id={anchor} className='text-2xl my-5 font-bold text-slate-800 dark:text-sky-300 border-s-4 border-emerald-400 ps-2'>
                    <Link 
                        href={href + `#` + anchor}
                        className='cursor-pointor'
                    >
                        {props.children}
                    </Link>
                </h2>
            )
        },

        async h3(props) { 
            const anchor = await anchorHash(props.children?.toString()??'');
            return (
                <h3 id={anchor} className='text-xl my-3 font-bold text-slate-800 dark:text-sky-300'>
                    <Link 
                        href={href + `#` + anchor}
                        className='cursor-pointor'
                    >
                        {props.children}
                    </Link>
                </h3>
            )
        },

        async h4(props) { 
            const anchor = await anchorHash(props.children?.toString()??'');
            return (
                <h4 id={anchor} className='text-base my-2 font-bold text-slate-800 dark:text-slate-200'>
                    <Link 
                        href={href + `#` + anchor}
                        className='cursor-pointor'
                    >
                        {props.children}
                    </Link>
                </h4>
            )
        },

        async h5(props) { 
            const anchor = await anchorHash(props.children?.toString()??'');
            return (
                <h5 id={anchor} className='text-base my-2 font-bold text-slate-800 dark:text-slate-200'>
                    <Link 
                        href={href + `#` + anchor}
                        className='cursor-pointor'
                    >
                        {props.children}
                    </Link>
                </h5>
            )
        },

        async h6(props) { 
            const anchor = await anchorHash(props.children?.toString()??'');
            return (
                <h6 id={anchor} className='text-base my-2 font-bold text-slate-800 dark:text-slate-200'>
                    <Link 
                        href={href + `#` + anchor}
                        className='cursor-pointor'
                    >
                        {props.children}
                    </Link>
                </h6>
            )
        },

        async p(props) { 
            return (
                <p className='my-2'>{props.children}</p>
            )
        },

        async blockquote(props) {
            return (
                <blockquote className='my-3 px-3 py-2 border border-s-4 border-emerald-500/60 bg-emerald-500/5 rounded-e-lg'>
                    {props.children}
                </blockquote>
            )
        },

        async table(props) {
            return (
                <table className='my-3 max-w-full mx-auto border border-[var(--border)]'>
                    { props.children }
                </table>
            )
        },

        async thead(props) {
            return <thead>{ props.children }</thead>
        },

        async tbody(props) {
            return <tbody>{ props.children }</tbody>
        },

        async tr(props) {
            return <tr>{ props.children }</tr>
        },

        async th(props) {
            const align = props.node?.properties.align as "center" | "right" | "left" | "justify" | "char" | undefined
            return <td align={align} className='font-bold p-2 border border-[var(--border)]'>{ props.children }</td>
        },

        async td(props) {
            const align = props.node?.properties.align as "center" | "right" | "left" | "justify" | "char" | undefined
            return <td align={align} className='p-2 border border-[var(--border)]'>{ props.children }</td>
        },

        async ol(props) {
            return <ol className='ml-10 list-decimal'>{ props.children} </ol>
        },

        async ul(props) {
            return <ul className='ml-10 list-disc'>{ props.children} </ul>
        },

        async li(props) {
            return <li>{props.children}</li>
        },

        img({ src, alt }) {
            return <Image src={src as string} alt={alt} style={{display:'block', margin:'1.5rem auto', maxWidth:'90%', height:'auto', borderRadius:'0.9rem'}}/>
        },

        pre({children}) {
            return <div className="my-3">{children}</div>
        },

        a({href, title, children}) {
            return <Link href={href} title={title} className='text-blue-500 dark:text-blue-400 hover:underline'>{children}</Link>
        },

        code({className, children}) {
            const source = String(children ?? '');
            const match = /language-(\w+)/.exec(className || '');

            if (!source.trim()) {
                return null;
            }

            if (match) {
                const lang = match[1].toLocaleLowerCase();
                return (
                    <SyntaxHighlighter
                        showLineNumbers
                        style={highlight}
                        className={className} 
                        language={lang === 'shell' ? 'shell-session' : lang}
                        renderer={({ rows, stylesheet }) => {
                            return (
                                <code className={className} style={{whiteSpace:'pre'}}>
                                {
                                    rows.map((row) => {
                                        return row.children?.map((node, i) => <CodeNode key={i} node={node} stylesheet={stylesheet} context={match[1]} rows={rows.length.toString().length}/>)
                                    })
                                }
                                </code>
                            )
                        }}
                    >
                        {source.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                )
            } else if(source.includes('\n')) {
                return (
                    <SyntaxHighlighter
                        showLineNumbers
                        style={highlight}
                        className={className}
                    >
                        {source.replace(/\n$/, '')}
                    </SyntaxHighlighter>
                )
            } else {
                return (
                    <code className="bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300 px-1.5 py-0.5 rounded text-[0.9em]">
                        {children}
                    </code>
                )
            }
        }
    }
}