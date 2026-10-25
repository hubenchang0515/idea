import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config';
import { absoluteUrl } from '@/utils/seo';

export const dynamic = 'force-static'

export default function robots():MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
        host: SITE_CONFIG.origin,
    };
}
