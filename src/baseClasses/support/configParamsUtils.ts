import Atlas from "../../configParamsJSON/atlasConfigParams";
import AttachmentViewer from "../../configParamsJSON/avConfigParams";
import Basic from "../../configParamsJSON/basicConfigParams";
import CategoryGallery from "../../configParamsJSON/categoryGalleryConfigParams";
import Charts from "../../configParamsJSON/chartsConfigParams";
import Compare from "../../configParamsJSON/compareConfigParams";
import Countdown from "../../configParamsJSON/countdownConfigParams";
import Exhibit from "../../configParamsJSON/exhibitConfigParams";
import General from "../../configParamsJSON/generalConfigParams";
import Imagery from "../../configParamsJSON/imageryViewerConfig";
import Insets from "../../configParamsJSON/insetConfigParams";
import InteractiveLegend from "../../configParamsJSON/intLegendConfigParams";
import Manager from "../../configParamsJSON/managerConfigParams";
import Media from "../../configParamsJSON/mediaConfigParams";
import Minimalist from "../../configParamsJSON/minimalistConfigParams";
import Nearby from "../../configParamsJSON/nearbyConfigParams";
import Notify from "../../configParamsJSON/notifyConfigParams";
import Observer from "../../configParamsJSON/observerConfigParams";
import Portfolio from "../../configParamsJSON/portfolioConfigParams";
import Reporter from "../../configParamsJSON/reporterConfigParams";
import Sidebar from "../../configParamsJSON/sidebarConfigParams";
import Slider from "../../configParamsJSON/dataSliderConfigParams";
import Streamflow from "../../configParamsJSON/streamflowConfigParams";
import ThreeDViewer from "../../configParamsJSON/3dViewerConfigParams";
import ZoneLookup from "../../configParamsJSON/lookupConfigParams";

import { EAppTemplateType } from "../CompatibilityChecker";

const INSTANT_APPS_CONFIG_PARAMS_MAP = {
  [EAppTemplateType.Atlas]: Atlas,
  [EAppTemplateType.AttachmentViewer]: AttachmentViewer,
  [EAppTemplateType.Basic]: Basic,
  [EAppTemplateType.CategoryGallery]: CategoryGallery,
  [EAppTemplateType.Charts]: Charts,
  [EAppTemplateType.Compare]: Compare,
  [EAppTemplateType.Countdown]: Countdown,
  [EAppTemplateType.Exhibit]: Exhibit,
  [EAppTemplateType.General]: General,
  [EAppTemplateType.ImageryApp]: Imagery,
  [EAppTemplateType.InteractiveLegend]: InteractiveLegend,
  [EAppTemplateType.Insets]: Insets,
  [EAppTemplateType.Manager]: Manager,
  [EAppTemplateType.Media]: Media,
  [EAppTemplateType.Minimalist]: Minimalist,
  [EAppTemplateType.Nearby]: Nearby,
  [EAppTemplateType.Notify]: Notify,
  [EAppTemplateType.Observer]: Observer,
  [EAppTemplateType.Portfolio]: Portfolio,
  [EAppTemplateType.Reporter]: Reporter,
  [EAppTemplateType.Sidebar]: Sidebar,
  [EAppTemplateType.Slider]: Slider,
  [EAppTemplateType.Streamflow]: Streamflow,
  [EAppTemplateType.ThreeDViewer]: ThreeDViewer,
  [EAppTemplateType.ZoneLookup]: ZoneLookup,
};

export function getConfigParams(template: EAppTemplateType) {
  return structuredClone(INSTANT_APPS_CONFIG_PARAMS_MAP[template]);
}

export function generateDefaultValuesObj(configParamsObj) {
  // Create initial object to return
  const defaultValues = {};
  const { config } = configParamsObj;

  // Iterate through sections
  config.forEach((section) => {
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
  content.forEach((contentItem) => {
    const { type, id, defaultValue } = contentItem;

    if (type === "setting" && defaultValue === undefined)
      console.warn(`${id} does not have a default value defined.`);

    if (type === "setting") defaultValues[id] = defaultValue;

    // BASE CASE - continue recursive function call if current object has content
    if (contentItem.hasOwnProperty("content"))
      handleConfigContent(contentItem, defaultValues);
  });
}
