const { suite } = intern.getPlugin("interface.tdd");
import ConfigSettingsBaseUT = require("./configSettingsBase/configSettingsBaseUT");
import CompatibilityCheckerUT = require("./CompatibilityChecker/compatibilityCheckerUT");

const configSettingsBaseUT = new ConfigSettingsBaseUT();
const compatibilityCheckerUT = new CompatibilityCheckerUT();

suite("BaseClasses Folder Tests", () => {
  configSettingsBaseUT.init();
  compatibilityCheckerUT.init();
});

