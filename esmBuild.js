const path = require("path");
const fse = require("fs-extra");
const fs  = require( "fs");
const { map, replace }  = require( "ramda");

/** Recursively get all files within a directory */
const readDirR = (dir) => {
  const recur = map(f => readDirR(path.join(dir, f)));
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...recur(fs.readdirSync(dir)))
    : dir;
};

/** "Import" string replacement for ESM */
const importReplace = replace(/esri\//g, "@arcgis/core/");
/** Replace telemetry.js resource Url */
const telemetryResourceReplace = replace("\"./telemetry.dojo.min\"", "\"./telemetry.min\"");

const updateFiles = (files) => {
  const updateFiles = map(filePath => {
    return fse.readFile(filePath, "utf-8")
      .then(fileTxt => {
        let updatedFile = importReplace(fileTxt);
        updatedFile = telemetryResourceReplace(updatedFile);
        return fse.writeFile(filePath, updatedFile);
      });
  });

  return Promise.all(updateFiles(files));
};

const files = readDirR("./distESM"); 
updateFiles(files).then(()=>{
  console.log("ESM string replacement finished");
});
