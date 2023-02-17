import {
  ICustomTheme,
  IPortalPropsSharedTheme
} from "../interfaces/commonInterfaces";

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

export function updateViewsCalciteMode(theme: "light" | "dark"): void {
  const prevCalciteTheme = theme === "light" ? "calcite-mode-dark" : "calcite-mode-light";
  const calciteTheme = theme === "light" ? "calcite-mode-light" : "calcite-mode-dark";
  const uiContainers = document.querySelectorAll(`.esri-ui.${prevCalciteTheme}`);
  for (let i = 0; i < uiContainers.length; i++) {
    uiContainers[i].className = uiContainers[i].className.replace(prevCalciteTheme, calciteTheme);
  }
}
