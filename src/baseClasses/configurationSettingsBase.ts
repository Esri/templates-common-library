import Accessor from 'esri/core/Accessor';
import { property } from 'esri/core/accessorSupport/decorators'

/**
 * Base Class for all instant app's ConfigurationSettings classes. Handles
 * communication with the Config Panel for live updates during the configuration experience.
 */
export default class ConfigurationSettingsBase extends Accessor {
  /** Determines if the App is being run within the Config Panel's IFrame */
  @property()
  withinConfigurationExperience: boolean = this._isWithinConfigurationExperience();

  private _draft: any = null;
  private _draftMode: boolean = false;

  constructor(params?: any) {
    super();
    this._draft = params?.draft;
    this._draftMode = params?.mode === 'draft';
  }

  initialize() {
    if (this.withinConfigurationExperience || this._draftMode) {
      // Apply any draft properties
      if (this._draft) {
        Object.assign(this, this._draft);
      }

      window.addEventListener(
        'message',
        (e: any) => {
          this._handleConfigurationUpdates(e);
        },
        false
      );
    }
  }

  _handleConfigurationUpdates(e: any) {
    if (e?.data?.type === 'cats-app') {
      Object.assign(this, e.data);
    }
  }

  private _isWithinConfigurationExperience(): boolean {
    const { frameElement, location, parent } = window;
    // If frameElement is null, origins between parent and child do not match
    return frameElement
      ? // If origins match, check if parent iframe has data-embed-type="instant-config"
        frameElement.getAttribute("data-embed-type") === "instant-config"
        ? // If so, app is within config experience - use draft values
          true
        : // Otherwise, it is not within config experience - use publish values
          false
      : // Origins do not match
        // IF TRUE - If parent and child locations do not match, and the location hostnames are local host.
        // Use draft values for locally hosted config panel testing
        // IF FALSE - template app is embedded on hosted page - use publish values.
        location !== parent.location &&
          (location.hostname === "localhost" ||
            location.hostname === "127.0.0.1");
  }
}
