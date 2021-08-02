# templates-common-library

This library contains reusable utilities for use in any ArcGIS Instant app

## Features
* ConfigSettingsBase - Class to handle configurable properties
* ApplicationBase - Class to handle basic Instant App setup (port from [old repo](https://github.com/Esri/application-base-js))
* basemapToggleUtils - Functions for Instant Apps to easily setup the Basemap Toggle and properly hook it into config values coming from the Config Panel 
* and more...

## Folder Structure
* `baseClasses` - Classes that can be extended or used
* `functionality` - Reusable modules that implement specific functionality (especially relating to Config Panel integration code)
* `interfaces` - Common Interfaces, Enums, Types... etc
* `structuralFunctionality` - Reusable modules that implement functionality that is foundational to the inner workings of a template app (ex: t9n, a11y, telemetry... etc) 

## Instructions for templates-common-library local development setup

1. Clone repo locally
2. npm install 
3. npm run prepare - builds both AMD and ESM versions

## AMD vs ESM

We publish this library in two forms: AMD and ESM. We do this so that you can match with the Esri JS API versions that you use. 

- If you are using the [AMD JS API](https://developers.arcgis.com/javascript/latest/get-started/#1-install-and-set-up), then you should use the AMD templates-common-library version. 
   - This version is published to npm with normal version numbering: ex: "1.0.1" 
- If you are using the [ESM JS API](https://developers.arcgis.com/javascript/latest/es-modules/#introduction), then you should use the ESM templates-common-library version.
   - This version is published to npm with normal version numbering but also has a -esm on the end: ex: "1.0.1-esm". Note: In your package.json, you need to strip the caret "^" off the beginning of the version number for this package, or else the AMD version will be installed when `npm install` is run.

For each version of this library, both an AMD and an ESM style version with be published. For example, both version "1.1.7" and "1.1.7-esm" will be published.

## Requirements

* Most functions and utilities avaliable here are strongly coupled to the ArcGIS Instant Apps ecosystem. So it is recommended that you only use these utilities if you are working within this product ecosystem.

## Resources

* [ArcGIS Instant Apps Resource Center](https://community.esri.com/t5/arcgis-instant-apps/ct-p/arcgis-instant-apps)
* [ArcGIS Instant Apps Blog](https://community.esri.com/t5/arcgis-instant-apps-blog/bg-p/arcgis-instant-apps-blog)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing
Copyright 2020 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/quickstart-map-js/master/license.txt) file.

[](Esri Tags: ArcGIS Instant App)
[](Esri Language: JavaScript)​