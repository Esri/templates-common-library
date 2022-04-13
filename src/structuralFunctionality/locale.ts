import { getLocale, setLocale, prefersRTL } from "esri/intl";
import { setPageDirection, setPageLocale } from "../baseClasses/support/domHelper";
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
    const cookie = _getCookie("arcgisLocale") || _getCookie("esri_locale");
    // Use cookie if one exists 
    if (cookie) { return cookie; } else {
        // if org use org culture
        const isOrg = portal?.isOrganization;
        if (isOrg) {
            if (portal?.culture)
                return portal.culture;
        } else {
            // not org use user locale if defined 
            if (portal?.user?.culture) {
                return portal.user.culture;
            }
        }
        // Fallback get the base locale 
        return getLocale();
    }

}
function _getCookie(name: string): string {
    const cookie = document.cookie;
    const cookieNameRE = new RegExp(`(?:^|; )${_escapeRegExp(name)}=([^;]*)`);
    const matchedCookies = cookie.match(cookieNameRE);
    return matchedCookies ? decodeURIComponent(matchedCookies[1]) : undefined;
}
function _escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

