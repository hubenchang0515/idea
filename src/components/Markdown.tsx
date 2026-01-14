import ReactMarkdown from 'react-markdown'
import Image from './Image';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import "github-markdown-css"

export interface MarkdownProps {
    content:string;
}

export default function Markdown(props: MarkdownProps) {
    
    return (
        <article className='markdown-body'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img({ src, alt }) {
                        return <Image src={src as string} alt={alt} style={{display:'block', margin:'auto', maxWidth:'100%', height:'auto',}}/>
                    },

                    pre({children}) {
                        return <div>{children}</div>
                    },

                    code({className, children}) {
                        const match = /language-(\w+)/.exec(className || '');

                        if (match) {
                            return (
                                <SyntaxHighlighter
                                    showLineNumbers
                                    style={oneDark}
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
                                    style={oneDark}
                                    className={className}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            )
                        } else {
                            return (
                                <code className={className}>
                                    {children}
                                </code>
                            )
                        }
                    }
                }}
            >
                {props.content}
            </ReactMarkdown>
        </article>
    )
}