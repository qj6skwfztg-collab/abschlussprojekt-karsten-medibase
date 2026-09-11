// Public registration stays closed until the app is ready for its official launch.
// Set VITE_PUBLIC_REGISTRATION_ENABLED=true in the deployment environment to reopen it.
export const PUBLIC_REGISTRATION_ENABLED =
  import.meta.env.VITE_PUBLIC_REGISTRATION_ENABLED === "true";

// Real phone calls stay disabled on the public preview website.
// Set VITE_EMERGENCY_CALLS_ENABLED=true for the released app build.
export const EMERGENCY_CALLS_ENABLED =
  import.meta.env.VITE_EMERGENCY_CALLS_ENABLED === "true";
