import Search from "@arcgis/core/widgets/Search";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { fromJSON } from "@arcgis/core/geometry/support/jsonUtils";

import { when } from "@arcgis/core/core/reactiveUtils";

import Portal from "@arcgis/core/portal/Portal";
import PopupTemplate from "@arcgis/core/PopupTemplate";

interface SearchSourceConfigItem {
  maxResults: number;
  maxSuggestions: number;
  minSuggestCharacters: number;
  name: string;
  suggestionsEnabled: boolean;
  placeholder: string;
  withinViewEnabled: boolean;
  zoomScale: number;
  outFields?: string[];
}

interface LocatorSourceConfigItem extends SearchSourceConfigItem {
  locator?: { url: string };
  url: string;
  singleLineFieldName: string;
  countryCode: string;
}

interface LayerSourceConfigItem extends SearchSourceConfigItem {
  displayField: string;
  exactMatch: boolean;
  layer: {
    url: string | FeatureLayer;
    id: string;
  };
  outFields: string[];
  searchFields: string;
  popupTemplate: any;
  popupEnabled: boolean;
}

interface SearchConfiguration {
  activeSourceIndex?: number;
  allPlaceholder?: string;
  includeDefaultSources?: boolean;
  searchAllEnabled?: boolean;
  sources?: Array<LocatorSourceConfigItem | LayerSourceConfigItem>;
}

/**
 * Creates and configures an ArcGIS Search widget for a given view and portal.
 *
 * This function sets up the search sources based on the provided configuration,
 * handling both locator and layer sources. It also manages placeholder localization,
 * popup focus behavior, and default source inclusion.
 *
 * @param view - The MapView or SceneView instance to associate with the Search widget.
 * @param portal - The ArcGIS Portal instance for context.
 * @param searchConfiguration - The configuration object specifying search sources and options.
 * @param popupHover - Optional. If true, enables popup on hover and manages focus between popup and search box.
 * @returns The configured Search widget.
 */
export function createSearch(
  view: __esri.MapView | __esri.SceneView,
  portal: Portal,
  searchConfiguration: SearchConfiguration,
  popupHover?: boolean
): Search {
  const DEFAULT_PLACEHOLDER = "Find address or place";
  const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
  const sources = searchConfiguration?.sources;

  if (sources && sources?.length > 0) {
    searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;

    sources.forEach((source) => {
      if ("layer" in source) {
        const layerSource = source as LayerSourceConfigItem;
        const { id, url } = layerSource.layer || {};
        const layerFromMap = id ? view.map.findLayerById(id) : null;

        if (
          layerSource.popupTemplate &&
          layerSource?.popupTemplate?.declaredClass !== "esri.PopupTemplate"
        ) {
          layerSource.popupTemplate = PopupTemplate.fromJSON(
            layerSource.popupTemplate
          );
        }

        if (layerFromMap) {
          layerSource.layer = layerFromMap as FeatureLayer;
        } else if (url) {
          layerSource.layer =
            typeof url === "string" ? new FeatureLayer({ url }) : url;
        }
      } else {
        const locatorSource = source as LocatorSourceConfigItem;
        const isWorldLocatorExpression = new RegExp("/World/GeocodeServer");

        if (isWorldLocatorExpression.test(locatorSource?.url)) {
          if (!locatorSource?.placeholder)
            locatorSource.placeholder = DEFAULT_PLACEHOLDER;
          const outFields = locatorSource.outFields || [
            "Addr_type",
            "Match_addr",
            "StAddr",
            "City",
          ];
          locatorSource.outFields = outFields;
          locatorSource.singleLineFieldName = "SingleLine";
        }

        if (locatorSource?.locator?.url)
          locatorSource.url = locatorSource.locator.url;
      }
    });
  } else {
    searchConfiguration = {
      ...searchConfiguration,
      includeDefaultSources: true,
    };
  }

  const searchWidget = new Search({
    view,
    portal,
    ...searchConfiguration,
  });

  when(
    () => searchWidget?.["messages"],
    () => {
      // Replaces default placeholder ('Find address or place') with translated string from Search widget's t9n messages
      const searchWidget_t9n = searchWidget?.["messages"];

      if (
        searchWidget?.allPlaceholder === DEFAULT_PLACEHOLDER &&
        searchWidget_t9n?.allPlaceholder
      )
        searchWidget.allPlaceholder = searchWidget_t9n.allPlaceholder;

      searchWidget?.sources?.forEach((source: __esri.SearchSource) => {
        if (
          source?.placeholder === DEFAULT_PLACEHOLDER &&
          searchWidget_t9n?.placeholder
        )
          source.placeholder = searchWidget_t9n.placeholder;
      });
    },
    { once: true, initial: true }
  );

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

  return searchWidget;
}

export function handleSearchExtent(
  config: any,
  searchWidget: __esri.widgetsSearch
): void {
  const { extentSelector, extentSelectorConfig, mapArea } = config;
  if (searchWidget.sources != null) {
    let extent: __esri.Extent | undefined;
    if (
      (mapArea === true && extentSelector) ||
      (mapArea == null && extentSelector)
    ) {
      const geometry =
        fromJSON(extentSelectorConfig?.constraints?.geometry) || null;
      if (geometry) {
        extent = geometry.extent;
      }
    }

    searchWidget.sources.forEach((source) => {
      if (extent) {
        source.filter = {
          geometry: extent,
        };
      } else {
        source.filter = null as any;
      }
    });
  }
}
