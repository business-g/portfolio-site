"use client";

import { Agentation } from "agentation";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export function AgentationToolbar() {
  const shouldShow =
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development" &&
    LOCAL_HOSTS.has(window.location.hostname);

  if (!shouldShow) {
    return null;
  }

  return <Agentation endpoint="http://localhost:4747" />;
}
