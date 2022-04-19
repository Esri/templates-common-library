export function checkCustomTheme(applyCustomTheme: boolean, customTheme: { applyPresetTheme: boolean }): boolean {
  return (applyCustomTheme && customTheme?.applyPresetTheme === undefined) || customTheme?.applyPresetTheme;
}
