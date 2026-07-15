const METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID || "110755114");

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
] as const;

type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;
type MetrikaFunction = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: MetrikaFunction;
    __karkasAnalyticsBound?: boolean;
  }
}

export function reachGoal(goal: string, params: Record<string, unknown> = {}) {
  if (!Number.isInteger(METRIKA_ID) || METRIKA_ID <= 0 || typeof window === "undefined") {
    return;
  }

  window.ym?.(METRIKA_ID, "reachGoal", goal, params);
}

export function initAnalytics() {
  if (!Number.isInteger(METRIKA_ID) || METRIKA_ID <= 0 || typeof window === "undefined") {
    return;
  }

  if (!window.ym) {
    const queue: MetrikaFunction = (...args: unknown[]) => {
      (queue.a ||= []).push(args);
    };
    queue.l = Date.now();
    window.ym = queue;
  }

  const scriptSource = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
  if (!document.querySelector(`script[src="${scriptSource}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSource;
    document.head.appendChild(script);
  }

  window.ym(METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });

  if (!window.__karkasAnalyticsBound) {
    window.__karkasAnalyticsBound = true;
    document.addEventListener("click", (event) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href;
      if (href.startsWith("tel:")) reachGoal("click_phone", { channel: "phone" });
      if (href.includes("wa.me/")) reachGoal("click_whatsapp", { channel: "whatsapp" });
      if (href.includes("t.me/")) reachGoal("click_telegram", { channel: "telegram" });
    });
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const current: Attribution = {};
  const search = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) current[key] = value;
  }

  try {
    const saved = JSON.parse(sessionStorage.getItem("lead_attribution") || "{}") as Attribution;
    const attribution = { ...saved, ...current };
    sessionStorage.setItem("lead_attribution", JSON.stringify(attribution));
    return attribution;
  } catch {
    return current;
  }
}
