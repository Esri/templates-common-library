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
import { storeNode, tsx } from "esri/widgets/support/widget";

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
  state: "consentGiven" | "consentNotGiven" | "nothingDoneYet" =
    "nothingDoneYet";

  @property()
  config: any;

  // @property()
  // @messageBundle("dist/assets/t9n/widgets/Alert/Alert")
  // messages = null;

  render() {
    const theme =
      this.config?.theme === "dark"
        ? "calcite-mode-dark"
        : "calcite-mode-light";

    return (
      <div bind={this}>
        <calcite-alert
          afterCreate={storeNode}
          bind={this}
          data-node-ref="_alertNode"
          oncalciteAlertClose={this.handleClose.bind(this)}
          scale="s"
          active={true}
          open={true}
          class={this.classes(CSS.base, theme)}
        >
          <div slot="message">
            <div>
              <span
                style="padding:0 5px;"
                afterCreate={(container) => {
                  container.innerHTML = this?.config?.googleAnalyticsConsentMsg;
                }}
              ></span>
            </div>
          </div>
          <calcite-button
            scale="s"
            slot="actions-end"
            bind={this}
            onclick={this.handleClick.bind(this)}
            class={CSS.optOutButton}
            style="margin: auto 18px;"
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
    localStorage.setItem(`${this.appName}`, "true");
    this.state = "consentGiven";
  }

  handleClose() {
    localStorage.setItem(`${this.appName}`, "false");
    this.state = "consentNotGiven";
  }
}
