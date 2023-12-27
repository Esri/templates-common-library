export interface LanguageData {
  locale: string;
  data: { [key: string]: string };
}

export interface HandleContentBaseArgs {
  key: string;
  config: any;
  t9nData: { [key: string]: any };
}

export interface HandleGroupedContentArgs extends HandleContentBaseArgs {
  IDs: string[];
  groupedConfigSettings: { [key: string]: any };
}

export interface HandleContentArgs extends HandleContentBaseArgs {
  configurationSettings: any;
}
