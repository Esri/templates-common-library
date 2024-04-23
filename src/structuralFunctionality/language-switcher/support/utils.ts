import { prefersRTL, setLocale } from "esri/intl";
import { HandleGroupedContentArgs, LanguageData } from "./interfaces";
import {
  setPageDirection,
  setPageLocale,
} from "../../../baseClasses/support/domHelper";
import { ApplicationConfig } from "../../../interfaces/applicationBase";
import {
  GROUPED_CONTENT,
  NO_DEFAULT_FIELDS,
  PREVENT_OVERWRITE,
} from "./constants";
import ApplicationBase from "../../../baseClasses/ApplicationBase";

// Determines default locale based on portal or locale url param
export function getDefaultLocale(portal: __esri.Portal, data: LanguageData) {
  const defaultLanguage = calculateDefaultLocaleFromPortal(portal);
  const urlObj = new URL(window.location.href);
  const localeUrlParam = urlObj.searchParams.get("locale");
  const useDefault =
    (data?.locale === defaultLanguage || data === null || data === undefined) &&
    !localeUrlParam;
  return useDefault ? defaultLanguage : null;
}

function calculateDefaultLocaleFromPortal(portal: __esri.Portal) {
  const user = portal?.user;
  let locale = portal?.culture || navigator.language;
  if (user) {
    locale =
      user?.culture !== undefined
        ? user.culture || navigator.language
        : portal.culture || navigator.language;
  }
  return locale;
}

// Updates locale on page
export function updateLocale(locale: string) {
  setLocale(locale);
  setPageLocale(locale);
  setPageDirection(prefersRTL(locale) ? "rtl" : "ltr");
}

export function getIDs(key: string): string[] {
  const subtrings = key.split("-");
  const subtrings2 = subtrings[0].split(".");
  const IDs = [...subtrings2, subtrings[1]].filter(Boolean);
  return IDs;
}

export function handleGroupedContent({ ...args }: HandleGroupedContentArgs) {
  const {
    key,
    IDs,
    t9nData,
    config,
    groupedConfigSettings,
    withinConfigurationExperience,
  } = args;

  // grouped array item - searchConfiguration.sources-s8fg673, filterConfig.layerExpressions.expressions-a3bw528
  const isGroupedArray = IDs.length > 2;

  // group content - coverPage.titleText, searchConfiguration.allPlaceholder
  const isFlatGroup = IDs.length === 2;

  const uid = isGroupedArray ? IDs.pop() : null;

  const t9nValue = t9nData[key];

  const [fieldName] = IDs;
  const currentValue = withinConfigurationExperience
    ? config?.draft?.[fieldName] ?? config?.[fieldName]
    : config?.[fieldName];

  if (currentValue == null) return;

  if (isGroupedArray) {
    const [fieldName, value] = handleGroupedArrayContent(
      IDs,
      currentValue,
      uid as string,
      t9nValue
    );
    groupedConfigSettings[fieldName] = value;
  } else if (isFlatGroup) {
    const [fieldName, value] = handleFlatGroupedContent(
      IDs,
      currentValue,
      t9nValue,
      groupedConfigSettings
    );
    groupedConfigSettings[fieldName] = value;
  }
}

function handleGroupedArrayContent(
  IDs: string[],
  currentValue: any,
  uid: string,
  t9nValue: string
) {
  const [fieldName] = IDs;

  IDs.shift();

  // filterConfig.layerExpressions.expressions-a3bw528
  if (IDs.length > 2) {
    const [subsettingID, childSubsettingID, itemPropName] = IDs;
    const subsetting = currentValue[subsettingID];
    subsetting.forEach((subsettingItem) => {
      const childSubsetting = subsettingItem[childSubsettingID];
      childSubsetting.forEach((childSubsettingItem) => {
        if (childSubsettingItem["_uid"] === uid) {
          childSubsettingItem[itemPropName] = t9nValue;
        }
      });
    });
    return [fieldName, currentValue];
  } else if (Array.isArray(currentValue)) {
    currentValue.forEach((item) => {
      if (item["_uid"] === uid) {
        const [itemPropName] = IDs;
        item[itemPropName] = t9nValue;
      }
    });
  }
  // searchConfiguration.sources-s8fg673
  else {
    const [subsettingID, itemPropName] = IDs;
    const subsetting = currentValue[subsettingID];
    subsetting.forEach((childSubsetting) => {
      if (childSubsetting["_uid"] === uid) {
        childSubsetting[itemPropName] = t9nValue;
      }
    });
    return [fieldName, currentValue];
  }
}

function handleFlatGroupedContent(
  IDs: string[],
  currentValue: any,
  t9nValue: string,
  groupedConfigSettings: { [key: string]: any }
) {
  const [fieldName, subsettingID] = IDs;
  currentValue[subsettingID] = t9nValue;

  const doesNotHaveGroupedConfigSetting = !groupedConfigSettings[fieldName];
  if (doesNotHaveGroupedConfigSetting)
    groupedConfigSettings[fieldName] = currentValue;
  const value = {
    ...groupedConfigSettings[fieldName],
    [subsettingID]: t9nValue,
  };

  return [fieldName, value];
}

export function parseGroupedConfigSettings(
  languageData: LanguageData,
  applicationConfig: ApplicationConfig,
  withinConfigurationExperience: boolean
) {
  const { data } = languageData;
  const t9nData = data;

  const groupedConfigSettings = {};
  const settingKeys = data ? Object.keys(t9nData) : [];

  const setLanguageSwitcherUICallback = () => {
    return (key: string) => {
      const IDs = getIDs(key);
      const isGroup = IDs.length > 1;

      const args = {
        key,
        t9nData,
        withinConfigurationExperience,
        config: applicationConfig,
      };
      if (isGroup)
        handleGroupedContent({ ...args, IDs, groupedConfigSettings });
    };
  };

  settingKeys.forEach(setLanguageSwitcherUICallback());

  return groupedConfigSettings;
}

export function parseConfigSettings(
  languageData: LanguageData,
  applicationConfig: ApplicationConfig,
  withinConfigurationExperience: boolean
) {
  const t9nData = languageData?.data;
  const configSettings = {};
  const settingKeys = t9nData ? Object.keys(t9nData) : [];
  settingKeys.forEach((key) => {
    const defaultLocaleValue = withinConfigurationExperience
      ? applicationConfig?.draft?.[key]
      : applicationConfig?.[key];
    const t9nValue = t9nData[key] ?? defaultLocaleValue;
    configSettings[key] = t9nValue;
  });
  return configSettings;
}

export function processNoDefaultValues(
  config: ApplicationConfig,
  base: ApplicationBase
): void {
  NO_DEFAULT_FIELDS.forEach((field) => {
    const value = config[field];
    if (value) return;
    const processedValue = getProcessedValue(field, config[field], base);
    config[field] = processedValue;
  });
}

export function getProcessedValue(
  fieldName: string,
  value: string,
  base: ApplicationBase
): string {
  switch (fieldName) {
    case "title":
      const appItemTitle = base?.results?.applicationItem?.value?.title;
      const { config, results } = base;
      const { webMapItems } = results;
      const validWebMapItems = webMapItems?.map((response) => response.value);
      const item = validWebMapItems?.[0];
      const title = config?.title
        ? config.title
        : appItemTitle
        ? appItemTitle
        : item?.title
        ? item.title
        : "";
      return title;
    default:
      return value ?? "";
  }
}

// Prevents the current values from being overwritten with a stale value
export function preventOverwrite(config): void {
  for (const key in config) {
    const keyLowerCase = key.toLowerCase();
    const isColor = keyLowerCase.includes("color");
    const isPosition = keyLowerCase.includes("position");
    const preventOverwrite = PREVENT_OVERWRITE.indexOf(key) !== -1;
    if (
      (typeof config[key] !== "string" ||
        isColor ||
        isPosition ||
        preventOverwrite) &&
      !GROUPED_CONTENT.includes(key)
    ) {
      delete config[key];
    }
  }
}
