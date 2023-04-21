const { suite } = intern.getPlugin("interface.tdd");
import GeneralUtilsUT = require("./GeneralUtils/generalUtilsUT");

const generalUtilsUT = new GeneralUtilsUT();

suite("functionality Folder Tests", () => {
  generalUtilsUT.init();
});

