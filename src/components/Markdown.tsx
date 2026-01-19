import ReactMarkdown, { Components } from 'react-markdown'
import Image from './Image';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as highlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from './Link';

export interface MarkdownProps {
    content:string;
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <article className='markdown-body'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={MakeComponents()}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}

const MakeComponents = ():Components => {
    return {
        async h1(props) { 
            return (
                <h1 className='text-3xl my-4 font-bold text-center text-sky-800 dark:text-sky-500 underline underline-offset-8'>
                    {props.children}
                </h1>
            )
        },

        async h2(props) { 
            return (
                <h2 className='text-2xl my-3 font-bold text-sky-800 dark:text-sky-500 border-s-4 border-b-1 px-1'>
                    {props.children}
                </h2>
            )
        },

        async h3(props) { 
            return (
                <h3 className='text-xl my-2 font-bold text-sky-800 dark:text-sky-500'>{props.children}</h3>
            )
        },

        async h4(props) { 
            return (
                <h4 className='text-md my-2 font-bold'>{props.children}</h4>
            )
        },

        async h5(props) { 
            return (
                <h5 className='text-md my-2 font-bold'>{props.children}</h5>
            )
        },

        async h6(props) { 
            return (
                <h6 className='text-md my-2 font-bold'>{props.children}</h6>
            )
        },

        async p(props) { 
            return (
                <p className='my-2'>{props.children}</p>
            )
        },

        async blockquote(props) {
            return (
                <blockquote className='my-2 px-1 border border-s-4 border-emerald-600'>
                    {props.children}
                </blockquote>
            )
        },

        async table(props) {
            return (
                <table className='my-2 max-w-8/10 mx-auto border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.2)]'>
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
            return <td align={align} className='font-bold p-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.2)]'>{ props.children }</td>
        },

        async td(props) {
            const align = props.node?.properties.align as "center" | "right" | "left" | "justify" | "char" | undefined
            return <td align={align} className='p-2 border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.2)]'>{ props.children }</td>
        },

        async ol(props) {
            return <ol className='ml-6 list-decimal'>{ props.children} </ol>
        },

        async ul(props) {
            return <ul className='ml-6 list-disc'>{ props.children} </ul>
        },

        async li(props) {
            return <li>{props.children}</li>
        },

        img({ src, alt }) {
            return <Image src={src as string} alt={alt} style={{display:'block', margin:'auto', maxWidth:'80%', height:'auto',}}/>
        },

        pre({children}) {
            return <div>{children}</div>
        },

        a({href, title, children}) {
            return <Link href={href} title={title} children={children} className='text-blue-500 dark:text-blue-400 hover:underline'/>
        },

        code({className, children}) {
            const match = /language-(\w+)/.exec(className || '');

            if (match) {
                return (
                    <SyntaxHighlighter
                        showLineNumbers
                        style={highlight}
                        className={className} 
                        language={match[1].toLocaleLowerCase()}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                )
            } else if(children?.toString().includes('\n')) {
                return (
                    <SyntaxHighlighter
                        showLineNumbers
                        style={highlight}
                        className={className}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                )
            } else {
                return (
                    <code className="bg-pink-50 text-pink-500 px-1">
                        {children}
                    </code>
                )
            }
        }
    }
}