/*
 *   Copyright (c) 2025 Esri
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
import { watch } from "esri/core/reactiveUtils";
import Widget from "esri/widgets/Widget";
import { tsx, messageBundle } from "esri/widgets/support/widget";
import Slice from "esri/widgets/Slice";
import { ApplicationConfig } from "../../../interfaces/applicationBase";

interface SliceProps extends __esri.WidgetProperties {
  config: any;
  view: __esri.SceneView;
}

const CSS = {
  base: "slice-panel"
};

@subclass("SlicePanel")
class SlicePanel extends Widget {
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
  sliceTool: __esri.Slice = null;

  constructor(params: SliceProps) {
    super(params);
  }

  render() {
    const { theme } = this.config;
    let themeClass = theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";

    return (
      <calcite-panel class={this.classes([theme, CSS.base, themeClass])}>
        <div bind={this} afterCreate={this._createSliceTool}></div>
        <div style="margin:0 15px 8px 15px;">
          <button
            class="esri-button esri-button--secondary slice-button"
            disabled={this.state === "sliced" ? false : true}
            onclick={this._handleSliceClear}
            bind={this}
            theme={theme}
          >
            {this.messages.clear}
          </button>
        </div>
      </calcite-panel>
    );
  }
  _createSliceTool(container) {
    this.sliceTool = new Slice({
      view: this.view,
      container
    });
    this.sliceTool.viewModel.tiltEnabled = true;
    watch(
      () => this?.sliceTool?.viewModel?.state,
      (state) => {
        this.state = state;
      },
      { initial: true }
    );
  }
  _handleSliceClear() {
    if (!this.sliceTool) {
      return;
    }
    this.sliceTool.viewModel.clear();
  }
  destroy() {
    this?.sliceTool?.destroy();
  }
}

export default SlicePanel;
