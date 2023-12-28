import { IOnboardingValues, ISplash } from "../interfaces/commonInterfaces";

const DEFAULT = {
  splash: false,
  splashTitle: "",
  splashContent: "",
  splashButtonText: "",
};

export function getSplashValues(
  splashValues: ISplash | null,
  onboardingValues: IOnboardingValues
) {
  const onboarding = onboardingValues?.onboarding;
  const onboardingButtonText = onboardingValues?.onboardingButtonText;
  const customOnboarding = onboardingValues?.customOnboarding;
  const customOnboardingHTML = onboardingValues?.customOnboardingHTML;
  return splashValues
    ? splashValues
    : onboardingValues
    ? {
        splash: onboarding,
        splashTitle: "",
        splashContent:
          customOnboarding && customOnboardingHTML ? customOnboardingHTML : "",
        splashButtonText: onboardingButtonText,
      }
    : DEFAULT;
}
