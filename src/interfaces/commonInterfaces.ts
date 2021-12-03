export interface esriWidgetProps extends __esri.WidgetProperties {
    config: any;
    view?: __esri.MapView;
    portal?: __esri.Portal;
    propertyName?: string;
}

export interface FeatureLayerFeatureEffect extends __esri.FeatureLayer {
    featureEffect: __esri.FeatureEffect;
}