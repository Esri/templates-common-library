 //
 // * This file does the following:
 // * 1. Reaches out to npm templates-common-library to find version number
 // * 2. increments "patch" number of the version (the third spot ---> "0.0.X" becomes "0.0.X+1")
 // * 3. updates both package.json files (AMD and ESM) with the new version number, so the repo is now ready for publishing
 //

const axios = require('axios');

const fse = require("fs-extra");
const { map }  = require("ramda");

const url = "https://registry.npmjs.org/templates-common-library";

axios
  .get(url)
  .then(async (res) => {
    const version = new String(res.data["dist-tags"].latest);
    console.log(`latest TCL version: ${version}`);
    const newVersion = calcNewVersion(version);
    console.log(`new version calculated: ${newVersion}`);
    
    const amdPackageJson = readDirR("./amd"); 
    await updatePackageJson(amdPackageJson, newVersion, "amd");
    console.log(`amd package.json updated to ${newVersion}`);

    const esmPackageJson = readDirR("./esm"); 
    await updatePackageJson(esmPackageJson, newVersion, "esm");
    console.log(`esm package.json updated to ${newVersion}-esm`);

  })
  .catch(error => {
    console.error("Error getting templates-common-library version number");
    console.error(error);
  });

const calcNewVersion = (version) => {
  const versionParts = version.split(".");
  const reversed = versionParts.reverse();
  const incre = new Number(reversed[0])+1;
  reversed[0] = incre.toString();
  const newVersionParts = reversed.reverse();
  const newVersion = newVersionParts.join(".");
  return newVersion;
}

const updatePackageJson = (files, version, type) => {
  const updateFiles = map(filePath => {
    return fse.readFile(filePath, "utf-8")
      .then(fileTxt => {
        updatedFile = fileTxt.replace(/\"version\":.*\".*\"/, `"version": "${version}${type === "esm" ? "-esm" : ""}"`);

        return fse.writeFile(filePath, updatedFile);
      });
  });

  return Promise.all(updateFiles(files));
};

/** Recursively get all files within a directory */
const readDirR = (dir) => {
  const recur = map(f => readDirR(path.join(dir, f)));
  return fs.statSync(dir).isDirectory()
    ? Array.prototype.concat(...recur(fs.readdirSync(dir)))
    : dir;
};