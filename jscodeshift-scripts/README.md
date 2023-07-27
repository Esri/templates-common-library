# jscodeshift

Toolkit for running codemods to handle large code refactors in app source files. Prerequisite for writing jscodeshift codemod scripts is an understanding of AST types.

## Getting started:

1. Install jscodeshift globally

   `npm i -g jscodeshift`

2. Use the following command with the necessary paths and script file names.

   `jscodeshift -t [PATH_TO_SOURCE_FILES_TO_CONVERT]/ [PATH_TO_JSCODESHIFT_SCRIPT]/*.ts --extensions=ts,tsx --parser=tsx --no-fail-on-error`

3. Go through the git diff, and manually make sure everything looks good. Also, it'd be good to build the project and double check.

## Scripts:

### amd_To_Esm

Updates import and export statements to migrate apps from AMD to ESM.

For example:

```
// From:
import WebMap = require("esri/WebMap");

// To:
import WebMap from "@arcgis/core/WebMap";
```

```
// From:
export = TestComponent;

 // To:
export default TestComponent;
```

### watchUtils_To_ReactiveUtils

Converts the 4.x ArcGIS JS API watchUtils **(DEPRECATED)** to reactiveUtils.

For example:

```
// From:
watchUtils.watch(this, "view.ready", () => {
    // DO SOMETHING
});

// To:
reactiveUtils.watch(
    () => this.view?.ready,
    () => {
        // DO SOMETHING
    }
);
```

## Resources:

[jscodeshift GitHub Repo](https://github.com/facebook/jscodeshift)

[Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code)

[Abstract syntax tree - AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

[AST Explorer - Tool to inspect a file's abstract syntax tree](https://astexplorer.net)
