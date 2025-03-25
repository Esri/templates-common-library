// Copyright 2025 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​

import { when } from "esri/core/reactiveUtils";
import BasemapToggle from "esri/widgets/BasemapToggle";
import Bookmarks from "esri/widgets/Bookmarks";
import BuildingExplorer from "esri/widgets/BuildingExplorer";
import Compass from "esri/widgets/Compass";
import Daylight from "esri/widgets/Daylight";
import Expand from "esri/widgets/Expand";
import FloorFilter from "esri/widgets/FloorFilter";
import FullScreen from "esri/widgets/Fullscreen";
import Home from "esri/widgets/Home";
import LayerList from "esri/widgets/LayerList";
import Legend from "esri/widgets/Legend";
import LineOfSight from "esri/widgets/LineOfSight";
import Locate from "esri/widgets/Locate";
import Scalebar from "esri/widgets/ScaleBar";
import ShadowCast from "esri/widgets/ShadowCast";
import Slice from "esri/widgets/Slice";
import Viewpoint from "esri/Viewpoint";
import Weather from "esri/widgets/Weather";
import Zoom from "esri/widgets/Zoom";

import SlicePanel from "../structuralFunctionality/widgets/slice/SlicePanel";
import ViewshedPanel from "../structuralFunctionality/widgets/viewshed/ViewshedPanel";
import "@esri/calcite-components/dist/components/calcite-button";

import { getBasemaps, resetBasemapsInToggle } from "./basemapToggle";
import { checkForElement } from "./generalUtils";
import { createSearch, handleSearchExtent } from "./search";
import ApplicationBase from "../baseClasses/ApplicationBase";
import { ApplicationConfig } from "../interfaces/applicationBase";
import Widget from "esri/widgets/Widget";

interface esriSceneWidgetProps {
  config: ApplicationConfig;
  view: __esri.SceneView;
  commonMessages: any;
  propertyName: string;
}

/**
 * Enforces deprecated widget property rules
 * @param config - ConfigSettings Object
 * @param keys
 */
export function handleDeprecatedProps(config: any): void {
  const { screenshot, screenshotPosition, exportToPDF } = config || {};
  if (screenshot && !exportToPDF) {
    // Screenshot is now deprecated - https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/5063
    // Will show exportToPDF instead for apps which have not had their values updated via the config panel
    config.screenshot = false;
    config.exportToPDF = true;
    config.exportToPDFPosition = screenshotPosition;
  }
}

/**
 * Watch for changes in home, homePosition, mapArea, mapAreaConfig
 */
export function addHome(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { home, homePosition, mapArea, mapAreaConfig } = config;
  const uniqueId = "esri-home";
  let node = view.ui.find(uniqueId) as Home;
  if (!home) {
    if (node) {
      view.ui.remove(node);
    }
    return;
  }

  if (node) {
    view.ui.move(node, homePosition);
  } else {
    node = new Home({ view, id: uniqueId });
    view.ui.add(node, homePosition);
  }

  if (mapArea && mapAreaConfig != null) {
    node.viewpoint = Viewpoint.fromJSON(mapAreaConfig);
  } else {
    const map = view.map as __esri.WebMap | __esri.WebScene;
    node.viewpoint = map.initialViewProperties.viewpoint;
  }
}

/**
 * Watch for changes in mapZoom, mapZoomPosition
 */
export function addZoom(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { mapZoom, mapZoomPosition } = config;
  const uniqueId = "esri-zoom";
  const node = view.ui.find(uniqueId);

  if (!mapZoom) {
    if (node) {
      view.ui.remove(node);
    }
    return;
  }

  if (node && mapZoomPosition != null) {
    view.ui.move(node, mapZoomPosition);
  } else {
    view.ui.add(new Zoom({ view, id: uniqueId }), mapZoomPosition);
  }
}

/**
 * Watch for changes in bookmarks, bookmarksPosition
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 * @param timeCapability optional param. If true add time capability in the Bookmarks widget.
 */
export function addBookmarks(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any,
  timeCapability = false
): void {
  const { bookmarks, bookmarksPosition } = config;
  const uniqueId = "esri-bookmarksExpand";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!bookmarks || view.type === "3d") {
    if (node) {
      view.ui.remove(node);
      node?.destroy();
    }
    return;
  }

  const group = getPosition(bookmarksPosition);
  const tip = commonMessages?.tools?.bookmarks;
  const closeTip = commonMessages?.tools?.close?.bookmarks;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    node.expanded = false;
    node.group = group;
    view.ui.move(node, bookmarksPosition);
  } else {
    const bookmarks = new Bookmarks({
      view,
      viewModel: {
        view,
        capabilities: { time: timeCapability },
      },
    });

    const bookmarksExpand = new Expand({
      view,
      content: bookmarks,
      id: uniqueId,
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: closeTip,
    });

    view.ui.add(bookmarksExpand, bookmarksPosition);
  }
}

/**
 * Watch for changes in scalebar, scalebarPosition, scalebarDualMode (if applicable)
 */
export function addScaleBar(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { scalebar, scalebarPosition, scalebarDualMode } = config;
  const uniqueId = "esri-scale-bar";
  const node = view.ui.find(uniqueId) as __esri.ScaleBar;
  const map = view.map as __esri.WebMap | __esri.WebScene;
  const portal = map.portalItem?.portal;

  if (!scalebar || view.type === "3d") {
    if (node) view.ui.remove(node);
    return;
  }

  if (node) {
    node.unit = scalebarDualMode
      ? "dual"
      : portal?.units === "metric"
      ? portal?.units
      : "imperial";
    view.ui.move(node, scalebarPosition);
  } else {
    view.ui.add(
      new Scalebar({
        id: uniqueId,
        view,
        unit: scalebarDualMode
          ? "dual"
          : portal?.units === "metric"
          ? portal?.units
          : "imperial",
      }),
      scalebarPosition
    );
  }
}

/**
 * Watch for changes in layerList, layerListPosition, layerListOpenAtStart
 */
export function addLayerList(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): void {
  const {
    layerList,
    layerListPosition,
    layerListOpenAtStart,
    layerListLegend,
    visibilityIcon,
  } = config;
  const uniqueId = "esri-layerListExpand";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!layerList) {
    view.ui.remove(node);
    return;
  }

  const group = getPosition(layerListPosition);
  const tip = commonMessages?.tools?.layerList;
  const closeTip = commonMessages?.tools?.close?.layerList;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    node.expanded = layerListOpenAtStart;
    view.ui.move(node, layerListPosition);
    if (node?.content) {
      const layerList = node.content as LayerList;
      updateListItemLegend(layerList, layerListLegend);
      layerList.visibilityAppearance = visibilityIcon;
    }
  } else {
    const content = new LayerList({
      dragEnabled: true,
      visibilityAppearance: visibilityIcon,
      visibleElements: {
        errors: true,
        filter: true,
      },
      view,
      listItemCreatedFunction: (e) => {
        configureListItemPanelLegend(e.item, layerListLegend);
      },
    } as any);

    content?.when(() => {
      (content as any).dragEnabled =
        content?.operationalItems?.length <= 1 ? false : true;
    });

    const layerListExpand = new Expand({
      id: uniqueId,
      content,
      expanded: layerListOpenAtStart,
      expandTooltip: tip,
      collapseTooltip: closeTip,
      group,
      mode: "floating",
      view,
    });
    view.ui.add(layerListExpand, layerListPosition);
  }
}

/**
 * Watch for changes in basemapTogglePosition, basemapToggle, basemapSelector
 */
export async function addBasemap(
  config: ApplicationConfig,
  view: __esri.MapView
): Promise<void> {
  const { basemapTogglePosition, basemapToggle, basemapSelector } = config;
  const uniqueId = "esri-basemapWidget";
  const map = view.map as __esri.WebMap | __esri.WebScene;
  const portal = map.portalItem?.portal;
  const { originalBasemap, nextBasemap } = await getBasemaps({
    config,
    view,
    portal,
  });
  const node = view.ui.find(uniqueId) as __esri.BasemapToggle;

  if (!basemapToggle) {
    if (node) {
      view.ui.remove(node);
      node.destroy();
    }
    return;
  }

  if (node) {
    view.ui.move(node, basemapTogglePosition);
    if (basemapSelector != null) {
      resetBasemapsInToggle(node, originalBasemap, nextBasemap);
    }
  } else {
    const bmToggle = new BasemapToggle({
      view,
      nextBasemap,
      id: uniqueId,
    });
    resetBasemapsInToggle(bmToggle, originalBasemap, nextBasemap);
    view.ui.add(bmToggle, basemapTogglePosition);
  }
}

/**
 * Watch for changes in legend, legendPosition, legendOpenAtStart, legendConfig (if applicable)
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 */
export function addLegend(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): void {
  const { legend, legendPosition, legendOpenAtStart, legendConfig } = config;
  const uniqueId = "esri-legendExpand";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!legend) {
    if (node) view.ui.remove(node);
    return;
  }

  const group = getPosition(legendPosition);
  const tip = commonMessages?.tools?.legend;
  const closeTip = commonMessages?.tools?.close?.legend;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    legendOpenAtStart ? node.expand() : node.collapse();
    if (legendConfig != null) {
      const l = node.content as __esri.Legend;
      l.respectLayerDefinitionExpression = true;
      if (legendConfig?.style) {
        l.style = legendConfig?.style;
      }
    }
    view.ui.move(node, legendPosition);
    node.group = group;
  } else {
    const content = new Legend({
      style: legendConfig?.style,
      respectLayerDefinitionExpression: true,
      view,
    });

    const legendExpand = new Expand({
      id: uniqueId,
      content,
      group,
      expanded: legendOpenAtStart,
      expandTooltip: tip,
      collapseTooltip: closeTip,
      mode: "floating",
      view,
    });
    view.ui.add(legendExpand, legendPosition);
  }
}

/**
 * Watch for changes in fullScreen, fullScreenPosition
 */
export function addFullscreen(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { fullScreen, fullScreenPosition } = config;
  const uniqueId = "esri-fullscreen";
  const node = view.ui.find(uniqueId);

  if (!fullScreen) {
    if (node) view.ui.remove(node);
    return;
  }

  if (node) {
    view.ui.move(node, fullScreenPosition);
  } else {
    view.ui.add(
      new FullScreen({
        id: uniqueId,
        view,
      }),
      fullScreenPosition
    );
  }
}

/**
 * Watch for changes in compassWidget, compassWidgetPosition
 */
export function addCompass(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { compassWidget, compassWidgetPosition } = config;
  const uniqueId = "esri-compass";
  const node = view.ui.find(uniqueId);

  if (!compassWidget) {
    if (node) view.ui.remove(node);
    return;
  }

  if (node) {
    view.ui.move(node, compassWidgetPosition);
  } else {
    view.ui.add(new Compass({ view, id: uniqueId }), compassWidgetPosition);
  }
}

/**
 * Watch for changes in locateWidget, locateWidgetPosition
 */
export function addLocateWidget(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { locateWidget, locateWidgetPosition } = config;
  const uniqueId = "esri-locate";
  const node = view.ui.find(uniqueId);

  if (!locateWidget) {
    if (node) {
      view.ui.remove(node);
    }
    return;
  }

  if (node && locateWidgetPosition != null) {
    view.ui.move(node, locateWidgetPosition);
  } else {
    view.ui.add(new Locate({ view, id: uniqueId }), locateWidgetPosition);
  }
}

/**
 * Watch for changes in search, searchOpenAtStart, searchPosition, searchConfiguration, extentSelector, extentSelectorConfig, mapArea
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 */
export function addSearch(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): void {
  const { search, searchPosition, searchOpenAtStart, searchConfiguration } =
    config;
  const popupHover = config?.popupHover;
  const uniqueId = "esri-searchExpand";
  let node = view.ui.find(uniqueId) as __esri.Expand;

  if (node) {
    view.ui.remove(node);
    node?.destroy();
    node = null;
  }

  if (!search) {
    return;
  }

  const group = getPosition(searchPosition);
  const tip = commonMessages?.tools?.search;
  const closeTip = commonMessages?.tools?.close?.search;

  const map = view.map as __esri.WebMap | __esri.WebScene;
  const portal = map.portalItem?.portal;
  const tmpSearchConfig = JSON.parse(JSON.stringify(searchConfiguration));
  const searchWidget = createSearch(view, portal, tmpSearchConfig);
  searchWidget.on("search-complete", () => {
    if (searchWidget.popupEnabled) {
      // Handle setting focus on popup and then back
      // to search box
      if (popupHover) view.popupEnabled = true;
      when(
        () => view?.popup?.viewModel?.active === true,
        () => {
          view.popup.focus();
          when(
            () => view?.popup?.visible === false,
            () => {
              searchWidget.focus();
              if (popupHover) view.popupEnabled = false;
            },
            { initial: true, once: true }
          );
        },
        { initial: true, once: true }
      );
    }
  });
  node = new Expand({
    view,
    content: searchWidget,
    id: uniqueId,
    group,
    mode: "floating",
    focusTrapDisabled: true,
    collapseTooltip: closeTip,
    expandTooltip: tip,
    expanded: searchOpenAtStart,
  } as any);
  view.ui.add(node, searchPosition);
  handleSearchExtent(config, node.content as __esri.widgetsSearch);
}

/**
 * Watch for changes in share, sharePosition, shareIncludeEmbed (if applicable), shareIncludeSocial (if applicable)
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 */
export async function addShare(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): Promise<any | undefined> {
  const { share, sharePosition, shareIncludeEmbed, shareIncludeSocial } =
    config;
  const uniqueId = "esri-instant-apps-share";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!share) {
    if (node) view.ui.remove(node);
    return;
  }

  const group = getPosition(sharePosition);
  let socialShare: any;
  const tip = commonMessages?.tools?.share;
  const closeTip = commonMessages?.tools?.close?.share;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    node.group = group;
    view.ui.move(node, sharePosition);
    const container = node.container as HTMLElement;
    socialShare = await checkForElement(container, "instant-apps-social-share");
    if (socialShare != null) {
      socialShare.view = view;
      socialShare.socialMedia = shareIncludeSocial;
      socialShare.embed = shareIncludeEmbed;
    }
  } else {
    const displayTipText = view?.type === "2d";
    socialShare = document.createElement("instant-apps-social-share");
    socialShare.mode = "inline";
    socialShare.scale = "s";
    socialShare.displayTipText = displayTipText;
    socialShare.view = view;
    socialShare.socialMedia = shareIncludeSocial;
    socialShare.embed = shareIncludeEmbed;
    const container = document.createElement("div");
    container.style.maxHeight = "50vh";
    container.style.overflowY = "auto";
    container.prepend(socialShare);
    const shareExpand = new Expand({
      id: uniqueId,
      content: container,
      expandIcon: "share",
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: closeTip,
      view,
    });
    view.ui.add(shareExpand, sharePosition);
  }

  return socialShare;
}

/**
 * Watch for changes in keyboardShortcuts, keyboardShortcutsPosition
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 */
export async function addKeyboardShortcuts(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): Promise<void> {
  const { keyboardShortcuts, keyboardShortcutsPosition } = config;
  const uniqueId = "esri-instant-apps-keyboard-shortcuts";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!keyboardShortcuts) {
    if (node) view.ui.remove(node);
    return;
  }

  const group = getPosition(keyboardShortcutsPosition);
  const tip = commonMessages?.tools?.keyboard;
  const closeTip = commonMessages?.tools?.close?.keyboard;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    node.expanded = false;
    node.group = group;
    view.ui.move(node, keyboardShortcutsPosition);
    const container = node.container as HTMLElement;
    const keyboard = (await checkForElement(
      container,
      "instant-apps-keyboard-shortcuts"
    )) as any;
    if (keyboard != null) {
      keyboard.view = view;
    }
  } else {
    const keyboardWidget = document.createElement(
      "instant-apps-keyboard-shortcuts"
    ) as any;
    keyboardWidget.view = view;
    const container = document.createElement("div");
    container.prepend(keyboardWidget);
    container.style.maxHeight = "50vh";
    container.style.overflowY = "auto";
    const keyboardExpand = new Expand({
      id: uniqueId,
      content: container,
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: closeTip,
      expandIcon: "keyboard",
      view,
    });
    view.ui.add(keyboardExpand, keyboardShortcutsPosition);
  }
}

/**
 * Watch for changes in measure, measurePosition
 * @param commonMessages add a script to copy the common file from the arcgis-portal-app-templates/instant root folder to your app e.g. `"copyCommon": "ncp ../t9n/ public/assets/t9n/Common"`
 */
export async function addMeasurementTools(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  commonMessages: any
): Promise<void> {
  const { measure, measurePosition } = config;
  const uniqueId = "esri-instant-apps-measurement";
  const node = view.ui.find(uniqueId) as __esri.Expand;

  if (!measure) {
    if (node) view.ui.remove(node);
    return;
  }

  const group = getPosition(measurePosition);
  let measureTools;
  const tip = commonMessages?.tools?.measureTools;
  const closeTip = commonMessages?.tools?.close?.measureTools;

  if (node) {
    node.expandTooltip = tip;
    node.collapseTooltip = closeTip;
    node.expanded = false;
    node.group = group;
    view.ui.move(node, measurePosition);
    const container = node.container as HTMLElement;
    measureTools = (await checkForElement(
      container,
      "instant-apps-measurement"
    )) as any;
    if (measureTools != null) {
      measureTools.view = view;
    }
  } else {
    measureTools = document.createElement("instant-apps-measurement");
    measureTools.areaUnit = "square-miles";
    measureTools.linearUnit = "miles";
    measureTools.activeToolType = "distance";
    measureTools.view = view;
    const container = document.createElement("div");
    container.prepend(measureTools);
    const measureExpand = new Expand({
      id: uniqueId,
      content: document.createElement("instant-apps-measurement"),
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: closeTip,
      expandIcon: "measure",
      view,
    });
    view.ui.add(measureExpand, measurePosition);
  }
}

/**
 * Watch for changes in floorFilter, floorFilterPosition
 */
export function addFloorFilter(props: esriSceneWidgetProps): void {
  if (!FloorFilter) return;
  const { config, view, commonMessages, propertyName } = props;
  const { floorFilter, floorFilterPosition } = config;

  const expandId = "esri-floor-filterExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;
  const widgetId = "esri-floor-filter";

  if (!floorFilter) {
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const group = getPosition(floorFilterPosition);
  const tip = commonMessages?.tools?.floorFilter;

  if (propertyName === "floorFilterPosition" && expandNode) {
    if (propertyName === "floorFilterPosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip;
      expandNode.group = group;
      view.ui.move(expandNode, floorFilterPosition);
    }
  } else if (propertyName === "floorFilter") {
    const content = new FloorFilter({
      id: widgetId,
      view
    });

    const floorFilterExpand = new Expand({
      id: expandId,
      view,
      content,
      mode: "floating",
      group,
      collapseTooltip: tip,
      expandTooltip: tip,
      expandIcon: "urban-model",
    });

    view.ui.add(floorFilterExpand, floorFilterPosition);
  }
}

let languageSwitcherController = new AbortController();
/**
 * Watch for changes in languageSwitcher, languageSwitcherConfig, languageSwitcherPosition, languageSwitcherOpenAtStart
 */
export async function addLanguageSwitcher(
  config: ApplicationConfig,
  base: ApplicationBase,
  view: __esri.MapView | __esri.SceneView,
  handleLanguageUpdate: Function,
  commonMessages: any
): Promise<void> {
  const {
    languageSwitcher,
    languageSwitcherConfig,
    languageSwitcherPosition,
    languageSwitcherOpenAtStart,
  } = config;
  const uniqueId = "esri-language-switcher";
  let node = view.ui.find(uniqueId) as __esri.Expand;

  if (!languageSwitcher) {
    if (node) view.ui.remove(node);
    return;
  }

  const group = getPosition(languageSwitcherPosition);
  const tip = commonMessages?.tools?.languageSwitcher;
  const closeTip = commonMessages?.tools?.close?.languageSwitcher;

  if (node) {
    node.expandIcon = languageSwitcherConfig?.icon ?? "language";
    const container = node.container as HTMLElement;
    const ls = (await checkForElement(
      container,
      "instant-apps-language-switcher"
    )) as any;
    if (ls != null) {
      ls.icon = languageSwitcherConfig?.icon ?? "language";
      ls.locales = structuredClone(languageSwitcherConfig?.locales);
      languageSwitcherController.abort();
      languageSwitcherController = new AbortController();
      ls.addEventListener(
        "selectedLanguageUpdated",
        handleLanguageUpdate.bind(this),
        {
          signal: languageSwitcherController.signal,
        }
      );
    }
    view.ui.move(node, languageSwitcherPosition);
  } else {
    const ls = document.createElement("instant-apps-language-switcher") as any;
    const defaultLocale = languageSwitcherConfig?.defaultLocale ?? "en";
    ls.defaultLocale = defaultLocale;
    const applicationItem = base?.results?.applicationItem
      ?.value as __esri.PortalItem;
    ls.portalItem = applicationItem;
    ls.icon = languageSwitcherConfig?.icon ?? "language";
    ls.locales = structuredClone(languageSwitcherConfig?.locales);
    ls.addEventListener(
      "selectedLanguageUpdated",
      handleLanguageUpdate.bind(this),
      {
        signal: languageSwitcherController.signal,
      }
    );

    const container = document.createElement("div");
    container.prepend(ls);
    node = new Expand({
      expandIcon: languageSwitcherConfig?.icon ?? "language",
      view,
      content: container,
      id: uniqueId,
      mode: "floating",
      focusTrapDisabled: true,
    } as any);
    view.ui.add(node, languageSwitcherPosition);
  }
  node.expandTooltip = tip;
  node.collapseTooltip = closeTip;
  node.group = group;
  node.expanded = languageSwitcherOpenAtStart;
}

export function getPosition(position: { position: string } | string): string {
  let groupName = "";
  if (typeof position === "string") {
    groupName = position;
  } else if (position?.position) {
    groupName = position.position;
  }
  return groupName;
}

function configureListItemPanelLegend(
  item: __esri.ListItem,
  layerListLegend: boolean
): void {
  const panelContent = layerListLegend ? { content: "legend" } : null;
  item.panel = panelContent as unknown as __esri.ListItemPanel;
}

function updateListItemLegend(
  layerList: __esri.LayerList,
  layerListLegend: boolean
): void {
  layerList?.operationalItems?.forEach((item) => {
    configureListItemPanelLegend(item, layerListLegend);
  });
}

/**
 * Watch for changes in buildingExplorer, buildingExplorerPosition
 */
export function addBuildingExplorer(props: esriSceneWidgetProps) {
  if (!BuildingExplorer) return;
  const { config, view, commonMessages, propertyName } = props;
  const { buildingExplorer, buildingExplorerPosition } = config;
  const expandId = "esri-building-explorerExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;

  if (!buildingExplorer) {
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const group = getPosition(buildingExplorerPosition);
  const tip = commonMessages?.tools?.buildingExplorer;

  if (propertyName === "buildingExplorerPosition" && expandNode) {
    expandNode.collapseTooltip = tip;
    expandNode.expandTooltip = tip;
    expandNode.group = group;
    view.ui.move(expandNode, buildingExplorerPosition);
  }
  else if (propertyName === "buildingExplorer") {
    if (expandNode) return;
    const buildingLayers = [];
    view.map.layers?.filter((l) => {
      if (l?.type === "group") {
        return (l as __esri.GroupLayer)?.layers?.some((subLayer) => {
          if (subLayer?.type === "building-scene") {
            buildingLayers.push(subLayer);
          }
        });
      } else {
        if (l?.type === "building-scene") {
          buildingLayers.push(l);
        }
      }
    });

    const buildingExplorerWidget = new BuildingExplorer({ view, layers: buildingLayers });
    const buildingExplorerExpand = new Expand({
      id: expandId,
      view,
      mode: "auto",
      group,
      collapseTooltip: tip,
      expandTooltip: tip,
      content: buildingExplorerWidget
    });

    view.ui.add(buildingExplorerExpand, buildingExplorerPosition);
  }
}

/**
 * Watch for changes in showWeather, weatherPosition
 */
export function addWeather(props: esriSceneWidgetProps) {
  if(!Weather) return;
  const { config, view, commonMessages, propertyName } = props;
  const { showWeather, weatherPosition } = config;
  const expandId = "esri-weatherExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;

  if (!showWeather) {
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const group = getPosition(weatherPosition);
  const tip = commonMessages?.tools?.weather;

  if (propertyName === "weatherPosition" && expandNode) {
    expandNode.collapseTooltip = tip;
    expandNode.expandTooltip = tip;
    expandNode.group = group;
    view.ui.move(expandNode, weatherPosition);
  } else if (propertyName === "showWeather") {
    if (expandNode) return;
    const content = new Weather({ view });
    const weatherExpand = new Expand({
      id: expandId,
      content,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      group,
      expandIcon: "rain-snow",
      view
    });

    view.ui.add(weatherExpand, weatherPosition);
  }
}

function containsExpandedComponent(position, view): boolean {
  let group = position;
  if (position === "mobile-top" || position === "mobile-bottom") {
    group = position === "mobile-top" ? ["top-right", "top-left"] : ["bottom-right", "bottom-left"];
  }
  return view?.ui?.getComponents(group)?.some((c) => {
    return c?.expanded;
  });
}

/**
 * Watch for changes in daylight, daylightPosition, daylightShadows, daylightDate, daylightTime, daylightDateOrSeason, daylightOpenAtStart
 */
export function addDaylight(props: esriSceneWidgetProps) {
  if (!Daylight) return;
  const { view, config, commonMessages, propertyName } = props;
  const {
    daylight,
    daylightShadows,
    daylightPosition,
    daylightTime,
    daylightDate,
    daylightDateOrSeason,
    daylightOpenAtStart
  } = config;
  const expandId = "esri-daylightExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;

  if (!daylight) {
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const sv = view as __esri.SceneView;
  const group = getPosition(daylightPosition);
  const tip = commonMessages?.tools?.daylight;
  const expanded = daylightOpenAtStart && !containsExpandedComponent(group, view);

  if (
    (propertyName === "daylightDate" ||
      propertyName === "daylightTime" ||
      propertyName === "daylightDateOrSeason" ||
      propertyName === "daylightPosition" ||
      propertyName === "daylightOpenAtStart" ||
      propertyName === "daylightShadows") &&
      expandNode
  ) {
    if (propertyName === "daylightOpenAtStart") {
      expanded ? expandNode.expand() : expandNode.collapse();
    }
    if (propertyName === "daylightShadows") {
      sv.environment.lighting.directShadowsEnabled = daylightShadows;
    }
    if (
      (propertyName === "daylightDate" && daylightDate && daylightDate !== "") ||
      (propertyName === "daylightTime" && daylightTime)
    ) {
      let date;
      if (daylightTime && daylightDate) {
        date = new Date(`${daylightDate}T${daylightTime}Z`);
      }
      const lighting = sv.environment.lighting as __esri.SunLighting;
      lighting.date = date;
    }

    if (propertyName === "daylightDateOrSeason") {
      const content = expandNode.content as any;
      content.dateOrSeason = daylightDateOrSeason;
    }
    if (propertyName === "daylightPosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip;
      expandNode.group = group;
      view.ui.move(expandNode, daylightPosition);
    }
  } else if (propertyName === "daylight") {
    sv.environment.lighting.directShadowsEnabled = daylightShadows;
    const content = new Daylight({
      view,
      dateOrSeason: daylightDateOrSeason
    });

    const daylightExpand = new Expand({
      id: expandId,
      content,
      group,
      expandIcon: "brightness",
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      view,
      expanded
    });

    view.ui.add(daylightExpand, daylightPosition);
  }
}

/**
 * Watch for changes in slice, slicePosition, sliceOpenAtStart
 */
export function addSlice(props: esriSceneWidgetProps) {
  if (!Slice) return;
  const { view, config, commonMessages, propertyName } = props;
  const { slice, slicePosition, sliceOpenAtStart } = config;
  const sceneView = view as __esri.SceneView;

  const expandId = "esri-sliceExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;
  if (!slice) {
    if (expandNode) {
      const slicePanel = expandNode?.content as Widget;
      if (slicePanel) slicePanel.destroy();
      view.ui.remove(expandNode);
    }
    return;
  }

  const group = getPosition(slicePosition);
  const expanded = sliceOpenAtStart && !containsExpandedComponent(group, view);
  const tip = commonMessages?.tools?.slice;

  if ((propertyName === "slicePosition" || propertyName === "sliceOpenAtStart") && expandNode) {
    if (propertyName === "sliceOpenAtStart") {
      expanded ? expandNode.expand() : expandNode.collapse();
    }
    if (propertyName === "slicePosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip;
      expandNode.group = group;
      view.ui.move(expandNode, slicePosition);
    }
  } else if (propertyName === "slice") {
    const content = new SlicePanel({
      config,
      view: sceneView
    });

    const sliceExpand = new Expand({
      id: expandId,
      content,
      group,
      expandIcon: "slice",
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      expanded,
      view
    });

    view.ui.add(sliceExpand, slicePosition);
  }
}

/**
 * Watch for changes in lineOfSight, lineOfSightPosition, lineOfSightOpenAtStart
 */
export function addLineOfSight(props: esriSceneWidgetProps) {
  if (!LineOfSight) return;
  const { view, config, commonMessages, propertyName } = props;
  const { lineOfSight, lineOfSightPosition, lineOfSightOpenAtStart } = config;

  const expandId = "esri-line-of-sightExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;

  if (!lineOfSight) {
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const group = getPosition(lineOfSightPosition);
  const expanded = lineOfSightOpenAtStart && !containsExpandedComponent(group, view);
  const tip = commonMessages?.tools?.los;

  if ((propertyName === "lineOfSightPosition" || propertyName === "lineOfSightOpenAtStart") && expandNode) {
    if (propertyName === "lineOfSightOpenAtStart") {
      expanded ? expandNode.expand() : expandNode.collapse();
    }

    if (propertyName === "lineOfSightPosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip;
      expandNode.group = group;
      view.ui.move(expandNode, lineOfSightPosition);
    }
  } else if (propertyName === "lineOfSight") {
    const content = new LineOfSight({
      view
    });

    const lineOfSightExpand = new Expand({
      id: expandId,
      content,
      group,
      expandIcon: "line-of-sight",
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      view,
      expanded
    });

    view.ui.add(lineOfSightExpand, lineOfSightPosition);
  }
}

/**
 * Watch for changes in shadowCastOpenAtStart, shadowCast, shadowCastPosition
 */
export function addShadowCast(props: esriSceneWidgetProps) {
  if (!ShadowCast) return;
  const { view, config, commonMessages, propertyName } = props;
  const { shadowCastOpenAtStart, shadowCast, shadowCastPosition } = config;

  const expandId = "esri-shadow-castExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;
  if (!shadowCast) {
    const btn = document.getElementById("clearShadows");
    btn?.click();
    if (expandNode) view.ui.remove(expandNode);
    return;
  }

  const group = getPosition(shadowCastPosition);
  const expanded = shadowCastOpenAtStart && !containsExpandedComponent(group, view);
  const tip = commonMessages?.tools?.shadowCast;

  if (propertyName === "shadowCastPosition" && expandNode) {
    if (propertyName === "shadowCastPosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip
      expandNode.group = group;
      view.ui.move(expandNode, shadowCastPosition);
    }
  } else if (propertyName === "shadowCastOpenAtStart" && expandNode) {
    expandNode.expanded = expanded;
  } else if (propertyName === "shadowCast") {
    const content = document.createElement("div");

    const shadowCast = new ShadowCast({ view, container: document.createElement("div") });
    content.append(shadowCast.container);

    const buttonContainer = document.createElement("div");
    content.append(buttonContainer);

    // Clear button
    const clearButton = document.createElement("calcite-button") as any;
    clearButton.id = "clearShadows";
    clearButton.classList.add("esri-button", "esri-themed-button");

    clearButton.appearance = "outline-fill";
    clearButton.innerHTML = commonMessages?.clear;
    clearButton.addEventListener("click", () => {
      shadowCast.viewModel.stop();
    });

    // Apply Shadow button
    const applyShadow = document.createElement("calcite-button") as any
    applyShadow.classList.add("esri-button", "esri-themed-button");

    applyShadow.appearance = "solid";
    applyShadow.innerHTML = commonMessages?.applyAnalysis;
    applyShadow.addEventListener("click", () => {
      shadowCast.viewModel.start();
      view.extent = view.extent;
    });

    buttonContainer.append(applyShadow);
    buttonContainer.append(clearButton);
    shadowCast.viewModel.stop();

    const shadowCastExpand = new Expand({
      id: expandId,
      content,
      group,
      mode: "floating",
      expandTooltip: tip,
      collapseTooltip: tip,
      expandIcon: "measure-building-height-shadow",
      view,
      expanded
    });

    view.ui.add(shadowCastExpand, shadowCastPosition);
  }
}

/**
 * Watch for changes in viewshed, viewshedPosition
 */
export function addViewshed(props: esriSceneWidgetProps) {
  const { view, config, commonMessages, propertyName } = props;
  const sceneView = view as __esri.SceneView;
  const { viewshed, viewshedPosition } = config;

  const expandId = "esri-viewshedExpand";
  const expandNode = view.ui.find(expandId) as __esri.Expand;
  if (!viewshed) {
    if (expandNode) {
      const panel = expandNode?.content as ViewshedPanel;
      if (panel) panel.destroy();
      view.ui.remove(expandNode);
    }
    return;
  }

  const group = getPosition(viewshedPosition);
  const expanded = !containsExpandedComponent(group, view);
  const tip = commonMessages?.tools?.viewshed.expand;

  if (propertyName === "viewshedPosition" && expandNode) {
    if (propertyName === "viewshedPosition") {
      expandNode.collapseTooltip = tip;
      expandNode.expandTooltip = tip;
      expandNode.group = group;
      view.ui.move(expandNode, viewshedPosition);
    }
  } else if (propertyName === "viewshed") {
    const content = new ViewshedPanel({
      config: config,
      view: sceneView
    });

    const viewshedExpand = new Expand({
      id: expandId,
      content,
      group,
      expandIcon: "viewshed",
      mode: "auto",
      expandTooltip: tip,
      collapseTooltip: tip,
      view
    });

    view.ui.add(viewshedExpand, viewshedPosition);
  }
}