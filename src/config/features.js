import { Capacitor } from "@capacitor/core";

// Registration stays open unless it is deliberately disabled with
// VITE_PUBLIC_REGISTRATION_ENABLED=false.
export const PUBLIC_REGISTRATION_ENABLED =
  import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED !== "false";

// Real phone calls should work in the installed iOS app. They can still be
// disabled explicitly for a public preview with VITE_EMERGENCY_CALLS_ENABLED=false.
export const EMERGENCY_CALLS_ENABLED =
  Capacitor.isNativePlatform() ||
  import.meta.env.VITE_EMERGENCY_CALLS_ENABLED !== "false";
