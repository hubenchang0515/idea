import { content, type Article as ArticleProps} from '@/utils/document'
import Markdown from './Markdown';
import Link from './Link';

export default async function ArticleCard(props:ArticleProps) {
    const text = await content(props.category, props.name);
    return (
        <div className='bg-white dark:bg-[#0D1117] rounded-md shadow-md p-2 relative'>
            <Link href={`/${props.category}/${props.name}`} className='absolute top-0 left-0 bottom-0 right-0 z-10'/>
            <Markdown content={text.split('\n').slice(0, 10).join('\n')}/>
        </div>
    )
}