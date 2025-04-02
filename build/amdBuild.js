const path = require("path");
const fse = require("fs-extra");
const fs  = require("fs");
const { map }  = require("ramda");

/** Recursively get all files within a directory */
const readDirR = (dir) => {
  const recur = map(f => readDirR(path.join(dir, f)));
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...recur(fs.readdirSync(dir)))
    : dir;
};

const updateFiles = (files) => {
  const updateFiles = map(filePath => {
    return fse.readFile(filePath, "utf-8")
      .then(fileTxt => {
        // esm uses @arcgis/core package for JS API and the references are different
        let updatedFile = fileTxt.replaceAll(/@arcgis\/core\//g, "esri/");
        // remove TemplatesCommonLib prefix from JS API path
        updatedFile = updatedFile.replaceAll(/TemplatesCommonLib\/esri/g, "esri/");

        // amd needs different telemetry file
        updatedFile = updatedFile.replaceAll("\"./telemetry.min\"", "\"./telemetry.dojo.min\"");
                
        return fse.writeFile(filePath, updatedFile);
      });
  });

  return Promise.all(updateFiles(files));
};

const files = readDirR("./distAMD"); 
updateFiles(files).then(()=>{
  console.log("AMD string replacement finished");
});
