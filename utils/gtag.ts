export const GA_TRACKING_ID = '<INSERT_TAG_ID>';

declare global {
  interface Window {
    gtag: any;
  }
}

export const pageView = (url: URL): void => {
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({action, category, label, value}: GTagEvent): void => {
  if (window.gtag) {
    if (value) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
    } else {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  }
};
