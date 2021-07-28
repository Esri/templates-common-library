const { suite } = intern.getPlugin("interface.tdd");
import ConfigSettingsBaseUT = require("./configSettingsBase/configSettingsBaseUT");

const configSettingsBaseUT = new ConfigSettingsBaseUT();

suite("Configuration Widgets", () => {
  configSettingsBaseUT.init();
});

