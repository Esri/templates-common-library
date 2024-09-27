export interface LanguageData {
  data: { [key: string]: string };
  locale: string;
}

export interface HandleContentBaseArgs {
  key: string;
  config: any;
  t9nData: { [key: string]: any };
}

export interface HandleGroupedContentArgs extends HandleContentBaseArgs {
  IDs: string[];
  groupedConfigSettings: { [key: string]: any };
  withinConfigurationExperience: boolean;
}

export interface HandleContentArgs extends HandleContentBaseArgs {
  withinConfigurationExperience: boolean;
}

export interface UpdateValueFromTranslationArgs {
  fieldName: string;
  stringValue: string;
  parentValue: any;
}
export interface ProcessTranslationValueArgs {
  parentValue: any;
  params: string[];
  stringValue: string;
  updateBatch: boolean;
}

export interface ProcessTranslationNestedValueArgs {
  parentValue: any;
  param: string;
  params: string[];
  stringValue: string;
  updateBatch: boolean;
}
