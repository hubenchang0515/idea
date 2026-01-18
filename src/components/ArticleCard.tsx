import { content, type Article as ArticleProps} from '@/utils/document'
import Markdown from './Markdown';
import Link from './Link';
import Card from './Card';

export default async function ArticleCard(props:ArticleProps) {
    const text = await content(props.category, props.name);
    return (
        <Card className="bg-white dark:bg-[#161B22] border border-transparent dark:border-[#30363d] rounded-md p-2 dark:hover:border-emerald-500 hover:shadow-xl">
            <div className='relative'>
                <Link href={`/${encodeURIComponent(props.category)}/${encodeURIComponent(props.name)}`} className='absolute top-0 left-0 bottom-0 right-0 z-10'/>
                <Markdown content={text.split('\n').slice(0, 10).join('\n')}/>
            </div>
        </Card>
    )
}