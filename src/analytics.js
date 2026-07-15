const METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID || "110755114");
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "yclid",
];

export function initAnalytics() {
  if (!Number.isInteger(METRIKA_ID) || METRIKA_ID <= 0 || typeof window === "undefined") {
    return;
  }

  window.ym =
    window.ym ||
    function metrikaQueue(...args) {
      (window.ym.a = window.ym.a || []).push(args);
    };
  window.ym.l = Date.now();

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
}

export function reachGoal(goal, params = {}) {
  if (!Number.isInteger(METRIKA_ID) || METRIKA_ID <= 0 || typeof window === "undefined") {
    return;
  }

  window.ym?.(METRIKA_ID, "reachGoal", goal, params);
}

export function readAttribution() {
  if (typeof window === "undefined") {
    return {};
  }

  const current = Object.fromEntries(
    UTM_KEYS.map((key) => [key, new URLSearchParams(window.location.search).get(key)]).filter(
      ([, value]) => value,
    ),
  );

  try {
    const saved = JSON.parse(sessionStorage.getItem("lead_attribution") || "{}");
    const attribution = { ...saved, ...current };
    sessionStorage.setItem("lead_attribution", JSON.stringify(attribution));
    return attribution;
  } catch {
    return current;
  }
}

export function trackContact(channel) {
  reachGoal(`click_${channel}`, { channel });
}
