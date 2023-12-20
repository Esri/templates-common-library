import {
  CoverPageConfig,
  LandingPageConfig,
} from "../interfaces/commonInterfaces";

const DEFAULT = {
  titleText: "",
  subtitleText: "",
  descriptionText: "",
  entryButtonText: "",
  alignment: "center",
  backgroundType: "color",
  textColor: "#FFFFFF",
  entryButtonColor: "#0079C1",
  backgroundColor: "#0079C1",
  iconImage: null,
  iconImageScale: "m",
  backgroundImageSrc: null,
};

export function getLandingPageValues(
  landingPageConfig: LandingPageConfig,
  coverPageConfig: CoverPageConfig
): LandingPageConfig {
  return landingPageConfig
    ? landingPageConfig
    : coverPageConfig
    ? {
        ...DEFAULT,
        titleText: coverPageConfig?.title,
        subtitleText: coverPageConfig?.subtitle,
        entryButtonText: coverPageConfig?.buttonText,
        backgroundType: coverPageConfig?.background?.backgroundType,
        backgroundColor: coverPageConfig?.background?.backgroundColor,
        backgroundImageSrc: coverPageConfig?.background?.backgroundImage?.url,
      }
    : DEFAULT;
}
