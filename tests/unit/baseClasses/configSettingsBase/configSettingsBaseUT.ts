/// <reference types="intern" />

import ConfigSettingsBase = require("baseClasses/configurationSettingsBase");
import Collection = require('esri/core/Collection');

const chai = intern.getPlugin("chai");
const { assert } = chai;
const { suite, test } = intern.getPlugin("interface.tdd");

class ConfigSettingsBaseUT {
  init() {
    suite("ConfigSettingsBase", () => {
      console.log("ConfSetBase", ConfigSettingsBase);

      suite("ConfigSettingsBase: Instantiation", () => {
        const configSettingsBase = new ConfigSettingsBase.default();

        test("Instantiate ConfigSettingsBase", () => {
          assert.doesNotThrow(() => configSettingsBase, "Problem with Instantiation");
        });

        test("is within Config Experience?", ()=> {
          assert.isFalse(configSettingsBase.withinConfigurationExperience, "Problem with withinConfigurationExperience: false positive");
        });
      });
    });
  }
}

export = ConfigSettingsBaseUT;
