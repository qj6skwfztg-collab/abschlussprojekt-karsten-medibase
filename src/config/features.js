// Registration is open in local development so the complete onboarding flow
// can be tested. Production stays closed until the official launch switch is set.
export const PUBLIC_REGISTRATION_ENABLED =
  import.meta.env.PROD
    ? import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED === "true"
    : import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED !== "false";

// Public contact details stay hidden during the preview phase.
// Set VITE_PUBLIC_CONTACT_INFO_ENABLED=true for the official launch.
export const PUBLIC_CONTACT_INFO_ENABLED =
  import.meta.env.VITE_PUBLIC_CONTACT_INFO_ENABLED === "true";

// The preview notice is shown until the official app launch.
// Set VITE_PREVIEW_NOTICE_ENABLED=false for the release build.
export const PREVIEW_NOTICE_ENABLED =
  import.meta.env.VITE_PREVIEW_NOTICE_ENABLED !== "false";

// Real phone calls stay disabled on the public preview website.
// Set VITE_EMERGENCY_CALLS_ENABLED=true for the released app build.
export const EMERGENCY_CALLS_ENABLED =
  import.meta.env.VITE_EMERGENCY_CALLS_ENABLED === "true";
