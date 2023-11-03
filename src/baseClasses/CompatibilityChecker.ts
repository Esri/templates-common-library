import Collection from "esri/core/Collection";
import { eachAlways } from "esri/core/promiseUtils";

// Note: "group" is good enough because there are no Requirements to check for any app templates that function with groups
export type ResourceForCheck = __esri.WebMap | __esri.WebScene | "group";

/** Identifies all Instant App Templates by url (We use url because it is the same between locales) */
export enum EAppTemplateType {
  ThreeDViewer = "/apps/instant/3dviewer/index.html",
  Atlas = "/apps/instant/atlas/index.html",
  AttachmentViewer = "/apps/instant/attachmentviewer/index.html",
  Basic = "/apps/instant/basic/index.html",
  CategoryGallery = "/apps/instant/filtergallery/index.html",
  Charts = "/apps/instant/charts/index.html",
  Countdown = "/apps/instant/countdown/index.html",
  Exhibit = "/apps/instant/exhibit/index.html",
  Insets = "/apps/instant/insets/index.html",
  InteractiveLegend = "/apps/instant/interactivelegend/index.html",
  ImageryApp = "/apps/instant/imageryviewer/index.html",
  Manager = "/apps/instant/manager/index.html",
  Media = "/apps/instant/media/index.html",
  Minimalist = "/apps/instant/minimalist/index.html",
  Nearby = "/apps/instant/nearby/index.html",
  Notify = "/apps/instant/notification/index.html",
  Observer = "/apps/instant/observer/index.html",
  Portfolio = "/apps/instant/portfolio/index.html",
  Reporter = "/apps/instant/reporter/index.html",
  Sidebar = "/apps/instant/sidebar/index.html",
  Slider = "/apps/instant/slider/index.html",
  ZoneLookup = "/apps/instant/lookup/index.html",
}

enum EResourceType {
  Webmap,
  Webscene,
  Group,

  Unknown,
}

enum ERequirementType {
  UnsupportedRenderers_FeatureLayer,
  UnsupportedRenderers_Renderer,
  PopupDisabled,
  ImageryCondition,
  AttachmentsCondition,
  ChartsCondition,
}

/** Mapping of all Resource Types to the Templates that they're not compatible with */
const EResourceType_to_AppType_Mapping = {
  [EResourceType.Webmap]: [
    EAppTemplateType.ThreeDViewer,
    EAppTemplateType.CategoryGallery,
    EAppTemplateType.Observer,
  ],
  [EResourceType.Webscene]: [
    EAppTemplateType.AttachmentViewer,
    EAppTemplateType.Atlas,
    EAppTemplateType.CategoryGallery,
    EAppTemplateType.Charts,
    EAppTemplateType.ImageryApp,
    EAppTemplateType.Insets,
    EAppTemplateType.InteractiveLegend,
    EAppTemplateType.Manager,
    EAppTemplateType.Media,
    EAppTemplateType.Minimalist,
    EAppTemplateType.Nearby,
    EAppTemplateType.Notify,
    EAppTemplateType.Reporter,
    EAppTemplateType.Sidebar,
    EAppTemplateType.Slider,
    EAppTemplateType.ZoneLookup,
  ],
  [EResourceType.Group]: [
    EAppTemplateType.AttachmentViewer,
    EAppTemplateType.Basic,
    EAppTemplateType.Charts,
    EAppTemplateType.Countdown,
    EAppTemplateType.Exhibit,
    EAppTemplateType.ImageryApp,
    EAppTemplateType.Insets,
    EAppTemplateType.InteractiveLegend,
    EAppTemplateType.Manager,
    EAppTemplateType.Media,
    EAppTemplateType.Minimalist,
    EAppTemplateType.Nearby,
    EAppTemplateType.Notify,
    EAppTemplateType.Observer,
    EAppTemplateType.Portfolio,
    EAppTemplateType.Reporter,
    EAppTemplateType.Sidebar,
    EAppTemplateType.Slider,
    EAppTemplateType.ThreeDViewer,
    EAppTemplateType.ZoneLookup,
  ],
};

export interface ICompatibilityCheckerProperties {
  requirementsMessages: {
    AttachmentViewer: string;
    ChartViewer: string;
    ImageryViewer: string;
    InteractiveLegend: string;
    Nearby: string;
    ZoneLookup: string;
  };

  resourceMessages: {
    Webmap: string;
    Webscene: string;
    Group: string;
    WebmapOrWebscene: string;
  };
}

/**
 * Contains methods for determining if a resource is compatible with a template app.
 * If resource is not compatible with template app type, will return the string that indicates why
 * it is not compatible.
 *
 * Because of Localization, we must pass in the "not compatible" strings that get returned
 *
 * const compatChecks = new CompatibilityChecks({
 *   resourceStrings:{ ... etc },
 *   requirementStrings:{ ... etc }
 * });
 *
 * // usage example
 * compatChecks.checkSpecificTemplates(webmap, EAppType.AttachmentViewer ---> (or just pass in the urlFragment(ex: "/apps/instant/3dviewer/index.html")))
 */
export class CompatibilityChecker {
  private _Template_to_Function_Map = {
    [EAppTemplateType.AttachmentViewer]: this._testAttachmentsCondition,
    [EAppTemplateType.Charts]: this._testChartsCondition,
    [EAppTemplateType.ImageryApp]: this._testImageryCondition,
    [EAppTemplateType.InteractiveLegend]: this._testUnsupportedRenderers,
    [EAppTemplateType.Nearby]: this._testPopupDisabled,
    [EAppTemplateType.ZoneLookup]: this._testPopupDisabled,
  };

  private _requirementsMessagesMap = {};
  private _resourceMessagesMap = {};

  constructor(props: ICompatibilityCheckerProperties) {
    const { requirementsMessages, resourceMessages } = props;

    this._requirementsMessagesMap = {
      [ERequirementType.AttachmentsCondition]:
        requirementsMessages.AttachmentViewer,
      [ERequirementType.ChartsCondition]: requirementsMessages.ChartViewer,
      [ERequirementType.ImageryCondition]: requirementsMessages.ImageryViewer,
      [ERequirementType.UnsupportedRenderers_FeatureLayer]:
        requirementsMessages.InteractiveLegend,
      [ERequirementType.UnsupportedRenderers_Renderer]:
        requirementsMessages.InteractiveLegend,
      [ERequirementType.PopupDisabled]: requirementsMessages.Nearby,
    };

    this._resourceMessagesMap = {
      [EAppTemplateType.AttachmentViewer]: resourceMessages.Webmap,
      [EAppTemplateType.Atlas]: resourceMessages.Group,
      [EAppTemplateType.Basic]: resourceMessages.WebmapOrWebscene,
      [EAppTemplateType.CategoryGallery]: resourceMessages.Group,
      [EAppTemplateType.Charts]: resourceMessages.Webmap,
      [EAppTemplateType.Countdown]: resourceMessages.WebmapOrWebscene,
      [EAppTemplateType.Exhibit]: resourceMessages.WebmapOrWebscene,
      [EAppTemplateType.ImageryApp]: resourceMessages.Webmap,
      [EAppTemplateType.Insets]: resourceMessages.Webmap,
      [EAppTemplateType.InteractiveLegend]: resourceMessages.Webmap,
      [EAppTemplateType.Manager]: resourceMessages.Webmap,
      [EAppTemplateType.Media]: resourceMessages.Webmap,
      [EAppTemplateType.Minimalist]: resourceMessages.Webmap,
      [EAppTemplateType.Nearby]: resourceMessages.Webmap,
      [EAppTemplateType.Notify]: resourceMessages.Webmap,
      [EAppTemplateType.Observer]: resourceMessages.Webscene,
      [EAppTemplateType.Portfolio]: resourceMessages.WebmapOrWebscene,
      [EAppTemplateType.Reporter]: resourceMessages.Webmap,
      [EAppTemplateType.Sidebar]: resourceMessages.Webmap,
      [EAppTemplateType.Slider]: resourceMessages.Webmap,
      [EAppTemplateType.ThreeDViewer]: resourceMessages.Webscene,
      [EAppTemplateType.ZoneLookup]: resourceMessages.Webmap,
    };
  }

  ///////////////////////////
  //// Public Methods
  ///////////////////////////

  /** Check one Resource for all possible not-compatible app templates */
  async checkAllTemplates(
    resource: ResourceForCheck
  ): Promise<Map<EAppTemplateType, string>> {
    const resourceType: EResourceType = await this._identifyResource(resource);

    const appTemplateTypeKeys = Object.keys(EAppTemplateType);
    const checkPromises = appTemplateTypeKeys.map((key: string) => {
      return this.checkSpecificTemplate(
        resource,
        EAppTemplateType[key],
        resourceType
      );
    });
    const checkResults = await Promise.all(checkPromises);

    const resultMap = new Map();
    appTemplateTypeKeys.forEach((key, index) => {
      resultMap.set(EAppTemplateType[key], checkResults[index]);
    });
    return resultMap;
  }

  /**
   * Check one Resource for any compatibility issues with a specific app template
   */
  async checkSpecificTemplate(
    resource: ResourceForCheck,
    template: EAppTemplateType,
    resourceType?: EResourceType
  ): Promise<string | null> {
    const foundResourceType: EResourceType =
      resourceType != null
        ? resourceType
        : await this._identifyResource(resource);
    // check for resource not-compats
    if (this._isTemplateCompatWithResource(foundResourceType, template)) {
      if (resource === "group") {
        // skip groups --- there are no requirements checks yet
        return null;
      }
      // check requirement for template
      await resource?.loadAll();
      const requirementFunc = this._Template_to_Function_Map[template];
      if (requirementFunc == null) {
        return null;
      }
      let requirement = requirementFunc(resource);
      if (requirement?.then != null) {
        requirement = await requirement;
      }
      const msg = this._requirementsMessagesMap[requirement];
      return requirement != null ? msg : null;
    } else {
      // template is not compatible with resource
      return this._resourceMessagesMap[template];
    }
  }

  ///////////////////////////
  //// Private Methods
  ///////////////////////////

  private async _identifyResource(
    resource: ResourceForCheck
  ): Promise<EResourceType> {
    if (resource === "group") {
      return EResourceType.Group;
    } else {
      await resource?.loadAll();
      if (resource.portalItem.type === "Web Map") {
        return EResourceType.Webmap;
      } else if (resource.portalItem.type === "Web Scene") {
        return EResourceType.Webscene;
      }
    }
  }

  /** Finds the EAppTemplateType[] that are not compatible with the resource */
  private _isTemplateCompatWithResource(
    resourceType: EResourceType,
    template: EAppTemplateType
  ): boolean {
    return !EResourceType_to_AppType_Mapping[resourceType].includes(template);
  }

  private async _testUnsupportedRenderers(
    webmap: __esri.WebMap
  ): Promise<ERequirementType | null> {
    let atLeastOneSupportedRenderer: boolean = false;
    let atLeastOneFeatureLayer: boolean = false;
    webmap?.allLayers?.map((layer) => {
      const type = layer?.type;

      if (type === "group") {
        return;
      }

      if (type !== "feature") {
        return;
      }
      atLeastOneFeatureLayer = atLeastOneFeatureLayer || true;

      const featureLayer = layer as __esri.FeatureLayer;
      let isLayerRendererSupported: boolean = true;

      // PROPS SET BY ARCADE
      const field2 = featureLayer?.renderer?.get("field2");
      const field3 = featureLayer?.renderer?.get("field3");
      const fieldDelimiter = featureLayer?.renderer?.get("fieldDelimiter");
      if ((field2 || field3) && fieldDelimiter) {
        isLayerRendererSupported = false;
      }

      if (
        featureLayer?.renderer?.type === "unique-value" ||
        featureLayer?.renderer?.type === "class-breaks"
      ) {
        // CHECK VISUAL VARIABLES for color ramp, size ramp, opacity ramp
        const renderer = featureLayer.renderer as any;
        renderer?.visualVariables?.forEach((visualVariable) => {
          if (
            visualVariable.type === "size" ||
            visualVariable.type === "color" ||
            visualVariable.type === "opacity"
          ) {
            const rendererAuthoringInfoType = renderer?.authoringInfo?.type;
            if (
              rendererAuthoringInfoType === "class-breaks-color" ||
              rendererAuthoringInfoType === "class-breaks-size" ||
              featureLayer?.renderer?.type === "unique-value"
            ) {
              return;
            }
            isLayerRendererSupported = false;
          }
        });
      }

      if (
        featureLayer?.renderer?.type === "heatmap" ||
        featureLayer?.renderer?.type === "dot-density"
      ) {
        isLayerRendererSupported = false;
      }

      // SINGLE SYMBOL(UNIQUE SYMBOL) - CLUSTERING ENABLED.
      // Drawing style is similar to Counts and Amounts (Size/Color) Classify Data Unchecked which is unsupported.
      const simpleRenderer = (
        featureLayer?.renderer?.type === "simple" ? featureLayer.renderer : null
      ) as __esri.SimpleRenderer;
      const vvSizeArr = simpleRenderer?.visualVariables?.filter(
        (visualVariable) => visualVariable.type === "size"
      );
      if (
        (simpleRenderer && featureLayer?.featureReduction) ||
        (vvSizeArr?.length > 0 && featureLayer?.featureReduction)
      ) {
        isLayerRendererSupported = false;
      }

      // *** accumulate supportedRenderer info ***
      // (if isLayerRendererSupported is true, we know this layer is supported, and with the || it will turn atLeastOneSupportedRenderer to true)
      atLeastOneSupportedRenderer =
        atLeastOneSupportedRenderer || isLayerRendererSupported;
    });

    if (!atLeastOneFeatureLayer) {
      return ERequirementType.UnsupportedRenderers_FeatureLayer;
    } else if (!atLeastOneSupportedRenderer) {
      return ERequirementType.UnsupportedRenderers_Renderer;
    } else {
      return null;
    }
  }

  /**
   * If there does not exist at least one layer in the webmap which has type "imagery" or "imagery-tile",
   *    return ERequirementType.ImageryCondition, else return null (Compatible)
   */
  private _testImageryCondition(
    webmap: __esri.WebMap
  ): ERequirementType | null {
    let atLeastOneImageryLayer: boolean = webmap?.allLayers
      ?.map((layer) => {
        return layer.type === "imagery" || layer.type === "imagery-tile";
      })
      .reduce((acc: boolean, curr: boolean) => {
        return acc || curr;
      }, false);

    return !atLeastOneImageryLayer ? ERequirementType.ImageryCondition : null;
  }

  /**
   * If there does not exist at least one layer in the webmap with attachments,
   *    return ERequirementType.AttachmentsCondition, else return null (Compatible)
   */
  private _testAttachmentsCondition(
    webmap: __esri.WebMap
  ): Promise<ERequirementType | null> {
    return new Promise((res, rej) => {
      let isPassing = false;
      const layerPromises = eachAlways(
        webmap?.allLayers?.map((layer) => {
          return layer.load().then(() => {
            if (layer.type === "feature") {
              const featureLayer = layer as __esri.FeatureLayer;
              if (
                featureLayer.capabilities?.operations
                  ?.supportsQueryAttachments ||
                featureLayer.capabilities?.data?.supportsAttachment
              ) {
                isPassing = isPassing || true;
              }
            }
          });
        })
      );

      layerPromises.then(() => {
        if (!isPassing) {
          res(ERequirementType.AttachmentsCondition);
        } else {
          res(null);
        }
      });
    });
  }

  private _testChartsCondition(webmap: __esri.WebMap): ERequirementType | null {
    const chartsAvailable =
      webmap?.allLayers
        .filter((layer) => layer.type === "feature")
        .some((flayer: __esri.FeatureLayer) => {
          const flayerWithCharts = flayer.get("charts");
          return flayerWithCharts;
        }) ||
      webmap?.allTables
        .filter((table) => table.type === "feature")
        .some((featureTable: any) => {
          const fTableWithCharts = featureTable?.charts;
          return fTableWithCharts;
        });

    return !chartsAvailable ? ERequirementType.ChartsCondition : null;
  }

  /**
   * If all layers in the webmap have popups disabled,
   *    return EWebmapNotCompatible.PopupDisabled, else return null (Compatible)
   */
  private _testPopupDisabled(webmap: __esri.WebMap): ERequirementType | null {
    const excludeTypes = new Collection([
      "tile",
      "base-tile",
      "imagery-tile",
      "vector-tile",
      "web-tile",
    ]);

    let atLeastOnePopupEnabled: boolean = webmap?.allLayers
      ?.filter((layer) => {
        return !excludeTypes.includes(layer.type);
      })
      .map((layer) => {
        return layer.get("popupEnabled") as boolean;
      })
      .reduce((acc: boolean, curr: boolean) => {
        return acc || curr;
      }, false);

    return !atLeastOnePopupEnabled ? ERequirementType.PopupDisabled : null;
  }
}
