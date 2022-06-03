/*
  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/

import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { storeNode, tsx, messageBundle } from "esri/widgets/support/widget";

const CSS = {
  base: "esri-interactive-legend-ga-alert",
  optOutButton: "esri-interactive-legend__opt-out-button"
};

@subclass("Alert")
export default class Alert extends Widget {
  constructor(params) {
    super(params);
  }

  private _alertNode: any = null;

  @property()
  appName: string;

  @property()
  state: "consentGiven" | "consentNotGiven" | "nothingDoneYet" = "nothingDoneYet";

  @property()
  config: any;

  // @property()
  // @messageBundle("dist/assets/t9n/widgets/Alert/Alert")
  // messages = null;

  render() {
    return (
      <div bind={this}>
        <calcite-alert
          afterCreate={storeNode}
          bind={this}
          data-node-ref="_alertNode"
          oncalciteAlertClose={this.handleClose.bind(this)}
            // T9N - HARDCODED EN STRING
          intl-close={"Close"}
          scale="s"
          active={true}
          class={CSS.base}
          theme={this.config?.theme === "dark" ? "dark" : "light"}
        >
          <div slot="message" innerHTML={this?.config?.googleAnalyticsConsentMsg}></div>
          <calcite-button
            scale="s"
            slot="link"
            bind={this}
            onclick={this.handleClick.bind(this)}
            class={CSS.optOutButton}
          >
            {/* {this.messages.webAnalytics.optIn} */}
            {/* T9N - HARDCODED EN STRING */}
            Opt In
          </calcite-button>
        </calcite-alert>
      </div>
    );
  }

  handleClick() {
    localStorage.setItem(`analytics-opt-in-${this.appName}`, "true");
    this.state = "consentGiven";
  }

  handleClose(){
    localStorage.setItem(`analytics-opt-in-${this.appName}`, "false");
    this.state = "consentNotGiven";
  }
}