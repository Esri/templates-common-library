/*
  Copyright 2023 Esri

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

import { property, subclass } from "esri/core/accessorSupport/decorators";
import { tsx, storeNode } from "esri/widgets/support/widget";
import Handles from "esri/core/Handles";
import Widget from "esri/widgets/Widget";
import Expand from "esri/widgets/Expand";
import { watch, when } from "esri/core/reactiveUtils";

import ApplicationBase from "../../baseClasses/ApplicationBase";
import {
  ApplicationConfig,
  esriWidgetProps
} from "../../interfaces/applicationBase";

import { getLocale, normalizeMessageBundleLocale } from "esri/intl";
import PortalItem from "esri/portal/PortalItem";

const CSS = {
  base: "esri-interactive-legend-language-switcher"
};

@subclass("LanguageSwitcher")
export default class LanguageSwitcher extends Widget {
  constructor(params) {
    super(params);
  }

  private _portalItem: __esri.PortalItem;

  @property()
  base: ApplicationBase;

  @property()
  configurationSettings: any;

  @property()
  view: __esri.MapView;

  @property()
  handles: Handles;

  @property()
  langSwitcherNode: any;

  @property({
    readOnly: true
  })
  readonly selectedLanguageData: { locale: string; data: { [key: string]: string } };

  postInitialize(): void {
    this._portalItem = this.base?.results?.applicationItem?.value as PortalItem;

    if (this._isWithinConfigurationExperience()) {
      window.addEventListener(
        "message",
        (e: any) => {
          this._setLanguageSwitcherUI(this.base.config, this.configurationSettings);
        },
        false
      );
    }
  }

  getLanguageSwitcherHandles(widgetProps: esriWidgetProps): __esri.WatchHandle[] {
    return [
      watch(
        () => this.configurationSettings?.languageSwitcher,
        () => this._languageSwitcherCallback(widgetProps, "languageSwitcher"),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherPosition,
        () => this._languageSwitcherCallback(widgetProps, "languageSwitcherPosition"),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherConfig,
        () => this._languageSwitcherConfigCallback(widgetProps),
        { initial: true }
      )
    ];
  }

  render() {
    const { configurationSettings, _portalItem } = this;
    const config = configurationSettings.languageSwitcherConfig;
    const icon = config?.icon ?? "globe";
    const locales = config?.locales;
    return (
      <instant-apps-language-switcher
        bind={this}
        afterCreate={storeNode}
        class={CSS.base}
        icon={icon}
        locales={locales}
        portalItem={_portalItem}
        onselectedLanguageUpdated={this._handleSelection}
        view={this.view}
        data-node-ref="langSwitcherNode"
      />
    );
  }



  private async _setLanguageSwitcherUI(
    config: ApplicationConfig,
    configurationSettings: any
  ) {
    const t9nData = this.selectedLanguageData?.data;

    if (t9nData) {
      const settingKeys = Object.keys(t9nData);
      settingKeys.forEach((key) => {
        const withinConfigurationExperience = configurationSettings?.["withinConfigurationExperience"];
        const defaultLocaleValue = withinConfigurationExperience
          ? config?.draft?.[key]
          : config?.[key];
        const t9nValue = t9nData[key] ?? defaultLocaleValue;
        configurationSettings.set(key, t9nValue);
      });
    }
  }

  private async _addLanguageSwitcher(props: esriWidgetProps) {
    const { config, propertyName } = props;
    const { languageSwitcher, languageSwitcherConfig, languageSwitcherPosition } = config;
    const id = "esri-language-switcher";
    //   Find widget node in view UI
    const node = this.view.ui.find(id);
    //   If language switcher is not enabled and node exists - remove from UI.
    if (!languageSwitcher) {
      if (node) {
        this.view.ui.remove(node);
      }
      return Promise.resolve(null);
    }

    const expand = new Expand({
      id,
      content: this,
      expandIcon: languageSwitcherConfig?.icon ?? "globe"
    }) as __esri.Expand;

    if (node && propertyName === "languageSwitcherPosition") {
      this.view.ui.move(node, languageSwitcherPosition ?? "bottom-right");
    } else if (propertyName === "languageSwitcher") {
      this.view.ui.add(expand, languageSwitcherPosition ?? "bottom-right");
    }
  }

  private async _refresh(): Promise<void> {
    if (!this.langSwitcherNode) return;
    await this.langSwitcherNode.refresh();
    return Promise.resolve();
  }

  private async _handleSelection(e: CustomEvent): Promise<void> {
    this._set("selectedLanguageData", e.detail);
    console.log(e.detail);

    const defaultLanguage = this._getDefaultLanguage();
    if (e?.detail?.data === defaultLanguage || e?.detail === null) {
      const templateAppData = await this._portalItem.fetchData();
      if (
        this._isWithinConfigurationExperience() &&
        templateAppData?.values?.hasOwnProperty("draft")
      ) {
        Object.assign(this.configurationSettings, {
          ...templateAppData?.values,
          ...templateAppData?.values?.draft
        });
      } else {
        Object.assign(this.configurationSettings, {
          ...templateAppData?.values
        });
      }
    }
  }

  private _getDefaultLanguage(): string {
    // User profile - locale set in user profile
    const userProfileLocale: string = this.base.portal?.get("user.culture");
    // Browser - window.navigator.language
    const browserLocale: string = window?.navigator?.language;
    // ArcGIS JS API - locale currently set in JS api
    const jsapiLocale: string = getLocale();
    // Fallback locale - "en"
    const fallbackLocale = "en";
    return normalizeMessageBundleLocale(
      userProfileLocale || browserLocale || jsapiLocale || fallbackLocale
    ) as string;
  }

  private async _languageSwitcherCallback(
    widgetProps: esriWidgetProps,
    propertyName: string
  ): Promise<void> {
    widgetProps.propertyName = propertyName;
    const languageSwitcher = await this._addLanguageSwitcher(widgetProps);
    const handleKey = "languageSwitcher";

    const handleExists = this.handles.has(handleKey);

    when(
      () => languageSwitcher,
      () => {
        when(
          () => this.selectedLanguageData,
          () => {
            this._setLanguageSwitcherUI(this.base.config, this.configurationSettings);
          },
          { initial: true, once: true }
        );
      },
      { initial: true, once: true }
    );

    if (!handleExists) {
      this.handles.add(
        watch(
          () => this.selectedLanguageData,
          () => this._setLanguageSwitcherUI(this.base.config, this.configurationSettings),
          { initial: true }
        ),
        handleKey
      );
    }
  }

  private async _languageSwitcherConfigCallback(widgetProps: esriWidgetProps): Promise<void> {
    const expand = widgetProps?.view?.ui?.find("esri-language-switcher") as Expand;
    expand.expandIcon = this.configurationSettings.languageSwitcherConfig.icon;
    this.configurationSettings.languageSwitcherConfig =
      this.configurationSettings.languageSwitcherConfig;
    await this._refresh();
    this._setLanguageSwitcherUI(this.base.config, this.configurationSettings);
  }

  private _isWithinConfigurationExperience(): boolean {
    const { frameElement, location, parent } = window; // If frameElement is null, origins between parent and child do not match
    return frameElement
      ? // If origins match, check if parent iframe has data-embed-type="instant-config"
        frameElement.getAttribute("data-embed-type") === "instant-config"
        ? // If so, app is within config experience - use draft values
          true
        : // Otherwise, it is not within config experience - use publish values
          false
      : // Origins do not match
        // IF TRUE - If parent and child locations do not match, and the location hostnames are local host.
        // Use draft values for locally hosted config panel testing
        // IF FALSE - template app is embedded on hosted page - use publish values.
        location !== parent.location &&
          (location.hostname === "localhost" || location.hostname === "127.0.0.1");
  }
}

