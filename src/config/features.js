import { Capacitor } from "@capacitor/core";

// Account creation is available in the installed app. On the public website,
// registration stays closed unless it is deliberately enabled with
// VITE_PUBLIC_REGISTRATION_ENABLED=true.
export const PUBLIC_REGISTRATION_ENABLED =
  Capacitor.isNativePlatform() ||
  import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED === "true";

// Real phone calls should work in the installed iOS app. They can still be
// disabled explicitly for a public preview with VITE_EMERGENCY_CALLS_ENABLED=false.
export const EMERGENCY_CALLS_ENABLED =
  Capacitor.isNativePlatform() ||
  import.meta.env.VITE_EMERGENCY_CALLS_ENABLED !== "false";
