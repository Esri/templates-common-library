import Color from "@arcgis/core/Color";

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

  const isColorHex = /^#[0-9A-F]{6}$/i;
  const highlightHexColor = isColorHex.test(highlightColor);
  const highlightHaloHexColor = isColorHex.test(highlightHaloColor);

  const colorValue =
    enableHighlightColor && highlightColor
      ? highlightColor
      : "rgba(0, 255, 255, 0.25)";

  const haloColorValue =
    enableHighlightHaloColor && highlightHaloColor
      ? highlightHaloColor
      : "rgba(0,255,255,1)";

  const color = new Color(colorValue);
  const haloColor = haloColorValue ? new Color(haloColorValue) : null;

  view.highlightOptions = {
    ...highlightOptions,
    color, // jsapi default value is `#00ffff`
    haloColor, // jsapi default value is `null`, which sets halo to default Cyan color (#00ffff)
    haloOpacity: !highlightHaloHexColor && haloColor?.a ? haloColor.a : 1, // jsapi default value is 1
    fillOpacity: !highlightHexColor && color?.a ? color.a : 0.25, // jsapi default value is 0.25
  };
}
