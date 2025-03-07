/*
 *   Copyright (c) 2021 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { ApplicationConfig  } from "../../../interfaces/applicationBase";//AppConfig from "../ConfigurationSettings";

import { tsx, messageBundle } from "esri/widgets/support/widget";
import Viewshed from "esri/analysis/Viewshed";
import ViewshedAnalysis from "esri/analysis/ViewshedAnalysis";

interface ViewshedPanelProps extends __esri.WidgetProperties {
  config: any;
  view: __esri.SceneView;
}

const CSS = {
  base: "viewshed-panel"
};

@subclass("ViewshedPanel")
class ViewshedPanel extends Widget {
  @property()
  config: ApplicationConfig;

  @property()
  view: __esri.SceneView;

  @property()
  state: string = null;

  @property()
  @messageBundle("dist/assets/t9n/common")
  messages: any = null;

  @property()
  rootNode: any = null;
  @property()
  viewshedAnalysisView: any;

  @property()
  viewshedAnalysis: ViewshedAnalysis;

  @property()
  viewshed: any;

  constructor(params: ViewshedPanelProps) {
    super(params);
  }
  postInitialize(): void {
    this?.view?.when(() => {
      // Create the viewshed shape.
      this.viewshed = new Viewshed({
        farDistance: 900,
        tilt: 84,
        heading: 63,
        horizontalFieldOfView: 85,
        verticalFieldOfView: 52
      });
      // Initialize viewshed analysis with the created viewshed shape and add it to the view.
      this.viewshedAnalysis = new ViewshedAnalysis({ viewsheds: [this?.viewshed] });
      this.view.analyses.add(this.viewshedAnalysis);
    });
  }
  render() {
    const { theme } = this.config;
    let themeClass = theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";

    return (
      <div class={this.classes([theme, CSS.base, themeClass, "viewshed-component"])}>
        <calcite-block open>
          <calcite-button
            class="esri-button esri-button--secondary viewshed-button"
            onclick={this._createViewshed}
            bind={this}
            theme={theme}
          >
            {this?.messages?.tools?.viewshed?.create}
          </calcite-button>
          <calcite-notice open={this.state === "active" ? true : false} icon="viewshed">
            <div slot="message">{this?.messages?.tools?.viewshed?.instructions}</div>
          </calcite-notice>
          <calcite-button
            class="esri-button esri-button--secondary viewshed-button"
            disabled={this.state === "active" ? false : true}
            onclick={this._handleViewshedClear}
            bind={this}
            theme={theme}
          >
            {this.messages?.tools?.viewshed?.clear}
          </calcite-button>
        </calcite-block>
      </div>
    );
  }
  async _createViewshed() {
    if (!this.viewshedAnalysisView) {
      this.viewshedAnalysisView = await this?.view.whenAnalysisView(this?.viewshedAnalysis);
      this.viewshedAnalysisView.interactive = true;
      this.viewshedAnalysisView.selectedViewshed = this?.viewshed;
    }
    this.viewshedAnalysisView.createViewsheds();
    this.state = "active";
  }
  _handleViewshedClear() {
    if (this?.viewshedAnalysis?.viewsheds?.length > 0) {
      const views = this.viewshedAnalysis.viewsheds;
      views.removeAll();
    }
    if (this.viewshedAnalysisView) {
      this.viewshedAnalysisView.interactive = false;
    }
    this.state = "disabled";
  }
  destroy() {}
}

export default ViewshedPanel;
