/*
  Copyright 2024 Esri
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
import { esriWidgetProps } from "../../interfaces/applicationBase";

import PortalItem from "esri/portal/PortalItem";
import { isWithinConfigurationExperience } from "../../functionality/configurationSettings";
import { LanguageData } from "../../interfaces/commonInterfaces";
import { CSS, HANDLES_KEY, NODE_ID } from "./support/constants";
import { Defaults, ProperyNames } from "./support/enums";
import { autoUpdatedStrings } from "../t9nUtils";
import { getT9nData } from "./support/utils";

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
    this._init();
  }

  destroy(): void {
    this.removeHandles(HANDLES_KEY);
  }

  private _init() {
    this._portalItem = this.base?.results?.applicationItem?.value as PortalItem;
    if (isWithinConfigurationExperience()) this._addMessageEventListener();
  }

  private _addMessageEventListener() {
    window.addEventListener(
      "message",
      async (e: any) => {
        if (e?.data?.type === "cats-app") {
          this._updateUI();
        }
      },
      false
    );
  }

  private async _updateUI() {
    const t9nData = await getT9nData(this.selectedLanguageData, this.base);
    Object.keys(t9nData).forEach((key) =>
      this.configurationSettings.set(key, t9nData[key])
    );
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

  async handleSelection(e: CustomEvent): Promise<void> {
    const languageData = e.detail;
    this._set("selectedLanguageData", languageData);
    this._updateUI();
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
          async () => this._updateUI(),
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
    if (isWithinConfigurationExperience() && this.langSwitcherNode) {
      await this.langSwitcherNode.refresh();
    }
    this._updateUI();
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
