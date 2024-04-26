import { AppProxyDefinition } from "../interfaces/applicationBase";
import { upgradeToHttps } from "./urlUtils";

export function joinAppProxies(
  map: __esri.WebMap | __esri.WebScene,
  config: __esri.config,
  appProxies?: AppProxyDefinition[]
): Promise<__esri.WebMap | __esri.WebScene> {
  if (appProxies) {
    appProxies.forEach((proxy) => {
      (
        map.allLayers as unknown as {
          url: string;
          portalItem?: __esri.PortalItem;
        }[]
      ).forEach((layer) => {
        if (layer && layer.url === proxy.sourceUrl) {
          // directly change the layer url to the proxy url
          layer.url = upgradeToHttps(proxy.proxyUrl);

          // Replace the layer's portalItem's url with the proxy url too, otherwise anonymous viewers get a sign-in prompt.
          if (layer.portalItem) {
            layer.portalItem.when(() => {
              // layer.portalItem exists, see above. Not sure why typescript thinks it could be undefined here.
              layer.portalItem!.url = upgradeToHttps(proxy.proxyUrl);
            });
          }

          // also add a request interceptor in case we missed any requests to the original url, or the jsapi team adds new requests in the future.
          config.request?.interceptors?.push({
            // this interceptor only applies to requests made to this proxy's sourceUrl (the layer's original url).
            urls: proxy.sourceUrl,
            before: (params: { url?: string }) => {
              // change requests from the original url to the proxy url
              if (params.url && params.url === proxy.sourceUrl) {
                params.url = upgradeToHttps(proxy.proxyUrl);
              }
            },
          });
        }
      });
    });
  }
  return map as unknown as Promise<__esri.WebMap | __esri.WebScene>;
}
