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
  esriWidgetProps,
} from "../../interfaces/applicationBase";

import { getLocale, normalizeMessageBundleLocale } from "esri/intl";
import * as intl from "esri/intl";
import PortalItem from "esri/portal/PortalItem";
import { isWithinConfigurationExperience } from "../../functionality/configurationSettings";
import { LanguageData } from "../../interfaces/commonInterfaces";
import {
  GROUPED_CONTENT,
  CSS,
  HANDLES_KEY,
  NODE_ID,
  NO_DEFAULT_FIELDS,
  PREVENT_OVERWRITE,
} from "./support/constants";
import { Defaults, ProperyNames } from "./support/enums";
import { autoUpdatedStrings } from "../t9nUtils";
import {
  HandleContentArgs,
  HandleGroupedContentArgs,
} from "./support/interfaces";

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
  expandTooltipKey: string;

  @property()
  collapseTooltipKey: string;

  @property()
  messageBundleName: string;

  @property()
  expandGroup: string;

  @property({
    readOnly: true,
  })
  readonly selectedLanguageData: LanguageData;

  postInitialize(): void {
    this._portalItem = this.base?.results?.applicationItem?.value as PortalItem;
    if (isWithinConfigurationExperience()) {
      window.addEventListener(
        "message",
        (e: any) => {
          if (e?.data?.type === "cats-app") {
            this.setLanguageSwitcherUI(
              this.base.config,
              this.configurationSettings
            );
          }
        },
        false
      );
    }
  }

  destroy(): void {
    this.removeHandles(HANDLES_KEY);
  }

  getLanguageSwitcherHandles(
    widgetProps: esriWidgetProps
  ): __esri.WatchHandle[] {
    this.addHandles(
      watch(
        () => this.configurationSettings?.languageSwitcherConfig,
        () => {
          this.languageSwitcherConfigCallback(widgetProps);
        },
        { initial: true }
      ),
      HANDLES_KEY
    );
    return [
      watch(
        () => this.configurationSettings?.languageSwitcher,
        () =>
          this.languageSwitcherCallback(
            widgetProps,
            ProperyNames.LanguageSwitcher
          ),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherOpenAtStart,
        () =>
          this.languageSwitcherCallback(
            widgetProps,
            ProperyNames.LanguageSwitcherOpenAtStart
          ),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.languageSwitcherPosition,
        () =>
          this.languageSwitcherCallback(
            widgetProps,
            ProperyNames.LanguageSwitcherPosition
          ),
        { initial: true }
      ),
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
        onselectedLanguageUpdated={this.handleSelection}
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

  async setLanguageSwitcherUI(
    config: ApplicationConfig,
    configurationSettings: any
  ) {
    const t9nData = this.selectedLanguageData?.data;
    if (!t9nData) return;

    const groupedConfigSettings = {};
    const settingKeys = Object.keys(t9nData);

    const setLanguageSwitcherUICallback = () => {
      return (key: string) => {
        const IDs = this.getIDs(key);
        const isGroup = IDs.length > 1;
        const args = { key, t9nData, config };
        if (isGroup) {
          this.handleGroupedContent({ ...args, IDs, groupedConfigSettings });
          return;
        }

        this.handleContent({ ...args, configurationSettings });
      };
    };

    settingKeys.forEach(setLanguageSwitcherUICallback());

    const updateGroupedContent = Object.keys(groupedConfigSettings).length > 0;
    if (updateGroupedContent)
      Object.assign(configurationSettings, groupedConfigSettings);
  }

  handleGroupedContent({ ...args }: HandleGroupedContentArgs) {
    const { key, IDs, t9nData, config, groupedConfigSettings } = args;

    // grouped array item - searchConfiguration.sources-s8fg673, filterConfig.layerExpressions.expressions-a3bw528
    const isGroupedArray = IDs.length > 2;

    // group content - coverPage.titleText, searchConfiguration.allPlaceholder
    const isFlatGroup = IDs.length === 2;

    const uid = isGroupedArray ? IDs.pop() : null;

    const t9nValue = t9nData[key];

    const withinConfigurationExperience =
      this.configurationSettings?.["withinConfigurationExperience"];

    const [fieldName] = IDs;
    const currentValue = withinConfigurationExperience
      ? config?.draft?.[fieldName] ?? config?.[fieldName]
      : config?.[fieldName];

    if (currentValue == null) return;

    if (isGroupedArray) {
      const [fieldName, value] = this.handleGroupedArrayContent(
        IDs,
        currentValue,
        uid as string,
        t9nValue
      );
      groupedConfigSettings[fieldName] = value;
    } else if (isFlatGroup) {
      const [fieldName, value] = this.handleFlatGroupedContent(
        IDs,
        currentValue,
        t9nValue,
        groupedConfigSettings
      );
      groupedConfigSettings[fieldName] = value;
    }
  }

  handleGroupedArrayContent(
    IDs: string[],
    currentValue: any,
    uid: string,
    t9nValue: string
  ) {
    const [fieldName] = IDs;

    IDs.shift();

    // filterConfig.layerExpressions.expressions-a3bw528
    if (IDs.length > 2) {
      const [subsettingID, childSubsettingID, itemPropName] = IDs;
      const subsetting = currentValue[subsettingID];
      subsetting.forEach((subsettingItem) => {
        const childSubsetting = subsettingItem[childSubsettingID];
        childSubsetting.forEach((childSubsettingItem) => {
          if (childSubsettingItem["_uid"] === uid) {
            childSubsettingItem[itemPropName] = t9nValue;
          }
        });
      });
      return [fieldName, currentValue];
    }
    // searchConfiguration.sources-s8fg673
    else {
      const [subsettingID, itemPropName] = IDs;
      const subsetting = currentValue[subsettingID];
      subsetting.forEach((childSubsetting) => {
        if (childSubsetting["_uid"] === uid) {
          childSubsetting[itemPropName] = t9nValue;
        }
      });
      return [fieldName, currentValue];
    }
  }

  handleFlatGroupedContent(
    IDs: string[],
    currentValue: any,
    t9nValue: string,
    groupedConfigSettings: { [key: string]: any }
  ) {
    const [fieldName, subsettingID] = IDs;
    currentValue[subsettingID] = t9nValue;

    const doesNotHaveGroupedConfigSetting = !groupedConfigSettings[fieldName];
    if (doesNotHaveGroupedConfigSetting)
      groupedConfigSettings[fieldName] = currentValue;
    const value = {
      ...groupedConfigSettings[fieldName],
      [subsettingID]: t9nValue,
    };

    return [fieldName, value];
  }

  handleContent({ ...args }: HandleContentArgs) {
    const { configurationSettings, t9nData, key, config } = args;

    const withinConfigurationExperience =
      configurationSettings?.["withinConfigurationExperience"];
    const defaultLocaleValue = withinConfigurationExperience
      ? config?.draft?.[key]
      : config?.[key];
    const t9nValue = t9nData[key] ?? defaultLocaleValue;
    configurationSettings.set(key, t9nValue);
  }

  getIDs(key: string): string[] {
    const subtrings = key.split("-");
    const subtrings2 = subtrings[0].split(".");
    const IDs = [...subtrings2, subtrings[1]].filter(Boolean);
    return IDs;
  }

  handleLanguageSwitcher(props: esriWidgetProps): void {
    const { config, propertyName } = props;
    const {
      languageSwitcher,
      languageSwitcherOpenAtStart,
      languageSwitcherConfig,
      languageSwitcherPosition,
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
            mode: "floating",
          } as __esri.ExpandProperties;
          if (this.expandTooltip) config.expandTooltip = this.expandTooltip;
          if (this.collapseTooltip)
            config.collapseTooltip = this.collapseTooltip;
          if (this.expandGroup) config.group = this.expandGroup;
          const expand = new Expand(config) as __esri.Expand;
          this.setupAutoUpdateStrings(expand);
          this.view.ui.add(
            expand,
            languageSwitcherPosition ?? Defaults.Position
          );
        }
      } else {
        if (node) {
          this.view.ui.remove(node);
        }
      }
    } else if (
      node &&
      propertyName === ProperyNames.LanguageSwitcherOpenAtStart
    ) {
      node.expanded = languageSwitcherOpenAtStart;
    } else if (node && propertyName === ProperyNames.LanguageSwitcherPosition) {
      if (this.expandGroup) node.group = this.expandGroup;
      this.view.ui.move(node, languageSwitcherPosition ?? Defaults.Position);
    }
  }

  async refresh(): Promise<void> {
    if (!this.langSwitcherNode) return;
    await this.langSwitcherNode.refresh();
    return Promise.resolve();
  }

  async handleSelection(e: CustomEvent): Promise<void> {
    this._set("selectedLanguageData", e.detail);

    const data = e?.detail?.data;
    const isDefault = this.useDefaultLocaleStrings(data);
    const templateAppData = await this._portalItem.fetchData();
    const values = templateAppData?.values;
    const baseConfig = this.base.config;
    let config: ApplicationConfig = { ...baseConfig, ...values };
    if (this.configurationSettings.withinConfigurationExperience)
      config = { ...config, ...values?.draft };
    if (isDefault) {
      intl.setLocale(this.getDefaultLanguage());
      try {
        // Iterates fields that do not have a default value set in the app's config params JSON and sets the appropriate value i.e. title
        this.processNoDefaultValues(config);
        this.preventOverwrite(config);
        Object.assign(this.configurationSettings, config);
      } catch (err) {
        console.error("ERROR: ", err);
      }
    } else {
      intl.setLocale(e.detail?.locale);
      this.setLanguageSwitcherUI(config, this.configurationSettings);
    }
  }

  processNoDefaultValues(config: ApplicationConfig): void {
    NO_DEFAULT_FIELDS.forEach((field) => {
      const value = config[field];
      if (value) return;
      const processedValue = this.getProcessedValue(field, config[field]);
      config[field] = processedValue;
    });
  }

  getProcessedValue(fieldName: string, value: string): string {
    switch (fieldName) {
      case "title":
        const appItemTitle = this.base?.results?.applicationItem?.value?.title;
        const { config, results } = this.base;
        const { webMapItems } = results;
        const validWebMapItems = webMapItems?.map((response) => response.value);
        const item = validWebMapItems?.[0];
        const title = config?.title
          ? config.title
          : appItemTitle
          ? appItemTitle
          : item?.title
          ? item.title
          : "";
        return title;
      default:
        return value ?? "";
    }
  }

  useDefaultLocaleStrings(data: LanguageData): boolean {
    const defaultLanguage = this.getDefaultLanguage();
    return (
      data?.locale === defaultLanguage || data === null || data === undefined
    );
  }

  getDefaultLanguage(): string {
    // User profile - locale set in user profile
    const userProfileLocale: string = this.base.portal?.user?.culture;
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

  languageSwitcherCallback(
    widgetProps: esriWidgetProps,
    propertyName: string
  ): void {
    widgetProps.propertyName = propertyName;
    const languageSwitcher = this.handleLanguageSwitcher(widgetProps);

    when(
      () => languageSwitcher,
      () => {
        when(
          () => this.selectedLanguageData,
          () => {
            this.setLanguageSwitcherUI(
              this.base.config,
              this.configurationSettings
            );
          },
          { initial: true, once: true }
        );
      },
      { initial: true, once: true }
    );
  }

  async languageSwitcherConfigCallback(
    widgetProps: esriWidgetProps
  ): Promise<void> {
    const expand = widgetProps?.view?.ui?.find(
      "esri-language-switcher"
    ) as Expand;
    if (this.langSwitcherNode) {
      expand.expandIcon =
        this.configurationSettings.languageSwitcherConfig.icon;
      this.langSwitcherNode.config =
        this.configurationSettings.languageSwitcherConfig;
    }
    if (isWithinConfigurationExperience()) await this.refresh();
    this.setLanguageSwitcherUI(this.base.config, this.configurationSettings);
  }

  // Prevents the current values from being overwritten with a stale value
  preventOverwrite(config): void {
    for (const key in config) {
      const keyLowerCase = key.toLowerCase();
      const isColor = keyLowerCase.includes("color");
      const isPosition = keyLowerCase.includes("position");
      const preventOverwrite = PREVENT_OVERWRITE.indexOf(key) !== -1;
      if (
        (typeof config[key] !== "string" ||
          isColor ||
          isPosition ||
          preventOverwrite) &&
        !GROUPED_CONTENT.includes(key)
      ) {
        delete config[key];
      }
    }
  }

  setupAutoUpdateStrings(expand: __esri.Expand): void {
    if (
      this.messageBundleName &&
      this.expandTooltipKey &&
      this.collapseTooltipKey
    ) {
      autoUpdatedStrings.add({
        obj: expand,
        property: "expandTooltip",
        bundleName: this.messageBundleName,
        key: this.expandTooltipKey,
      });
      autoUpdatedStrings.add({
        obj: expand,
        property: "collapseTooltip",
        bundleName: this.messageBundleName,
        key: this.collapseTooltipKey,
      });
    }
  }
}
