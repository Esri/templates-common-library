import FeatureFilter from "esri/layers/support/FeatureFilter";
import { fromJSON } from "esri/geometry/support/jsonUtils";
import LayerSearchSource from "esri/widgets/Search/LayerSearchSource";
import Search from "esri/widgets/Search";
import * as urlUtils from "esri/core/urlUtils";

import {
  ExtentLayerView,
  ICustomTheme,
  IPortalPropsSharedTheme
} from "../interfaces/commonInterfaces";

import { isWithinConfigurationExperience } from "./configurationSettings";
import { handleSearchExtent } from "./search";

export function checkCustomTheme(
  applyCustomTheme: boolean,
  customTheme: { applyPresetTheme: boolean }
): boolean {
  return (
    (applyCustomTheme && customTheme?.applyPresetTheme === undefined) ||
    customTheme?.applyPresetTheme
  );
}

//----------------------------------
//  getSharedTheme
//----------------------------------

/**
 * Maps shared theme values from portal properties
 * to standardized custom theme shape
 */

export function getSharedTheme(
  portalPropsSharedTheme: IPortalPropsSharedTheme,
  customTheme: ICustomTheme
): ICustomTheme {
  // Values to merge from custom theme
  const { applyPresetTheme, applySharedTheme, font, preset } = customTheme;

  // Properties to check for in custom theme
  const { primary, secondary, accent } = customTheme.themes;

  // Logo from org
  const logo = portalPropsSharedTheme?.logo?.small;

  // Construct shared theme object with re-mapped theme properties
  const sharedTheme = {
    applyPresetTheme,
    applySharedTheme,
    font,
    logo,
    preset,
    themes: {}
  };

  // Spread values into themes property
  const { themes } = sharedTheme;
  if (primary) themes["primary"] = { ...primary };
  if (secondary) themes["secondary"] = { ...secondary };
  if (accent) themes["accent"] = { ...accent };

  return sharedTheme;
}

//----------------------------------
//  updateViewsCalciteMode
//----------------------------------

/**
 * Update view's calcite-mode class when theme is updated
 */

export function updateViewsCalciteMode(mode: "light" | "dark"): void {
  const prevCalciteMode =
    mode === "light" ? "calcite-mode-dark" : "calcite-mode-light";
  const calciteMode =
    mode === "light" ? "calcite-mode-light" : "calcite-mode-dark";
  const uiContainers = document.querySelectorAll(`.esri-ui.${prevCalciteMode}`);
  for (let i = 0; i < uiContainers.length; i++) {
    uiContainers[i].className = uiContainers[i].className.replace(
      prevCalciteMode,
      calciteMode
    );
  }
}

//-----------------------------------
// handleCustomCSS
// ---------------------------------

/**
 * Performs the logic of the "customCSS" config setting
 */
export function handleCustomCSS(styleSheetId: string, styles: string): void {
  const customCSSStyleSheet = document.getElementById(styleSheetId);

  if (customCSSStyleSheet) {
    customCSSStyleSheet.remove();
  }

  const stylesheet = document.createElement("style");
  stylesheet.id = styleSheetId;
  const styleTextNode = document.createTextNode(styles);
  stylesheet.appendChild(styleTextNode);
  document.head.appendChild(stylesheet);
}

//-----------------------------------
// handleExtentSelector
// ---------------------------------

/**
 * Handles updating the view's constraint without filtering out features.
 * Watch for changes in mapArea, extentSelector, extentSelectorConfig.
 */
export function handleExtentSelector(
  config: any,
  view: __esri.MapView | __esri.SceneView
) {
  if (view?.type === "2d") {
    const map = view.map as __esri.WebMap;
    const { initialViewProperties } = map;
    const { mapArea, extentSelector, extentSelectorConfig } = config;
    const isMapAreaOn = mapArea == null ? true : mapArea;
    if (isMapAreaOn && extentSelector && extentSelectorConfig) {
      const { constraints, mapRotation } = extentSelectorConfig;
      const tempConstraints: __esri.MapViewConstraints = {
        ...constraints,
        geometry: fromJSON(constraints?.geometry)?.extent
      };
      tempConstraints.minScale = +constraints.minScale;
      tempConstraints.maxScale = +constraints.maxScale;
      view.constraints = tempConstraints;
      setMapRotation(view, mapRotation);
    } else {
      view.rotation = initialViewProperties.viewpoint?.rotation ?? 0;
      view.constraints.geometry = undefined;
      view.constraints.minZoom = -1;
      view.constraints.maxZoom = -1;
      view.constraints.minScale = 0;
      view.constraints.maxScale = 0;
      view.constraints.rotationEnabled = true;
    }
  }
}

/**
 *  Handles updating the view's constraint and uses extent to filter out features.
 *  Watch for changes in mapArea, extentSelector, extentSelectorConfig
 */
function handleExtentSelectorLVFilter(
  config: any,
  view: __esri.MapView,
  layerView?: ExtentLayerView
) {
  const filterLayers = [
    "feature",
    "ogc-feature",
    "csv",
    "geojson",
    "stream",
    "wfs"
  ];
  const map = view.map as __esri.WebMap;
  const { initialViewProperties } = map;
  const { mapArea, extentSelector, extentSelectorConfig } = config;
  const isMapAreaOn = mapArea == null ? true : mapArea;

  if (isMapAreaOn && extentSelector && extentSelectorConfig != null) {
    const { constraints, mapRotation } = extentSelectorConfig;
    const tempConstraints: __esri.MapViewConstraints = {
      ...constraints,
      geometry: fromJSON(constraints?.geometry)?.extent
    };
    if (tempConstraints.geometry != null) {
      const extent = tempConstraints.geometry;
      if (extent && (extent?.type === "extent" || extent?.type === "polygon")) {
        if (layerView != null) {
          if (filterLayers.includes(layerView.layer.type)) {
            layerView.filter = new FeatureFilter({
              ...layerView.filter,
              geometry: extent,
              spatialRelationship: "intersects"
            });
          }
        } else {
          view.allLayerViews.forEach((layerView) => {
            if (filterLayers.includes(layerView.layer.type)) {
              const filterLV = layerView as ExtentLayerView;
              filterLV.filter = new FeatureFilter({
                ...filterLV.filter,
                geometry: extent,
                spatialRelationship: "intersects"
              });
            }
          });
        }
      }
    }
    view.constraints = tempConstraints;
    setMapRotation(view, mapRotation);
  } else {
    view.allLayerViews.forEach((layerView) => {
      if (filterLayers.includes(layerView.layer.type)) {
        const featureLV = layerView as ExtentLayerView;
        featureLV.filter = new FeatureFilter({
          ...featureLV.filter,
          geometry: undefined,
          spatialRelationship: undefined
        });
      }
    });
    view.rotation = initialViewProperties.viewpoint?.rotation ?? 0;
    view.constraints.geometry = undefined;
    view.constraints.minZoom = -1;
    view.constraints.maxZoom = -1;
    view.constraints.minScale = 0;
    view.constraints.maxScale = 0;
    view.constraints.rotationEnabled = true;
  }
}

/**
 *  Handles using the extentSelector to update the layerView's filter on create.
 *  Watch for changes in mapArea, extentSelector, extentSelectorConfig.
 */
function handleExtentSelectorOnLVCreate(
  config: any,
  view: __esri.MapView
): void {
  if (view?.type === "2d") {
    const filterLayers = [
      "feature",
      "ogc-feature",
      "csv",
      "geojson",
      "stream",
      "wfs"
    ];
    view.on("layerview-create", (event) => {
      const { layer, layerView } = event;
      if (filterLayers.includes(layer.type)) {
        handleExtentSelectorLVFilter(
          config,
          view,
          layerView as ExtentLayerView
        );
      }
    });
  }
}

/**
 *  Handles using the extentSelector to update the layerView's filter on
 *  create if `view.ready` is false or allLayerViews if true
 *  Watch for changes in mapArea, extentSelector, extentSelectorConfig.
 */
export function handleExtentSelectorUpdate(
  config: any,
  view: __esri.MapView
): void {
  if (view == null) return;
  if (view.ready) {
    handleExtentSelectorLVFilter(config, view);
  } else {
    handleExtentSelectorOnLVCreate(config, view);
  }
}

function setMapRotation(view: __esri.MapView, rotation: number): void {
  if (view?.type === "2d") {
    const map = view.map as __esri.WebMap | __esri.WebScene;
    const { initialViewProperties } = map;
    const rotationEnabled = view.constraints.rotationEnabled === true;
    if (view.constraints != null && !rotationEnabled) {
      view.constraints.rotationEnabled = true;
      view.rotation =
        rotation != null
          ? rotation
          : initialViewProperties.viewpoint?.rotation ?? 0;
      view.constraints.rotationEnabled = false;
    } else {
      view.rotation = initialViewProperties.viewpoint?.rotation ?? 0;
    }
  }
}

//-----------------------------------
// handleCustomURLParam
// ---------------------------------

export async function handleCustomURLParam(
  config: any,
  view: __esri.MapView | __esri.SceneView
): Promise<void> {
  const { customURLParamName } = config;
  const customURLParam = config.customUrlParam?.layers?.[0];
  const fieldName = customURLParam?.fields?.[0];

  if (
    !customURLParam ||
    !customURLParamName ||
    !fieldName ||
    isWithinConfigurationExperience()
  )
    return;

  const layer = view.map.findLayerById(customURLParam.id);

  const layerSearchSource = new LayerSearchSource({
    layer,
    searchFields: customURLParam.fields,
    outFields: ["*"],
    exactMatch: true,
    displayField: fieldName
  });

  const searchResults = urlUtils.urlToObject(document.location.href);
  let searchTerm: string;
  if (searchResults?.query) {
    if (customURLParamName in searchResults.query) {
      searchTerm = searchResults.query[customURLParamName];
    }
  }

  if (layer) {
    view.when(async () => {
      await (view.map as __esri.WebMap).loadAll();
      const search = new Search({
        view,
        resultGraphicEnabled: false,
        searchAllEnabled: false,
        suggestionsEnabled: false,
        sources: [layerSearchSource],
        includeDefaultSources: false,
        searchTerm
      });
      handleSearchExtent(config, search);

      try {
        search.search();
      } catch {}
    });
  }
}
