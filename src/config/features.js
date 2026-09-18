// Registration is open in local development so the complete onboarding flow
// can be tested. Production stays closed until the official launch switch is set.
export const PUBLIC_REGISTRATION_ENABLED =
  import.meta.env.PROD
    ? import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED === "true"
    : import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED !== "false";

// Real phone calls stay disabled on the public preview website.
// Set VITE_EMERGENCY_CALLS_ENABLED=true for the released app build.
export const EMERGENCY_CALLS_ENABLED =
  import.meta.env.VITE_EMERGENCY_CALLS_ENABLED === "true";
