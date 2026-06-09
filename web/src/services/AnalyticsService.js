const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const scriptId = 'google-analytics-script';

let initialized = false;

function getPagePath() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function isAnalyticsEnabled() {
    return Boolean(measurementId);
}

export function initializeAnalytics() {
    if (!isAnalyticsEnabled() || initialized) {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
        send_page_view: false,
    });

    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);
    }

    initialized = true;
}

export function trackPageView(pagePath = getPagePath()) {
    if (!isAnalyticsEnabled()) {
        return;
    }

    initializeAnalytics();

    window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
    });
}
