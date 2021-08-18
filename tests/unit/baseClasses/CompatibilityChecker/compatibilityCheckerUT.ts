/// <reference types="intern" />

import CompatibilityChecker = require("baseClasses/CompatibilityChecker");
import WebMap = require('esri/WebMap');
import WebScene = require('esri/WebScene');
import Portal = require('esri/portal/Portal');

const chai = intern.getPlugin("chai");
const { assert } = chai;
const { suite, test } = intern.getPlugin("interface.tdd");

class CompatibilityCheckerUT {
  init() {
    suite("CompatibilityChecker", () => {
      const compatibilityChecker = new CompatibilityChecker.CompatibilityChecker({
        "resourceMessages": {
          "Webmap": "This app requires a webmap",
          "Webscene": "This app requires a webscene",
          "Group": "This app requires a group",
          "WebmapOrWebscene": "This app requires a webmap or a webscene"
        },

        "requirementsMessages": {
          "AttachmentViewer": "This app requires a feature layer with attachments",
          "ImageryViewer": "This app requires an imagery layer",
          "InteractiveLegend": "This app requires a feature layer with a supported drawing style",
          "Nearby": "This app requires a feature layer with pop-up enabled",
          "ZoneLookup": "This app requires a Polygon feature layer with pop-up enabled"
        }
      });
      test("Instantiate CompatibilityChecker", () => {
        assert.doesNotThrow(() => compatibilityChecker, "Problem with Instantiation");
      });

      suite("WebMap: https://catsqa.mapsdevext.arcgis.com/home/item.html?id=20ddfc08d0a24dcd8d10cb7c4aefc01e", () => {
        test("checkAllTemplates", async () => {
          const result:Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates(new WebMap({ 
            portalItem:{ 
              id: "20ddfc08d0a24dcd8d10cb7c4aefc01e", 
              portal: new Portal({url: "https://catsqa.mapsdevext.arcgis.com/"}) 
            } 
          }));
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.AttachmentViewer), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.CategoryGallery), "This app requires a group");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Charts), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Countdown), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ImageryApp), "This app requires an imagery layer");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.InteractiveLegend), "This app requires a feature layer with a supported drawing style");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Media), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Minimalist), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Nearby), "This app requires a feature layer with pop-up enabled");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Portfolio), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Slider), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ThreeDViewer), "This app requires a webscene");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ZoneLookup), "This app requires a feature layer with pop-up enabled");
        });
      });

      suite("WebScene: https://catsqa.mapsdevext.arcgis.com/home/item.html?id=9c2abe9b33bd44fba4f6443ec67ef7cf", () => {
        test("checkAllTemplates", async () => {
          const result:Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates(new WebScene({ 
            portalItem:{ 
              id: "9c2abe9b33bd44fba4f6443ec67ef7cf", 
              portal: new Portal({url: "https://catsqa.mapsdevext.arcgis.com/"}) 
            } 
          }));
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.AttachmentViewer), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.CategoryGallery), "This app requires a group");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Charts), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Countdown), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ImageryApp), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.InteractiveLegend), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Media), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Minimalist), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Nearby), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Portfolio), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Slider), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ThreeDViewer), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ZoneLookup), "This app requires a webmap");
        });
      });

      suite("Group", () => {
        test("checkAllTemplates", async () => {
          const result:Map<CompatibilityChecker.EAppTemplateType, string> = await compatibilityChecker.checkAllTemplates("group");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.AttachmentViewer), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.CategoryGallery), null);
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Charts), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Countdown), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ImageryApp), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.InteractiveLegend), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Media), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Minimalist), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Nearby), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Portfolio), "This app requires a webmap or a webscene");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.Slider), "This app requires a webmap");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ThreeDViewer), "This app requires a webscene");
          assert.equal(result.get(CompatibilityChecker.EAppTemplateType.ZoneLookup), "This app requires a webmap");
        });
      });
    });
  }
}

export = CompatibilityCheckerUT;
