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
        let updatedFile = fileTxt.replaceAll(/esri\//g, "@arcgis/core/");
        // the previous line messes up "@esri/" imports. revert those back specifically
        updatedFile = updatedFile.replaceAll("@@arcgis/core/", "@esri/");
        // esm needs different telemetry file
        updatedFile = updatedFile.replaceAll("\"./telemetry.dojo.min\"", "\"./telemetry.min\"");

        return fse.writeFile(filePath, updatedFile);
      });
  });

  return Promise.all(updateFiles(files));
};

const files = readDirR("./distESM"); 
updateFiles(files).then(()=>{
  console.log("ESM string replacement finished");
});
