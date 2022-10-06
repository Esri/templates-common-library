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

  view.highlightOptions = {
    ...highlightOptions,
    color: new Color(color),
    haloColor: new Color(haloColor)
  };
}
