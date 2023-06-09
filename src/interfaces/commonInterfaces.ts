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

export interface ISanitizer { sanitize: (arg0: string) => string; }
