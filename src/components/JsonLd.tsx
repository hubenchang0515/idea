export interface JsonLdProps {
    data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd(props:JsonLdProps) {
    const json = JSON.stringify(props.data).replace(/</g, '\\u003c');

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: json}}
        />
    );
}
