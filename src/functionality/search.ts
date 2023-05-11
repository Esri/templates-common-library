import Search from "esri/widgets/Search";
import FeatureLayer from "esri/layers/FeatureLayer";

import Portal from "esri/portal/Portal";

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

export function createSearch(
  view: __esri.MapView | __esri.SceneView,
  portal: Portal,
  searchConfiguration: SearchConfiguration
): Search {
  const DEFAULT_PLACEHOLDER = "Find address or place";
  const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
  const sources = searchConfiguration?.sources;

  if (sources?.length > 0) {
    searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;

    sources.forEach((source) => {
      const isLayerSource = source.hasOwnProperty("layer");
      if (isLayerSource) {
        const layerSource = source as LayerSourceConfigItem;
        const layerId = layerSource.layer?.id;
        const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
        const layerUrl = layerSource?.layer?.url;
        if (layerFromMap) {
          layerSource.layer = layerFromMap as FeatureLayer;
        } else if (layerUrl) {
          layerSource.layer = new FeatureLayer(layerUrl as any);
        }
      } else {
        const locatorSource = source as LocatorSourceConfigItem;
        if (locatorSource?.name === "ArcGIS World Geocoding Service") {
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

  // Replaces default placeholder ('Find address or place') with translated string from Search widget's t9n messages
  const searchWidget_t9n = searchWidget?.["messages"];

  if (searchWidget?.allPlaceholder === DEFAULT_PLACEHOLDER) searchWidget.allPlaceholder = searchWidget_t9n.allPlaceholder;

  searchWidget?.sources?.forEach((source: __esri.SearchSource) => {
    if (source?.placeholder === DEFAULT_PLACEHOLDER) source.placeholder = searchWidget_t9n.placeholder;
  });

  return searchWidget;
}
