import { registerMessageBundleLoader, onLocaleChange, createJSONLoader, fetchMessageBundle } from "@arcgis/core/intl";
export async function handleT9N(pattern: string | RegExp, base: string, bundleLocation: string) {

    registerMessageBundleLoader(
        createJSONLoader({
            pattern,
            base,
            location: new URL("./", window.location.href)
        })
    )
    return await fetchMessageBundle(bundleLocation);
}
export const autoUpdatedStrings: Set<{ obj: any; property: string; bundleName: string; key: string }> = new Set();
onLocaleChange(() => {
    const bundleNames = Array.from(autoUpdatedStrings, (item) => item.bundleName);
    const bundleMap: { [bundleName: string]: any } = {};

    Promise.all(
        bundleNames.map((bundleName) =>
            fetchMessageBundle(bundleName).then((messages) => {
                bundleMap[bundleName] = messages;
            })
        )
    ).then(() => {
        autoUpdatedStrings.forEach(val => {
            const { obj, property, bundleName, key } = val;
            obj[property] = getPathValue(`${bundleName}.${key}`, bundleMap);
        });
    });
});
export function autoUpdateString(obj: any, property: string, bundleName: string, key: string): { remove(): void } {
    const autoUpdatedString = { obj, property, bundleName, key };
    fetchMessageBundle(bundleName).then((messages) => {
        if (autoUpdatedStrings.has(autoUpdatedString)) {
            obj[property] = messages[key];
        }
    });
    return {
        remove(): void {
            autoUpdatedStrings.delete(autoUpdatedString);
        }
    };
}
function getPathValue(str: string, obj: any) {
    return str.split('.').reduce((o, i) => o[i], obj);
}