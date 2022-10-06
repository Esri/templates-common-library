import Color from "esri/Color";

import { HighlightConfig } from "../interfaces/commonInterfaces";

export function handleHighlightColors(
  highlightConfig: HighlightConfig,
  view: __esri.MapView | __esri.SceneView
): void {
  if (!view) return;

  const { highlightOptions } = view;
  const {
    enableHighlightColor,
    highlightColor,
    enableHighlightHaloColor,
    highlightHaloColor
  } = highlightConfig;

  const color =
    enableHighlightColor && highlightColor
      ? highlightColor
      : highlightOptions.color;

  const haloColor =
    enableHighlightHaloColor && highlightHaloColor
      ? highlightHaloColor
      : highlightOptions.haloColor;

  // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#highlightOptions
  view.highlightOptions = {
    ...highlightOptions,
    color: new Color(color), // jsapi default value is `#00ffff`
    haloColor: haloColor ? new Color(haloColor) : null // jsapi default value is `null`, which sets halo to default Cyan color (#00ffff)
  };
}
