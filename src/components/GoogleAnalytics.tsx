import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { ANALYTICS_CONFIG } from "@/config";

export default function GoogleAnalytics() {
    const id = ANALYTICS_CONFIG.googleAnalyticsId.trim();

    // 开发模式下不加载，避免本地开发和测试污染统计数据
    if (process.env.NODE_ENV !== "production" || !id) {
        return null;
    }

    return <NextGoogleAnalytics gaId={id} />;
}
