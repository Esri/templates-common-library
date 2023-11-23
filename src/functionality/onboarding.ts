import { IOnboardingValues, ISplash } from "../interfaces/commonInterfaces";

const DEFAULT = {
  splash: false,
  splashTitle: "Title",
  splashContent: "Content",
  splashButtonText: "Enter",
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
        splashTitle: "Title",
        splashContent:
          customOnboarding && customOnboardingHTML ? customOnboardingHTML : "",
        splashButtonText: onboardingButtonText,
      }
    : DEFAULT;
}
