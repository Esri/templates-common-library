// Copyright 2023 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​

import Handles from "esri/core/Handles";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { watch } from "esri/core/reactiveUtils";
import Widget from "esri/widgets/Widget";

import { tsx } from "esri/widgets/support/widget";

const CSS = {
  backgroundColor: "--instant-apps-landing-page-background-color",
  textColor: "--instant-apps-landing-page-text-color",
  entryButtonColor: "--instant-apps-landing-page-entry-button-color"
};

@subclass("LandingPage")
class LandingPage extends Widget {
  constructor(params?) {
    super(params);
  }

  @property()
  configurationSettings: any;

  @property()
  handles: Handles;

  @property()
  portal: __esri.Portal;

  postInitialize(): void {
    document.body.prepend(this.container);
    this.addLandingPageHandles();
  }

  render() {
    return <div>{this.configurationSettings?.landingPage ? this._renderLandingPage() : null}</div>;
  }

  private _renderLandingPage() {
    const landingPageConfig = this.configurationSettings?.landingPageConfig;
    const styles = this._getStyles();
    const token = this._getToken();
    const backgroundImageSrcUrl = landingPageConfig?.backgroundImageSrc
      ? new URL(landingPageConfig?.backgroundImageSrc)
      : null;
    const iconImageUrl = landingPageConfig?.iconImage
      ? new URL(landingPageConfig?.iconImage)
      : null;
    if (token) {
      if (backgroundImageSrcUrl) backgroundImageSrcUrl.searchParams.set("token", token);
      if (iconImageUrl) iconImageUrl.searchParams.set("token", token);
    }
    return (
      <instant-apps-landing-page
        styles={styles}
        key="esri-attachment-viewer-landing-page"
        titleText={landingPageConfig?.titleText}
        subtitleText={landingPageConfig?.subtitleText}
        descriptionText={landingPageConfig?.descriptionText}
        entryButtonText={landingPageConfig?.entryButtonText}
        alignment={landingPageConfig?.alignment}
        iconImage={iconImageUrl ? iconImageUrl?.href : ""}
        iconImageScale={landingPageConfig?.iconImageScale}
        backgroundImageSrc={
          landingPageConfig?.backgroundType === "image"
            ? backgroundImageSrcUrl
              ? backgroundImageSrcUrl?.href
              : ""
            : ""
        }
      />
    ) ;
  }

  addLandingPageHandles(): void {
    this.handles.add([
      watch(
        () => this.configurationSettings?.landingPage,
        () => this.scheduleRender(),
        { initial: true }
      ),
      watch(
        () => this.configurationSettings?.landingPageConfig,
        () => this.scheduleRender(),
        { initial: true }
      )
    ]);
  }

  private _getStyles(): { [key: string]: string } {
    const landingPageConfig = this.configurationSettings?.landingPageConfig;

    return {
      [CSS.backgroundColor]: landingPageConfig?.backgroundColor,
      [CSS.textColor]: landingPageConfig?.textColor,
      [CSS.entryButtonColor]: landingPageConfig?.entryButtonColor
    };
  }

  private _getToken(): string {
    return this.portal?.["credential"]?.["token"] ?? "";
  }
}

export default LandingPage;
