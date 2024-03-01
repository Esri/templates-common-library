import Portal from "esri/portal/Portal";
import PortalItem from "esri/portal/PortalItem";
import PortalQueryResult from "esri/portal/PortalQueryResult";
import PortalQueryParams from "esri/portal/PortalQueryParams";

import WebMap from "esri/WebMap";
import WebScene from "esri/WebScene";

export type Direction = "ltr" | "rtl";

export interface ApplicationBaseItemPromises {
  webMap?: Promise<any>;
  webScene?: Promise<any>;
  groupInfo?: Promise<any>;
  groupItems?: Promise<any>;
}

export interface ApplicationConfigs {
  defaultValues?: ApplicationConfig;
  application?: ApplicationConfig;
  config: ApplicationConfig;
  local?: ApplicationConfig;
  url?: ApplicationConfig;
}

export interface ApplicationConfig {
  appid?: string;
  center?: string;
  components?: string;
  embed?: boolean;
  extent?: string;
  find?: string;
  group?: string | string[];
  helperServices?: any;
  level?: string;
  marker?: string;
  oauthappid?: string;
  portalUrl?: string;
  proxyUrl?: string;
  title?: string;
  viewpoint?: string;
  webmap?: string | string[];
  webscene?: string | string[];
  [propName: string]: any;
}

export interface ApplicationBaseSettings {
  localStorage?: {
    fetch?: boolean;
  };
  group?: {
    default?: string;
    itemParams?: PortalQueryParams;
    fetchItems?: boolean;
    fetchInfo?: boolean;
    fetchMultiple?: boolean;
  };
  portal?: {
    fetch?: boolean;
  };
  urlParams?: string[];
  webMap?: {
    default?: string;
    fetch?: boolean;
    fetchMultiple?: boolean;
  };
  webScene?: {
    default?: string;
    fetch?: boolean;
    fetchMultiple?: boolean;
  };
}

export interface ApplicationBaseResult {
  error?: Error;
  value: any;
  promise: Promise<any>;
}

export interface ApplicationBasePortalItemResult extends ApplicationBaseResult {
  value: PortalItem;
  promise: Promise<PortalItem>;
}

export interface ApplicationBasePortalQueryResult
  extends ApplicationBaseResult {
  value: PortalQueryResult;
  promise: Promise<PortalQueryResult>;
}

export interface ApplicationBaseResults {
  applicationItem?: ApplicationBasePortalItemResult;
  applicationData?: ApplicationBaseResult;
  groupInfos?: ApplicationBasePortalQueryResult;
  groupItems?: ApplicationBasePortalQueryResult;
  localStorage?: ApplicationConfig;
  portal?: Portal;
  urlParams?: ApplicationConfig;
  webMapItems?: ApplicationBasePortalItemResult[];
  webSceneItems?: ApplicationBasePortalItemResult[];
}

export interface ApplicationProxy {
  sourceUrl: string;
  proxyUrl: string;
  proxyId: string;
}

export interface ApplicationBaseConstructorOptions {
  config: ApplicationConfig | string;
  settings: ApplicationBaseSettings | string;
}

export interface CreateMapFromItemOptions {
  item: PortalItem;
  mapParams?: __esri.MapProperties;
  appProxies?: ApplicationProxy[];
}

export interface esriWidgetProps extends __esri.WidgetProperties {
  config: any;
  view?: __esri.MapView;
  portal?: __esri.Portal;
  propertyName?: string;
}

export interface ILocalTestCase {
  portalUrl: string;
  appid: string;
  oauthappid: string;
  desc: string;
  issue: string;
}
export interface AppProxyDefinition {
  /** The original URL of the source */
  sourceUrl: string;
  /** The URL of the proxy */
  proxyUrl: string;
  /** The ID of the proxy */
  proxyId: string;
  /** Rate limit proxy - Allowed hits per interval */
  hitsPerInterval?: number;
  /** Rate limit proxy - Interval length (in seconds) */
  intervalSeconds?: number;
}
