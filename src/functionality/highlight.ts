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
    highlightHaloColor,
  } = highlightConfig;

  const colorValue =
    enableHighlightColor && highlightColor
      ? highlightColor
      : highlightOptions.color;

  const haloColorValue =
    enableHighlightHaloColor && highlightHaloColor
      ? highlightHaloColor
      : highlightOptions.haloColor;

  const color = new Color(colorValue);
  const haloColor = haloColorValue ? new Color(haloColorValue) : null;
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#highlightOptions
  view.highlightOptions = {
    ...highlightOptions,
    color, // jsapi default value is `#00ffff`
    haloColor, // jsapi default value is `null`, which sets halo to default Cyan color (#00ffff)
    haloOpacity: haloColor?.a ? haloColor.a : 1, // jsapi default value is 1
    fillOpacity: color?.a ? color.a : 0.25, // jsapi default value is 0.25
  };
}
