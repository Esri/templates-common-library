export interface esriWidgetProps extends __esri.WidgetProperties {
  config: any;
  view?: __esri.MapView;
  portal?: __esri.Portal;
  propertyName?: string;
}

export interface FeatureLayerFeatureEffect extends __esri.FeatureLayer {
  featureEffect: __esri.FeatureEffect;
}

//----------------------------------
// Types/Interfaces for
// Shared Theme and CustomTheme
//----------------------------------

type IThemeType = "primary" | "secondary" | "accent";

export interface IPortalPropsSharedTheme {
  header: {
    background: string;
    text: string;
  };
  body: {
    background: string;
    text: string;
    link: string;
  };
  button: {
    background: string;
    text: string;
  };
  logo: {
    small: string;
    link: string;
  };
}

export interface ITheme {
  type: IThemeType;
  background: string;
  text: string;
}

export interface ICustomTheme {
  applyPresetTheme: boolean;
  applySharedTheme: boolean;
  font: string;
  preset: "shared";
  themes: {
    primary?: ITheme;
    secondary?: ITheme;
    accent?: ITheme;
  };
}

// Highlight
export interface HighlightConfig {
  enableHighlightColor: boolean;
  highlightColor: string;
  enableHighlightHaloColor: boolean;
  highlightHaloColor: string;
}

export interface ISanitizer {
  sanitize: (arg0: string) => string;
}

// Cover page/Landing page
export interface CoverPageConfig {
  title: string;
  subtitle: string;
  buttonText: string;
  background: {
    backgroundType: "color" | "image";
    backgroundColor: string;
    backgroundImage: {
      name: string;
      url: string;
      size: number;
    };
  };
}

export interface LandingPageConfig {
  titleText: string;
  subtitleText: string;
  descriptionText: string;
  entryButtonText: string;
  alignment: string;
  backgroundType: string;
  textColor: string;
  entryButtonColor: string;
  backgroundColor: string;
  iconImage: string;
  iconImageScale: string;
  backgroundImageSrc: string;
}

export interface IOnboardingValues {
  onboarding: boolean;
  onboardingButtonText: string;
  customOnboarding: boolean;
  customOnboardingHTML: string;
}

export interface ISplash {
  splash: boolean;
  splashTitle: string;
  splashContent: string;
  splashButtonText: string;
}

export type ExtentLayerView =
  | __esri.FeatureLayerView
  | __esri.OGCFeatureLayerView
  | __esri.CSVLayerView
  | __esri.GeoJSONLayerView
  | __esri.StreamLayerView
  | __esri.WFSLayerView;
export interface LanguageData {
  locale: string;
  data: { [key: string]: string };
}
