/*
  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/

import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";

import { whenOnce } from "esri/core/reactiveUtils";
import Alert from "./Alert";
import { addAdobeScripts } from "./AppMeasurement";
import ArcGISTelemetry from "./telemetry.dojo.min";

export interface TelemetryInstance {
  startWorkflow: (name: string, payload?: WorkflowPayload) => any;
  stepWorkflow: (name: string, step: string, payload?: WorkflowPayload) => void;
  cancelWorkflow: (name: string, payload?: WorkflowPayload) => void;
  endWorkflow: (name: string, payload?: WorkflowPayload) => void;
  getWorkflow: (name: string) => any;
  logEvent: (payload: EventPayload) => boolean;
  logError: (payload: ErrorPayload) => void;
  logPageView: (page?: string) => void;
  update: (settings: any) => void;
  removeScripts: () => void;
  disabled: boolean;
}
export interface TelemetrySettings {
  portal: __esri.Portal;
  config: {
    googleAnalytics: boolean;
    googleAnalyticsConsent: boolean;
    adobeLaunchAnalytics: boolean;

    adobeReportSuiteId: string;
    adobeSSLTrackingServer: string;
    adobeTrackingServer: string;
    googleAnalyticsConsentMsg: string;
    googleAnalyticsKey: string;
  };
  appName: string;
  messages: {
    optIn: string;
  }
}
export interface TelemetryOptions {
  search: boolean;
  viewToggle: boolean;
  sortOrderToggle: boolean;
  filterToggle: boolean;
}

export interface EventPayload extends TelemetryAttributes, TelemetryMetrics {
  /** defaults to "other", telemetry supplies this for its methods (ie. "pageView" and "workflow") */
  eventType?: string;
  /** General area of concern for this event ("Menu", "Search") */
  category?: string;
  /** User action that caused this event ("click", etc) */
  action?: string;
  /** English-language text label for this event (ex name of the menu item the user clicked) */
  label?: string;
  /** Telemetry will automatically run this value through `JSON.stringify()` */
  json?: any;
  details?: string;
}

export interface WorkflowPayload extends TelemetryAttributes, TelemetryMetrics {
  /** sent to the server as "label": https://devtopia.esri.com/WebGIS/arcgis-telemetry.js/issues/87 */
  details?: string;
}

export interface ErrorPayload {
  /** message of the error */
  error: string;
  /** status code number or lookup */
  statusCode?: string;
  /** optional url requested prior to fail */
  urlRequested?: string;
}

/**
 * Attributes that can be stored in DB
 * https://devtopia.esri.com/WebGIS/arcgis-telemetry.js/wiki#supported-attributes
 */
export interface TelemetryAttributes {
  browserWebGLCapabilities?: string;
  datasetId?: string;
  attribute?: string;
  serviceQuery?: string;
  searchQuery?: string;
  objectId?: string;
  facetValue?: string;
  statusCode?: string;
  pageUrl?: string;
}

/**
 * Metrics that can be stored in DB
 * https://devtopia.esri.com/WebGIS/arcgis-telemetry.js/wiki#supported-metrics
 */
export interface TelemetryMetrics {
  duration?: number;
  position?: number;
  size?: number;
  number?: number;
  count?: number;
}

export interface ArcGISTelemetryApp {
  name: string;
  id: string;
  version: string;
}

export interface ArcGISTelemetryCredentials {
  userPoolID: string;
  app: ArcGISTelemetryApp;
}

@subclass("TelemetryTS")
export default class Telemetry extends Accessor {
  /** Use this to call methods in telemetry.js */
  @property()
  instance: TelemetryInstance | null;

  @property()
  state: "ready" | "waitingForConsent" | "loading" | "error" =
    "waitingForConsent";

  @property()
  consentAlert: Alert;

  private _adobeTracker: any;
  private gaids = ["ga1", "ga2", "ga3"];
  private adobeIds = ["ad1"];
  /** used in the Consent key state */
  private appName: string;
  private settings: TelemetrySettings;

  get isConsentGiven() {
    const storageValue = localStorage.getItem(this.optInStorageKey);
    return storageValue != null && storageValue !== "false";
  }

  /** Tied to the appid in the URL. This is what allows us to keep track of opt-ins on an individual app basis */
  get optInStorageKey(): string {
    const urlParams = new URLSearchParams(window.location.search);
    const appId: string = urlParams.get("appid");
    return `analytics-opt-in-${appId != null ? appId : this.settings.appName}`;
  }

  constructor(settings: TelemetrySettings) {
    super(settings);
    this.settings = settings;
  }

  initialize() {
    this.runInit();

    whenOnce(() => this?.consentAlert !== undefined).then(() => {
      this.consentAlert.watch("state", (state: any) => {
        if (state === "consentGiven") {
          this.runInit();
        }
      });
    });
  }

  runInit() {
    // if Portal is Enterprise then disable telemetry
    if (this?.settings?.portal?.isPortal) {
      this.state = "ready";
      return;
    }

    const { googleAnalytics, googleAnalyticsConsent, adobeLaunchAnalytics } =
      this?.settings?.config;

    if (
      googleAnalyticsConsent === true &&
      (googleAnalytics || adobeLaunchAnalytics) &&
      !this.isConsentGiven
    ) {
      this._initConsentAlert();
    } else {
      this._destroyConsentAlert();
      this._initTelemetry(this?.settings);
    }
  }

  private _initConsentAlert() {
    this._destroyConsentAlert();

    const alertContainer = document.createElement("container");
    document.body.appendChild(alertContainer);
    this.consentAlert = new Alert({
      container: alertContainer,
      config: this.settings.config,
      appName: this.optInStorageKey,
      settings: this.settings,
    });
  }

  private _destroyConsentAlert() {
    if (this.consentAlert != null) {
      this.consentAlert.destroy();
      this.consentAlert = null;
    }
  }

  private async _initTelemetry(settings: TelemetrySettings) {
    const { portal } = settings;

    const isGoogleEnabled: boolean = this._isGoogleEnabled(settings);
    const isAdobeEnabled: boolean = this._isAdobeEnabled(settings);

    await this._loadGoogleAnalytics(settings);
    this._adobeTracker = await this._loadAdobeAnalytics(settings);

    const options = {
      disabled: false,
      portal,
      amazon: this._getAmazonCredentials(settings),
      google: isGoogleEnabled,
      debug:
        this._getEnvironment(portal.portalHostname) === "dev" ? true : false,
    };

    let telemetry;
    if (isAdobeEnabled) {
      // init wrapper
      telemetry = new AdobeWrapper({
        instance: new ArcGISTelemetry(options),
        adobeTracker: this._adobeTracker,
      });
    } else {
      telemetry = new ArcGISTelemetry(options) as TelemetryInstance;
    }

    this.instance = telemetry;
    this.state = "ready";
  }

  private _isGoogleEnabled(settings: TelemetrySettings) {
    // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
    const { googleAnalytics, googleAnalyticsConsent } = settings?.config;

    if (this._isEueiDisabled(settings?.portal)) {
      return false;
    }

    // Check to see if GA is enabled
    let enabled = googleAnalytics;
    let optInKey = this.optInStorageKey;
    if (enabled && googleAnalyticsConsent) {
      const localSaved = localStorage.getItem(optInKey);
      enabled = localSaved != null;
    }
    return enabled;
  }
  private _isAdobeEnabled(settings: TelemetrySettings) {
    // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
    const { adobeLaunchAnalytics, googleAnalyticsConsent } = settings?.config;

    if (this._isEueiDisabled(settings?.portal)) {
      return false;
    }

    let enabled = adobeLaunchAnalytics;
    let optInKey = this.optInStorageKey;
    if (enabled && googleAnalyticsConsent) {
      const localSaved = localStorage.getItem(optInKey);
      enabled = localSaved != null;
    }
    return enabled;
  }
  private _getAmazonCredentials(settings: any): ArcGISTelemetryCredentials {
    const envCredentials = settings.config.telemetry;
    if (!envCredentials) return;
    const env: string = this._getEnvironment(settings.portal.portalHostname);
    const userPoolID = envCredentials[env].amazon.userPoolID;
    const id = envCredentials[env].amazon.app.id;
    const name = envCredentials.name;
    const version = envCredentials.version;

    return {
      userPoolID,
      app: {
        name,
        id,
        version,
      },
    };
  }
  private async _loadGoogleAnalytics(settings: TelemetrySettings) {
    return new Promise<void>(async (resolve, reject) => {
      const { googleAnalyticsKey } = settings?.config;

      const enableGoogle = this._isGoogleEnabled(settings);
      const scriptsExist = this._googleScriptsExist();

      if (!enableGoogle && scriptsExist) {
        window[`ga-disable-${googleAnalyticsKey}`] = false;
        resolve();
      } else if (!enableGoogle && !scriptsExist) {
        resolve();
      } else if (enableGoogle && scriptsExist) {
        window[`ga-disable-${googleAnalyticsKey}`] = true;
        resolve();
      } else if (enableGoogle && !scriptsExist) {
        if (googleAnalyticsKey == null) {
          resolve();
          return;
        }
        const gaScript0 = document.createElement("script");
        gaScript0.setAttribute("async", "true");
        gaScript0.setAttribute(
          "src",
          `https://www.google-analytics.com/analytics.js`
        );
        gaScript0.id = this.gaids[0];

        const gaScript1 = document.createElement("script");
        gaScript1.setAttribute("async", "true");
        gaScript1.setAttribute(
          "src",
          `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsKey}`
        );
        gaScript1.id = this.gaids[1];

        const gaScript2 = document.createElement("script");
        gaScript2.id = this.gaids[2];
        gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${googleAnalyticsKey}\');`;

        const head = document.getElementsByTagName("head")[0];

        head.appendChild(gaScript0);
        head.appendChild(gaScript1);
        head.appendChild(gaScript2);

        let timeStart = Date.now();
        const TIMEOUT = 10000;

        let _isLoaded = function () {
          if (window["ga"]) {
            resolve(window["ga"]);
          } else if (Date.now() - timeStart > TIMEOUT) {
            reject("Timeout. Google analytics not injected!");
          } else {
            setTimeout(_isLoaded, 1000);
          }
        };
        _isLoaded();
      } else {
        resolve();
      }
    });
  }
  private async _loadAdobeAnalytics(settings: TelemetrySettings) {
    return new Promise<void>(async (resolve, reject) => {
      const {
        adobeTrackingServer,
        adobeSSLTrackingServer,
        adobeReportSuiteId,
      } = settings.config;

      const enableAdobeLaunch = this._isAdobeEnabled(settings);
      const scriptsExist = this._adobeLaunchScriptsExist();

      if (!enableAdobeLaunch && scriptsExist) {
        this.removeALScripts();
        resolve();
      } else if (!enableAdobeLaunch && !scriptsExist) {
        resolve();
      } else if (enableAdobeLaunch && scriptsExist) {
        resolve();
      } else if (enableAdobeLaunch && !scriptsExist) {
        if (adobeTrackingServer == null || adobeReportSuiteId == null) {
          resolve();
          return;
        }

        addAdobeScripts();

        let timeStart = Date.now();
        const TIMEOUT = 10000;

        let _isLoaded = function () {
          if (window["s_gi"]) {
            const adobeTracker = window["s_gi"](adobeReportSuiteId);
            adobeTracker.trackingServer = adobeTrackingServer;
            if (adobeSSLTrackingServer) {
              adobeTracker.trackingServerSecure = adobeSSLTrackingServer;
            }
            resolve(adobeTracker);
          } else if (Date.now() - timeStart > TIMEOUT) {
            reject("Timeout. Adobe Analytics not injected!");
          } else {
            setTimeout(_isLoaded, 1000);
          }
        };
        _isLoaded();
      } else {
        resolve();
      }
    });
  }
  _googleScriptsExist() {
    const alreadyLoaded = this.gaids.every((id) => {
      return document.getElementById(id) !== null ? true : false;
    });
    return alreadyLoaded;
  }
  _adobeLaunchScriptsExist() {
    const alreadyLoaded =
      window["AppMeasurement"] != null || window["s_gi"] != null;
    return alreadyLoaded;
  }
  public removeGAScripts() {
    this.gaids.forEach((id) => {
      const gaScript = document.getElementById(id);
      gaScript?.parentNode.removeChild(gaScript);
    });
  }
  public removeALScripts() {
    this.adobeIds.forEach((id) => {
      const alScript = document.getElementById(id);
      alScript?.parentNode.removeChild(alScript);
    });
  }
  private _getEnvironment(hostname: string): string {
    const h = hostname.replace("www.", "");
    if (document.location.hostname.indexOf("arcgis.com") === -1) {
      return "dev";
    } else {
      return (
        (h === "arcgis.com" && "prod") ||
        (h === "qaext.arcgis.com" && "qa") ||
        "dev"
      );
    }
  }
  private _isEueiDisabled(portal: __esri.Portal) {
    return portal?.eueiEnabled === false;
  }
}

/** Wrapper which adds the functionality of Adobe Launch to the TelemetryInstance */
class AdobeWrapper implements TelemetryInstance {
  private _wrappedTelemInstance: TelemetryInstance;
  private _adobeTracker: any;

  constructor(args: any) {
    this._wrappedTelemInstance = args?.instance;
    this._adobeTracker = args?.adobeTracker;
  }

  logPageView: (page?: string) => void = (page?: string, options?: any) => {
    if (this._adobeTracker == null) {
      console.error(
        `this._adobeTracker function is undefined. Something went wrong with Adobe Analytics Instantiation`
      );
    }
    const telemetryPayload = this.createPageView(
      {
        page,
        previousPage: {},
        options,
      },
      null,
      false
    );

    this?._adobeTracker?.t(telemetryPayload);

    this?._wrappedTelemInstance?.logPageView(page);
  };
  logEvent: (payload: EventPayload) => boolean = (payload: EventPayload) => {
    if (this._adobeTracker == null) {
      console.error(
        `this._adobeTracker function is undefined. Something went wrong with AdobeLaunch Instantiation`
      );
    }
    const telemetryPayload = this.createEventLog(payload, {}, false, {});
    this?._adobeTracker?.tl(true, "o", "Custom Event", telemetryPayload);

    return this?._wrappedTelemInstance?.logEvent(telemetryPayload);
  };

  ///////////////////////////
  // Pass through functions
  ///////////////////////////
  logError: (payload: ErrorPayload) => void = (payload: ErrorPayload) => {
    this._wrappedTelemInstance.logError(payload);
  };
  update: (settings: any) => void = (settings: any) => {
    this._wrappedTelemInstance.update(settings);
  };
  removeScripts: () => void = () => {
    this._wrappedTelemInstance.removeScripts();
  };
  get disabled() {
    return this._wrappedTelemInstance.disabled;
  }
  startWorkflow: (name: string, payload?: WorkflowPayload) => any = (
    name: string,
    payload?: WorkflowPayload
  ) => {
    return this._wrappedTelemInstance.startWorkflow(name, payload);
  };
  stepWorkflow: (
    name: string,
    step: string,
    payload?: WorkflowPayload
  ) => void = (name: string, step: string, payload?: WorkflowPayload) => {
    return this._wrappedTelemInstance.stepWorkflow(name, step, payload);
  };
  cancelWorkflow: (name: string, payload?: WorkflowPayload) => void = (
    name: string,
    payload?: WorkflowPayload
  ) => {
    return this._wrappedTelemInstance.cancelWorkflow(name, payload);
  };
  endWorkflow: (name: string, payload?: WorkflowPayload) => void = (
    name: string,
    payload?: WorkflowPayload
  ) => {
    return this._wrappedTelemInstance.endWorkflow(name, payload);
  };
  getWorkflow: (name: string) => any = (name: string) => {
    return this._wrappedTelemInstance.getWorkflow(name);
  };

  ////////////////////////////////
  // Adobe Format Functions
  ////////////////////////////////

  createPageView(data, dimensions, useCustomDimensionMapping) {
    const { page, previousPage, options } = data;
    const payload = this.formatPayload(page, previousPage, options, "pageView");
    let defaultMapping = {};
    if (!useCustomDimensionMapping) {
      defaultMapping = {
        prop1: payload.eventType,
        prop2: payload.referrer,
        prop3: payload.hostname,
        prop4: payload.path,
        prop5: payload.pageName,
        prop6: payload.previousPageName,
        prop7: payload.previousPageUrl,
        prop8: payload.category,
        prop9: payload.action,
        prop10: payload.label,
        prop11: payload.attribute,
        prop12: payload.details,
      };
    }
    return {
      ...defaultMapping,
    };
  }

  createEventLog(event, dimensions, useCustomDimensionMapping, previousPage) {
    const payload = this.formatPayload(null, previousPage, event, "other");

    let defaultMapping = {};
    if (!useCustomDimensionMapping) {
      defaultMapping = {
        prop1: payload.eventType,
        prop2: payload.referrer,
        prop3: payload.hostname,
        prop4: payload.path,
        prop5: payload.pageName,
        prop6: payload.previousPageName,
        prop7: payload.previousPageUrl,
        prop8: payload.category,
        prop9: payload.action,
        prop10: payload.label,
        prop11: payload.attribute,
        prop12: payload.details,
      };
    }

    return {
      ...defaultMapping,
    };
  }

  formatPayload(page, previousPage, options, eventType) {
    const { referrer, title } = document || {};
    const { hostname, pathname } =
      window && window.location
        ? window.location
        : { hostname: null, pathname: null };

    return {
      eventType,
      referrer,
      hostname,
      path: page || pathname,
      pageName: title,
      previousPageUrl: previousPage?.pageUrl,
      previousPageName: previousPage?.pageName,
      ...options,
    };
  }
}
