export const ONBOARDING_PENDING_KEY_PREFIX = "curaelis-onboarding-pending:";
export const ONBOARDING_RETURN_PATH_KEY_PREFIX = "curaelis-onboarding-return-path:";
export const ONBOARDING_STATE_KEY_PREFIX = "curaelis-onboarding-state:";
export const ONBOARDING_PROGRESS_EVENT = "curaelis-onboarding-progress";

function getStorageKey(prefix, uid) {
  return `${prefix}${uid}`;
}

export function markOnboardingStepComplete(uid, stepId) {
  if (!uid || !stepId) return;

  const stateKey = getStorageKey(ONBOARDING_STATE_KEY_PREFIX, uid);
  const pendingKey = getStorageKey(ONBOARDING_PENDING_KEY_PREFIX, uid);

  if (localStorage.getItem(pendingKey) !== "true") return;

  let currentState;
  try {
    currentState = JSON.parse(localStorage.getItem(stateKey) || "{}") || {};
  } catch {
    currentState = {};
  }

  const completed = Array.isArray(currentState.completed)
    ? currentState.completed
    : [];
  const skipped = Array.isArray(currentState.skipped)
    ? currentState.skipped.filter((id) => id !== stepId)
    : [];

  localStorage.setItem(
    stateKey,
    JSON.stringify({
      ...currentState,
      completed: [...new Set([...completed, stepId])],
      skipped,
      started: true,
    })
  );

  window.dispatchEvent(
    new CustomEvent(ONBOARDING_PROGRESS_EVENT, {
      detail: { uid, stepId },
    })
  );
}
