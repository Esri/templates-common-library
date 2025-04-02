import Accessor from "@arcgis/core/core/Accessor";
import { property } from "@arcgis/core/core/accessorSupport/decorators";
import { isWithinConfigurationExperience } from "../functionality/configurationSettings";

/**
 * Base Class for all instant app's ConfigurationSettings classes. Handles
 * communication with the Config Panel for live updates during the configuration experience.
 */
export default class ConfigurationSettingsBase extends Accessor {
  /** Determines if the App is being run within the Config Panel's IFrame */
  @property()
  withinConfigurationExperience: boolean = isWithinConfigurationExperience();

  /** The number of times the configuration has been updated during browser session */
  @property()
  updateCount: number = 0;

  private _draft: any = null;
  private _draftMode: boolean = false;

  constructor(params?: any) {
    super(params);
    this._draft = params?.draft;
    this._draftMode = params?.mode === "draft";
  }

  initialize() {
    if (this.withinConfigurationExperience || this._draftMode) {
      // Apply any draft properties
      if (this._draft) {
        Object.assign(this, this._draft);
      }

      window.addEventListener(
        "message",
        (e: any) => {
          this._handleConfigurationUpdates(e);
        },
        false
      );
    }
  }

  _handleConfigurationUpdates(e: any) {
    if (e?.data?.type === "cats-app") {
      Object.assign(this, e.data);
      this.updateCount++;
    }
  }
}
