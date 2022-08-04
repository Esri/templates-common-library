import AttachmentViewer from "dojo/text!../../configParamsJSON/avConfigParams.json";
import Basic from "dojo/text!../../configParamsJSON/basicConfigParams.json";
import CategoryGallery from "dojo/text!../../configParamsJSON/categoryGalleryConfigParams.json";
import Charts from "dojo/text!../../configParamsJSON/chartsConfigParams.json";
import Countdown from "dojo/text!../../configParamsJSON/countdownConfigParams.json";
import Imagery from "dojo/text!../../configParamsJSON/imageryViewerConfig.json";
import InteractiveLegend from "dojo/text!../../configParamsJSON/intLegendConfigParams.json";
import Media from "dojo/text!../../configParamsJSON/mediaConfigParams.json";
import Minimalist from "dojo/text!../../configParamsJSON/minimalistConfigParams.json";
import Nearby from "dojo/text!../../configParamsJSON/nearbyConfigParams.json";
import Portfolio from "dojo/text!../../configParamsJSON/portfolioConfigParams.json";
import Sidebar from "dojo/text!../../configParamsJSON/sidebarConfigParams.json";
import Slider from "dojo/text!../../configParamsJSON/dataSliderConfigParams.json";
import ThreeDViewer from "dojo/text!../../configParamsJSON/3dViewerConfigParams.json";
import ZoneLookup from "dojo/text!../../configParamsJSON/lookupConfigParams.json";
import Exhibit from "dojo/text!../../configParamsJSON/exhibitConfigParams.json";
import Inset from "dojo/text!../../configParamsJSON/insetConfigParams.json";

import { EAppTemplateType } from "../CompatibilityChecker";

const INSTANT_APPS_CONFIG_PARAMS_MAP = {
  [EAppTemplateType.AttachmentViewer]: AttachmentViewer,
  [EAppTemplateType.Basic]: Basic,
  [EAppTemplateType.CategoryGallery]: CategoryGallery,
  [EAppTemplateType.Charts]: Charts,
  [EAppTemplateType.Countdown]: Countdown,
  [EAppTemplateType.ImageryApp]: Imagery,
  [EAppTemplateType.InteractiveLegend]: InteractiveLegend,
  [EAppTemplateType.Media]: Media,
  [EAppTemplateType.Minimalist]: Minimalist,
  [EAppTemplateType.Nearby]: Nearby,
  [EAppTemplateType.Portfolio]: Portfolio,
  [EAppTemplateType.Sidebar]: Sidebar,
  [EAppTemplateType.Slider]: Slider,
  [EAppTemplateType.ThreeDViewer]: ThreeDViewer,
  [EAppTemplateType.ZoneLookup]: ZoneLookup,
  [EAppTemplateType.Exhibit]: Exhibit,
  [EAppTemplateType.Inset]: Inset
};

export function getConfigParams(template: EAppTemplateType) {
  return JSON.parse(INSTANT_APPS_CONFIG_PARAMS_MAP[template]);
}

export function generateDefaultValuesObj(configParamsObj) {
  // Create initial object to return
  const defaultValues = {};
  const { config } = configParamsObj;

  // Iterate through sections
  config.forEach(section => {
    const { content } = section;

    // Skip section if no content exists, i.e. map/scene sections
    if (!content) return;

    // Otherwise, trigger recursive logic
    handleConfigContent(section, defaultValues);
  });
  return defaultValues;
}

function handleConfigContent(configObj, defaultValues) {
  const { content } = configObj;
  content.forEach(contentItem => {
    const { type, id, defaultValue } = contentItem;

    if (type === "setting" && defaultValue === undefined)
      console.warn(`${id} does not have a default value defined.`);

    if (type === "setting") defaultValues[id] = defaultValue;

    // BASE CASE - continue recursive function call if current object has content
    if (contentItem.hasOwnProperty("content"))
      handleConfigContent(contentItem, defaultValues);
  });
}
