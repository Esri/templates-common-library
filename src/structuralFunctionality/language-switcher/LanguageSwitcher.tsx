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
import { LanguageData } from "./support/interfaces";
import { CSS, HANDLES_KEY, NODE_ID, NO_DEFAULT_FIELDS, PREVENT_OVERWRITE } from "./support/constants";
import { Defaults, ProperyNames } from "./support/enums";


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

  @property()
  expandTooltip: string;

  @property()
  collapseTooltip: string;

  @property()
  expandGroup: string;

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
        () => this._languageSwitcherCallback(widgetProps, ProperyNames.LanguageSwitcher),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherOpenAtStart,
        () => this._languageSwitcherCallback(widgetProps, ProperyNames.LanguageSwitcherOpenAtStart),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherPosition,
        () => this._languageSwitcherCallback(widgetProps, ProperyNames.LanguageSwitcherPosition),
        { initial: true }
      )
    ];
  }

  render() {
    const { configurationSettings, _portalItem } = this;
    const config = configurationSettings.languageSwitcherConfig;
    const icon = config?.icon ?? Defaults.Icon;
    const locales = config?.locales;
    const defaultLocale = config?.defaultLocale ?? null;
    return (
      <instant-apps-language-switcher
        bind={this}
        afterCreate={storeNode}
        class={CSS.base}
        icon={icon}
        locales={locales}
        portalItem={_portalItem}
        defaultLocale={defaultLocale}
        onselectedLanguageUpdated={this._handleSelection}
        view={this.view}
        data-node-ref="langSwitcherNode"
      />
    );
  }

  setExpandGroup(expandGroup: string | null): void {
    const languageSwitcher = this.view?.ui?.find(NODE_ID) as __esri.Expand;
    if (!languageSwitcher || !expandGroup) return;
    this.expandGroup = expandGroup;
    languageSwitcher.group = expandGroup;
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
    const {
      languageSwitcher,
      languageSwitcherOpenAtStart,
      languageSwitcherConfig,
      languageSwitcherPosition
    } = config;

    const node = this.view.ui.find(NODE_ID) as __esri.Expand;

    if (propertyName === ProperyNames.LanguageSwitcher) {
      if (languageSwitcher) {
        if (!node) {
          const config = {
            id: NODE_ID,
            content: this,
            expandIcon: languageSwitcherConfig?.icon ?? Defaults.Icon,
            expanded: languageSwitcherOpenAtStart,
            view: this.view,
            mode: "floating"
          } as __esri.ExpandProperties;
          if (this.expandTooltip) config.expandTooltip = this.expandTooltip;
          if (this.collapseTooltip) config.collapseTooltip = this.collapseTooltip;
          if (this.expandGroup) config.group = this.expandGroup;
          const expand = new Expand(config) as __esri.Expand;
          this.view.ui.add(expand, languageSwitcherPosition ?? Defaults.Position);
        }
      } else {
        if (node) {
          this.view.ui.remove(node);
        }
      }
    } else if (node && propertyName === ProperyNames.LanguageSwitcherOpenAtStart) {
      node.expanded = languageSwitcherOpenAtStart;
    } else if (node && propertyName === ProperyNames.LanguageSwitcherPosition) {
      if (this.expandGroup) node.group = this.expandGroup;
      this.view.ui.move(node, languageSwitcherPosition ?? Defaults.Position);
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
      try {
        const templateAppData = await this._portalItem.fetchData();
        const values = templateAppData?.values;
        const baseConfig = this.base.config;
        let config: ApplicationConfig = { ...baseConfig, ...values };
        if (this.configurationSettings.withinConfigurationExperience)
          config = { ...config, ...values?.draft };
        // Iterates fields that do not have a default value set in the app's config params JSON and sets the appropriate value i.e. title
        this._processNoDefaultValues(config);
        this._preventOverwrite(config);
        Object.assign(this.configurationSettings, config);
      } catch (err) {
        console.error("ERROR: ", err);
      }
    }
  }

  private _processNoDefaultValues(config: ApplicationConfig): void {
    NO_DEFAULT_FIELDS.forEach((field) => {
      const value = config[field];
      if (value) return;
      const processedValue = this._getProcessedValue(field, config[field]);
      config[field] = processedValue;
    });
  }

  private _getProcessedValue(fieldName: string, value: string): string {
    switch (fieldName) {
      case "title":
        const appItemTitle = this.base?.results?.applicationItem?.value?.title;
        const { config, results } = this.base;
        const { webMapItems } = results;
        const validWebMapItems = webMapItems.map((response) => response.value);
        const item = validWebMapItems[0];
        const title = config?.title
          ? config.title
          : appItemTitle
          ? appItemTitle
          : item?.title
          ? item.title
          : "";
        return title;
      default:
        value;
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

    const handleExists = this.handles.has(HANDLES_KEY);

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
        HANDLES_KEY
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

  // Prevents the current values from being overwritten with a stale value
  private _preventOverwrite(config): void {
    for (const key in config) {
      const keyLowerCase = key.toLowerCase();
      const isColor = keyLowerCase.includes("color");
      const isPosition = keyLowerCase.includes("position");
      const preventOverwrite = PREVENT_OVERWRITE.indexOf(key) !== -1;
      if (typeof config[key] !== "string" || isColor || isPosition || preventOverwrite) {
        delete config[key];
      }
    }
  }
}
