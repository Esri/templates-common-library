/// <reference types="intern" />

import CompatibilityChecker = require("baseClasses/CompatibilityChecker");
import WebMap = require('esri/WebMap');
import WebScene = require('esri/WebScene');
import Portal = require('esri/portal/Portal');

const chai = intern.getPlugin("chai");
const { assert } = chai;
const { suite, test } = intern.getPlugin("interface.tdd");

enum ResourceResults {
  Webmap = "This app requires a webmap",
  Webscene = "This app requires a webscene",
  Group = "This app requires a group",
  WebmapOrWebscene = "This app requires a webmap or a webscene",
}

class CompatibilityCheckerUT {
  init() {
    suite("CompatibilityChecker", () => {
      const compatibilityChecker = new CompatibilityChecker.CompatibilityChecker({
        resourceMessages: {
          Webmap: ResourceResults.Webmap,
          Webscene: ResourceResults.Webscene,
          Group: ResourceResults.Group,
          WebmapOrWebscene: ResourceResults.WebmapOrWebscene
        },

        requirementsMessages: {
          AttachmentViewer: "This app requires a feature layer with attachments",
          ChartViewer: "This app requires a map with at least one chart configured",
          ImageryViewer: "This app requires an imagery layer",
          InteractiveLegend: "This app requires a feature layer with a supported drawing style",
          Nearby: "This app requires a feature layer with pop-up enabled",
          ZoneLookup: "This app requires a Polygon feature layer with pop-up enabled"
        }
      });
      test("Instantiate CompatibilityChecker", () => {
        assert.doesNotThrow(() => compatibilityChecker, "Problem with Instantiation");
      });

      suite("WebMap: https://catsqa.mapsdevext.arcgis.com/home/item.html?id=20ddfc08d0a24dcd8d10cb7c4aefc01e", () => {
        test("checkAllTemplates", async () => {
          const result: Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates(new WebMap({
            portalItem: {
              id: "20ddfc08d0a24dcd8d10cb7c4aefc01e",
              portal: new Portal({ url: "https://catsqa.mapsdevext.arcgis.com/" })
            }
          }));

          [
            [CompatibilityChecker.EAppTemplateType.ThreeDViewer, ResourceResults.Webscene],
            [CompatibilityChecker.EAppTemplateType.Atlas, ResourceResults.Group],
            [CompatibilityChecker.EAppTemplateType.AttachmentViewer, null],
            [CompatibilityChecker.EAppTemplateType.Basic, null],
            [CompatibilityChecker.EAppTemplateType.CategoryGallery, ResourceResults.Group],
            [CompatibilityChecker.EAppTemplateType.Charts, "This app requires a map with at least one chart configured"],
            [CompatibilityChecker.EAppTemplateType.Countdown, null],
            [CompatibilityChecker.EAppTemplateType.Exhibit, null],
            [CompatibilityChecker.EAppTemplateType.Insets, null],
            [CompatibilityChecker.EAppTemplateType.InteractiveLegend, "This app requires a feature layer with a supported drawing style"],
            [CompatibilityChecker.EAppTemplateType.ImageryApp, "This app requires an imagery layer"],
            [CompatibilityChecker.EAppTemplateType.Media, null],
            [CompatibilityChecker.EAppTemplateType.Minimalist, null],
            [CompatibilityChecker.EAppTemplateType.Nearby, "This app requires a feature layer with pop-up enabled"],
            [CompatibilityChecker.EAppTemplateType.Notify, null],
            [CompatibilityChecker.EAppTemplateType.Observer, ResourceResults.Webscene],
            [CompatibilityChecker.EAppTemplateType.Portfolio, null],
            [CompatibilityChecker.EAppTemplateType.Sidebar, null],
            [CompatibilityChecker.EAppTemplateType.Slider, null],
            [CompatibilityChecker.EAppTemplateType.ZoneLookup, "This app requires a feature layer with pop-up enabled"],
          ].forEach((testInfo)=>{
            assert.equal(
              result.get(testInfo[0]), testInfo[1],
              testInfo[0]
            );  
          });
        });
      });

      suite("WebScene: https://catsqa.mapsdevext.arcgis.com/home/item.html?id=9c2abe9b33bd44fba4f6443ec67ef7cf", () => {
        test("checkAllTemplates", async () => {
          const result: Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates(new WebScene({
            portalItem: {
              id: "9c2abe9b33bd44fba4f6443ec67ef7cf",
              portal: new Portal({ url: "https://catsqa.mapsdevext.arcgis.com/" })
            }
          }));
          [
            [CompatibilityChecker.EAppTemplateType.ThreeDViewer, null],
            [CompatibilityChecker.EAppTemplateType.Atlas, ResourceResults.Group],
            [CompatibilityChecker.EAppTemplateType.AttachmentViewer, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Basic, null],
            [CompatibilityChecker.EAppTemplateType.CategoryGallery, ResourceResults.Group],
            [CompatibilityChecker.EAppTemplateType.Charts, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Countdown, null],
            [CompatibilityChecker.EAppTemplateType.Exhibit, null],
            [CompatibilityChecker.EAppTemplateType.Insets, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.InteractiveLegend, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.ImageryApp, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Media, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Minimalist, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Nearby, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Notify, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Observer, null],
            [CompatibilityChecker.EAppTemplateType.Portfolio, null],
            [CompatibilityChecker.EAppTemplateType.Sidebar, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Slider, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.ZoneLookup, ResourceResults.Webmap],
          ].forEach((testInfo)=>{
            assert.equal(
              result.get(testInfo[0]), testInfo[1],
              testInfo[0]
            );  
          });

        });
      });

      suite("Group", () => {
        test("checkAllTemplates", async () => {
          const result: Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates("group");

          [
            [CompatibilityChecker.EAppTemplateType.ThreeDViewer, ResourceResults.Webscene],
            [CompatibilityChecker.EAppTemplateType.Atlas, null],
            [CompatibilityChecker.EAppTemplateType.AttachmentViewer, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Basic, ResourceResults.WebmapOrWebscene],
            [CompatibilityChecker.EAppTemplateType.CategoryGallery, null],
            [CompatibilityChecker.EAppTemplateType.Charts, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Countdown, ResourceResults.WebmapOrWebscene],
            [CompatibilityChecker.EAppTemplateType.Exhibit, ResourceResults.WebmapOrWebscene],
            [CompatibilityChecker.EAppTemplateType.Insets, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.InteractiveLegend, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.ImageryApp, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Media, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Minimalist, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Nearby, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Notify, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Observer, ResourceResults.Webscene],
            [CompatibilityChecker.EAppTemplateType.Portfolio, ResourceResults.WebmapOrWebscene],
            [CompatibilityChecker.EAppTemplateType.Sidebar, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.Slider, ResourceResults.Webmap],
            [CompatibilityChecker.EAppTemplateType.ZoneLookup, ResourceResults.Webmap],
          ].forEach((testInfo)=>{
            assert.equal(
              result.get(testInfo[0]), testInfo[1],
              testInfo[0]
            );  
          });
        });
      });
    });
  }
}

export = CompatibilityCheckerUT;
