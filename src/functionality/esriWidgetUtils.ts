// Copyright 2022 Esri
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
import Compass from "esri/widgets/Compass";
import Expand from "esri/widgets/Expand";
import FloorFilter from "esri/widgets/FloorFilter";
import FullScreen from "esri/widgets/Fullscreen";
import Home from "esri/widgets/Home";
import LayerList from "esri/widgets/LayerList";
import Legend from "esri/widgets/Legend";
import Locate from "esri/widgets/Locate";
import Scalebar from "esri/widgets/ScaleBar";
import Viewpoint from "esri/Viewpoint";
import Zoom from "esri/widgets/Zoom";

import { getBasemaps, resetBasemapsInToggle } from "./basemapToggle";
import { checkForElement } from "./generalUtils";
import { createSearch, handleSearchExtent } from "./search";
import ApplicationBase from "../baseClasses/ApplicationBase";
import { ApplicationConfig } from "../interfaces/applicationBase";

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
export function addFloorFilter(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  const { floorFilter, floorFilterPosition } = config;
  const uniqueId = "esri-floor-filter";
  const node = view.ui.find(uniqueId) as __esri.FloorFilter;

  if (!floorFilter) {
    if (node) view.ui.remove(node);
    return;
  }

  if (node) {
    view.ui.move(node, floorFilterPosition);
  } else {
    view.ui.add(
      new FloorFilter({
        id: uniqueId,
        view,
        headingLevel: 3,
      }),
      floorFilterPosition
    );
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
    });
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
