# Proxy

## Functions

### joinAppProxies

Set up request interceptors for proxied content stored in an application item.

```
Params:
    map: __esri.WebMap | __esri.WebScene;
    config: __esri.config;
    appProxies?: AppProxyDefinition[];

Returns:
    Promise<__esri.WebMap | __esri.WebScene>;
```

#### Usage

```
import esriConfig from "@arcgis/core/config";

const config = applicationConfig as ApplicationConfig;
const settings = applicationBaseConfig as ApplicationBaseSettings;

const base = new ApplicationBase({
    config,
    settings
});

base.load(EAppTemplateType.InteractiveLegend).then(applicationBase => {
    const { results } = applicationBase;
    const { webMapItems, applicationItem } = results;
    const validWebMapItems = webMapItems.map((response) => response.value);
    const map = validWebMapItems[0];

    const portalItem = applicationItem?.value;
    const appProxies = portalItem?.applicationProxies ? portalItem.applicationProxies : null;

    map.loadAll().then(loadedMap => {
        joinAppProxies(map, config, appProxies);
    });
});
```
