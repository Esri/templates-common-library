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
import { isWithinConfigurationExperience } from "../../functionality/configurationSettings";

const CSS = {
  base: "esri-interactive-legend-language-switcher"
};

const HANDLES_KEY = "language-switcher-handles";

interface LanguageData {
  locale: string;
  data: { [key: string]: string };
}

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
  readonly selectedLanguageData: LanguageData;

  postInitialize(): void {
    this._portalItem = this.base?.results?.applicationItem?.value as PortalItem;
    if (isWithinConfigurationExperience()) {
      window.addEventListener(
        "message",
        (e: any) => {
          if (e?.data?.type === "cats-app") {
            this._setLanguageSwitcherUI(this.base.config, this.configurationSettings);
          }
        },
        false
      );
    }
  }

  destroy(): void {
    this.removeHandles(HANDLES_KEY);
  }

  getLanguageSwitcherHandles(widgetProps: esriWidgetProps): __esri.WatchHandle[] {
    this.addHandles(
      watch(
        () => this.configurationSettings?.languageSwitcherConfig,
        () => {
          this._languageSwitcherConfigCallback(widgetProps);
        },
        { initial: true }
      ),
      HANDLES_KEY
    );
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
      )
    ];
  }

  render() {
    const { configurationSettings, _portalItem } = this;
    const config = configurationSettings.languageSwitcherConfig;
    const icon = config?.icon ?? "language";
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

  private async _setLanguageSwitcherUI(config: ApplicationConfig, configurationSettings: any) {
    const t9nData = this.selectedLanguageData?.data;

    if (t9nData) {
      const settingKeys = Object.keys(t9nData);
      settingKeys.forEach((key) => {
        const withinConfigurationExperience =
          configurationSettings?.["withinConfigurationExperience"];
        const defaultLocaleValue = withinConfigurationExperience
          ? config?.draft?.[key]
          : config?.[key];
        const t9nValue = t9nData[key] ?? defaultLocaleValue;
        configurationSettings.set(key, t9nValue);
      });
    }
  }

  private _handleLanguageSwitcher(props: esriWidgetProps): void {
    const { config, propertyName } = props;
    const { languageSwitcher, languageSwitcherConfig, languageSwitcherPosition } = config;

    const id = "esri-language-switcher";
    const defaultPosition = "bottom-right";

    const node = this.view.ui.find(id);

    if (propertyName === "languageSwitcher") {
      if (languageSwitcher) {
        if (!node) {
          const expand = new Expand({
            id,
            content: this,
            expandIcon: languageSwitcherConfig?.icon ?? "language"
          }) as __esri.Expand;
          this.view.ui.add(expand, languageSwitcherPosition ?? defaultPosition);
        }
      } else {
        if (node) {
          this.view.ui.remove(node);
        }
      }
    } else if (node && propertyName === "languageSwitcherPosition") {
      this.view.ui.move(node, languageSwitcherPosition ?? defaultPosition);
    }
  }

  private async _refresh(): Promise<void> {
    if (!this.langSwitcherNode) return;
    await this.langSwitcherNode.refresh();
    return Promise.resolve();
  }

  private async _handleSelection(e: CustomEvent): Promise<void> {
    this._set("selectedLanguageData", e.detail);

    const data = e?.detail?.data;
    const isDefault = this._useDefaultLocaleStrings(data);
    if (isDefault) {
      const templateAppData = await this._portalItem.fetchData();
      const hasDraft = templateAppData?.values?.hasOwnProperty("draft");
      if (isWithinConfigurationExperience() && hasDraft) {
        const config = {
          ...templateAppData?.values,
          ...templateAppData?.values?.draft
        };
        delete config.languageSwitcher;
        delete config.languageSwitcherConfig;
        Object.assign(this.configurationSettings, config);
      } else {
        const config = {
          ...templateAppData?.values
        };
        delete config.languageSwitcher;
        delete config.languageSwitcherConfig;
        Object.assign(this.configurationSettings, config);
      }
    }
  }

  private _useDefaultLocaleStrings(data: LanguageData): boolean {
    const defaultLanguage = this._getDefaultLanguage();
    return data?.locale === defaultLanguage || data === null || data === undefined;
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

  private _languageSwitcherCallback(widgetProps: esriWidgetProps, propertyName: string): void {
    widgetProps.propertyName = propertyName;
    const languageSwitcher = this._handleLanguageSwitcher(widgetProps);
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
    if (this.langSwitcherNode) {
      expand.expandIcon = this.configurationSettings.languageSwitcherConfig.icon;
      this.langSwitcherNode.config = this.configurationSettings.languageSwitcherConfig;
    }
    if (isWithinConfigurationExperience()) await this._refresh();
    this._setLanguageSwitcherUI(this.base.config, this.configurationSettings);
  }
}
