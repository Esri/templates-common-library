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

import { storeNode, tsx } from "esri/widgets/support/widget";
import { isWithinConfigurationExperience } from "../../functionality/configurationSettings";
import ApplicationBase from "../../baseClasses/ApplicationBase";
import { getLandingPageValues } from "../../functionality/coverPage";

const KEYS = [
  "coverPage",
  "landingPage",
  "coverPageConfig",
  "landingPageConfig",
];

const CSS = {
  backgroundColor: "--instant-apps-landing-page-background-color",
  textColor: "--instant-apps-landing-page-text-color",
  entryButtonColor: "--instant-apps-landing-page-entry-button-color",
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

  @property()
  base: ApplicationBase;

  @property()
  landingPageEl;

  @property()
  postInitialize(): void {
    this._handleDeprecatedCoverPage();
    document.body.prepend(this.container);
    this.addLandingPageHandles();
  }

  render() {
    const { coverPage, landingPage } = this.configurationSettings;
    return (
      <div>
        {landingPage === undefined
          ? coverPage
            ? this._renderLandingPage()
            : null
          : landingPage
          ? this._renderLandingPage()
          : null}
      </div>
    );
  }

  private _renderLandingPage() {
    const config = this._getConfig();
    const styles = this._getStyles();
    const token = this._getToken();
    const backgroundImageSrcUrl = config?.backgroundImageSrc
      ? new URL(config?.backgroundImageSrc)
      : null;
    const iconImageUrl = config?.iconImage ? new URL(config?.iconImage) : null;
    if (token) {
      if (backgroundImageSrcUrl)
        backgroundImageSrcUrl.searchParams.set("token", token);
      if (iconImageUrl) iconImageUrl.searchParams.set("token", token);
    }
    return (
      <instant-apps-landing-page
        bind={this}
        afterCreate={storeNode}
        data-node-ref="landingPageEl"
        style={styles}
        key="esri-attachment-viewer-landing-page"
        fontFamily={this?.configurationSettings?.customTheme?.appFont}
        titleText={config?.titleText}
        subtitleText={config?.subtitleText}
        descriptionText={config?.descriptionText}
        entryButtonText={config?.entryButtonText}
        alignment={config?.alignment}
        iconImage={iconImageUrl ? iconImageUrl?.href : ""}
        iconImageScale={config?.iconImageScale}
        backgroundImageSrc={
          config?.backgroundType === "image"
            ? backgroundImageSrcUrl
              ? backgroundImageSrcUrl?.href
              : ""
            : ""
        }
      />
    );
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
      ),
    ]);
  }

  private _getStyles(): string {
    const config = this._getConfig();
    const backgroundColor = config?.backgroundColor;
    const textColor = config?.textColor;
    const entryButtonColor = config?.entryButtonColor;
    const isImage = config?.backgroundType === "image";
    const backgroundImageSrc = config?.backgroundImageSrc;
    return `
      ${CSS.backgroundColor}: ${
      isImage && backgroundImageSrc
        ? "var(--calcite-ui-foreground-1)"
        : backgroundColor
        ? backgroundColor
        : "var(--calcite-ui-brand)"
    };
      ${CSS.textColor}: ${
      textColor ? textColor : "var(--calcite-ui-text-inverse)"
    };
      ${CSS.entryButtonColor}: ${
      entryButtonColor ? entryButtonColor : "var(--calcite-ui-brand)"
    };
    `;
  }

  private _getToken(): string {
    return this.portal?.["credential"]?.["token"] ?? "";
  }

  private _getConfig() {
    const landingPageConfig = this.configurationSettings?.landingPageConfig;
    const coverPageConfig = this.configurationSettings?.coverPageConfig;
    return getLandingPageValues(landingPageConfig, coverPageConfig);
  }

  private _handleDeprecatedCoverPage(): void {
    const values = this.base.results.applicationData?.value?.values;
    KEYS.forEach((key) =>
      this._handleUndefined(values, key, this.configurationSettings)
    );
  }

  private _handleUndefined(values: any, key: string, config: any): void {
    if (isWithinConfigurationExperience()) {
      this._setUndefinedForDraft(values, key, config);
    } else {
      this._setUndefinedForPublish(values, key, config);
    }
  }

  private _setUndefinedForDraft(values: any, key: string, config: any): void {
    if (!values?.draft?.hasOwnProperty(key) && !values.hasOwnProperty(key)) {
      config[key] = undefined;
    }
  }

  private _setUndefinedForPublish(values: any, key: string, config: any): void {
    if (!values?.hasOwnProperty(key)) {
      config[key] = undefined;
    }
  }
}

export default LandingPage;
