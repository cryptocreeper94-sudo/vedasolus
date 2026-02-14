import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";

type TrackEventFn = (
  eventName: string,
  category?: string,
  label?: string,
  value?: number,
  metadata?: Record<string, any>
) => void;

declare global {
  interface Window {
    vedasolusAnalytics?: { trackEvent: TrackEventFn };
  }
}

function detectDevice(ua: string): string {
  if (/Tablet|iPad/i.test(ua)) return "Tablet";
  if (/Mobile|iPhone|Android.*Mobile/i.test(ua)) return "Mobile";
  return "Desktop";
}

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return "Chrome";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
  return "Other";
}

function detectOS(ua: string): string {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X|macOS/i.test(ua) && !/iPhone|iPad/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) return "Linux";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  return "Other";
}

function parseUTMParams(search: string) {
  const params = new URLSearchParams(search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

export function useAnalytics(): { trackEvent: TrackEventFn } {
  const sessionIdRef = useRef<string>("");
  const visitorIdRef = useRef<string>("");
  const initializedRef = useRef(false);
  const [location] = useLocation();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let vid = localStorage.getItem("vs_visitor_id");
    if (!vid) {
      vid = "v_" + crypto.randomUUID();
      localStorage.setItem("vs_visitor_id", vid);
    }
    visitorIdRef.current = vid;

    let sid = sessionStorage.getItem("vs_session_id");
    const isNewSession = !sid;
    if (!sid) {
      sid = "s_" + crypto.randomUUID();
      sessionStorage.setItem("vs_session_id", sid);
    }
    sessionIdRef.current = sid;

    if (isNewSession) {
      const ua = navigator.userAgent;
      const utm = parseUTMParams(window.location.search);
      fetch("/api/analytics/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sid,
          visitorId: vid,
          userAgent: ua,
          referrer: document.referrer,
          landingPage: window.location.pathname,
          device: detectDevice(ua),
          browser: detectBrowser(ua),
          os: detectOS(ua),
          ...utm,
        }),
      }).catch(() => {});
    }

    const handleBeforeUnload = () => {
      if (sessionIdRef.current) {
        navigator.sendBeacon(
          `/api/analytics/session/${sessionIdRef.current}/end`
        );
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!sessionIdRef.current || !visitorIdRef.current) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetch("/api/analytics/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          visitorId: visitorIdRef.current,
          route: location,
          title: document.title,
        }),
      }).catch(() => {});
    }, 100);
  }, [location]);

  const trackEvent: TrackEventFn = useCallback(
    (eventName, category, label, value, metadata) => {
      if (!sessionIdRef.current || !visitorIdRef.current) return;
      fetch("/api/analytics/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          visitorId: visitorIdRef.current,
          eventName,
          eventCategory: category,
          eventLabel: label,
          eventValue: value,
          metadata,
        }),
      }).catch(() => {});
    },
    []
  );

  useEffect(() => {
    window.vedasolusAnalytics = { trackEvent };
    return () => {
      delete window.vedasolusAnalytics;
    };
  }, [trackEvent]);

  return { trackEvent };
}
