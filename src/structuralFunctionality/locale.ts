import { setLocale, prefersRTL, normalizeMessageBundleLocale } from "esri/intl";
import {
  setPageDirection,
  setPageLocale,
} from "../baseClasses/support/domHelper";
import { esriWidgetProps } from "../interfaces/commonInterfaces";
export function defineLocale(props: esriWidgetProps) {
  const { config, portal } = props;
  let { locale } = config;

  if (!locale) {
    locale = _calculateLocale(portal);
  }
  setLocale(locale);
  setPageLocale(locale);
  setPageDirection(prefersRTL(locale) ? "rtl" : "ltr");
  return locale;
}
function _calculateLocale(portal) {
  const user = portal?.user;
  let locale = portal?.culture || navigator.language;
  if (user) {
    locale =
      user?.culture !== undefined
        ? user.culture || navigator.language
        : portal.culture || navigator.language;
  }
  return locale ? normalizeMessageBundleLocale(locale) : "en";
}
