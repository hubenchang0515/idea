import { collectPrimerLinks } from "@/utils/primers";

export interface PrimerLinksProps {
    content: string;
    lang?: string;
}

function displayHref(href: string): string {
    try {
        return decodeURI(href);
    } catch {
        return href;
    }
}

export default function PrimerLinks(props: PrimerLinksProps) {
    const links = collectPrimerLinks(props.content, props.lang);

    if (links.length === 0) {
        return null;
    }

    return (
        <section className="mt-6 border-t border-[var(--border)] pt-4">
            <h2 className="mb-2 text-base font-bold text-[var(--foreground)]">相关链接</h2>
            <ul className="ml-5 list-disc space-y-1 text-sm text-[var(--muted)]">
                {
                    links.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="break-all text-blue-500 hover:underline dark:text-blue-400">{displayHref(link.href)}</a>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}
