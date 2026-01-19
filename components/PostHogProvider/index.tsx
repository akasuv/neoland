"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function PostHogProvider() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
        api_host: "https://us.posthog.com",
      });
    }
  }, []);

  return null;
}
