declare module "esri/layers/effects/jsonUtils" {
    const effectsUtils: {
      toJSON(effect: any);
      fromJSON(json: any);
    }
    export = effectsUtils;
}