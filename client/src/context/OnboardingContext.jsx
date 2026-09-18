import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "nuzio-onboarding";

const defaults = {
  language: "English",
  profession: "",
  interests: [],
  narrator: "Aria",
  briefingTime: "07:00",
  briefLength: "5",
  notificationsEnabled: false,
  locationEnabled: false,
};

const readStored = () => {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaults;
  }
};

const OnboardingContext = createContext(null);

export function OnboardingProvider({ children }) {
  const [draft, setDraft] = useState(readStored);

  const update = useCallback((partial) => {
    setDraft((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const hydrate = useCallback((preference) => {
    if (!preference) return;
    const next = {
      language: preference.language || "English",
      profession: preference.profession || "",
      interests: preference.interests || [],
      narrator: preference.narrator || "Aria",
      briefingTime: preference.briefingTime || "07:00",
      briefLength: preference.briefLength || "5",
      notificationsEnabled: Boolean(preference.notificationsEnabled),
      locationEnabled: Boolean(preference.locationEnabled),
    };
    setDraft((prev) => {
      const same = JSON.stringify({ ...prev, ...next }) === JSON.stringify({ ...next, ...prev });
      if (
        prev.language === next.language &&
        prev.profession === next.profession &&
        prev.narrator === next.narrator &&
        prev.briefingTime === next.briefingTime &&
        prev.briefLength === next.briefLength &&
        prev.notificationsEnabled === next.notificationsEnabled &&
        JSON.stringify(prev.interests) === JSON.stringify(next.interests)
      ) {
        return prev;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...next }));
      return { ...prev, ...next };
    });
  }, []);

  const value = useMemo(() => ({ draft, update, hydrate }), [draft, update, hydrate]);

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export const useOnboarding = () => useContext(OnboardingContext);
