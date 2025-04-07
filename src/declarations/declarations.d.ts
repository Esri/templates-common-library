declare module "@arcgis/core/layers/effects/jsonUtils" {
  const effectsUtils: {
    toJSON(effect: any);
    fromJSON(json: any);
  };
  export = effectsUtils;
}

declare module "*.json" {
  const value: any;
  export default value;
}
