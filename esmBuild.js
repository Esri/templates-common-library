import path from "path";
import fse from "fs-extra";
import fs from "fs";
import { map, replace } from "ramda";

/** Recursively get all files within a directory */
const readDirR = (dir) => {
  const recur = map(f => readDirR(path.join(dir, f)));
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...recur(fs.readdirSync(dir)))
    : dir;
};

/** "Import" string replacement for ESM */
const importReplace = replace(/esri\//g, "@arcgis/core/");

const updateFiles = (files) => {
  const updateFiles = map(filePath => {
    return fse.readFile(filePath, "utf-8")
      .then(fileTxt => {
        const updatedFile = importReplace(fileTxt);
        return fse.writeFile(filePath, updatedFile);
      });
  });

  return Promise.all(updateFiles(files));
};

const files = readDirR("./distESM"); 
await updateFiles(files);

console.log("ESM string replacement finished");