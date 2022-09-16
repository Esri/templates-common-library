import Search = require("esri/widgets/Search");
import FeatureLayer = require("esri/layers/FeatureLayer");

interface SearchSourceConfigItem {
  maxResults: number;
  maxSuggestions: number;
  minSuggestCharacters: number;
  name: string;
  suggestionsEnabled: boolean;
  placeholder: string;
  withinViewEnabled: boolean;
  zoomScale: number;
}

interface LocatorSourceConfigItem extends SearchSourceConfigItem {
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
  sources: Array<LocatorSourceConfigItem | LayerSourceConfigItem>;
}

export function createSearch(
  searchConfiguration: SearchConfiguration,
  view: __esri.MapView,
  portal: __esri.Portal
): Search {
  const sources = searchConfiguration?.sources;
  if (sources) {
    sources.forEach(source => {
      const isLayerSource = source.hasOwnProperty("layer");
      if (isLayerSource) {
        const layerSource = source as LayerSourceConfigItem;
        const layerFromMap = layerSource.layer?.id
          ? view.map.findLayerById(layerSource.layer.id)
          : null;
        if (layerFromMap) {
          layerSource.layer = layerFromMap as FeatureLayer;
        } else if (layerSource?.layer?.url) {
          layerSource.layer = new FeatureLayer(layerSource?.layer?.url as any);
        }
      }
    });
  }
  searchConfiguration?.sources?.forEach(source => {
    const isLocatorSource = source.hasOwnProperty("locator");
    if (isLocatorSource) {
      const locatorSource = source as LocatorSourceConfigItem;
      locatorSource.url = locatorSource.url;
      delete locatorSource.url;
    }
  });

  return new Search({
    view,
    portal,
    ...searchConfiguration
  });
}
