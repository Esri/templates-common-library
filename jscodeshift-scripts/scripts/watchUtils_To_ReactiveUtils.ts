import { ArrayExpression, Expression, Identifier, JSCodeshift, Literal, MemberExpression, SpreadElement, ThisExpression } from "jscodeshift";
import { describe } from "jscodeshift-helper";

export default (fileInfo, api) => {
  const j: JSCodeshift = api.jscodeshift;
  const root = j(fileInfo.source);

  const isESM = () => {
    // const amdUrl = `esri/core/watchUtils`;
    const esmUrl = `@arcgis/core/core/watchUtils`;

    // const amdSearch = root
    //   .find(j.ImportDeclaration, {
    //     source: {
    //       type: "Literal",
    //       value: amdUrl,
    //     },
    //   });

    const esmSearch = root
    .find(j.ImportDeclaration, {
      source: {
        value: esmUrl,
      },
    });

    return esmSearch.size() > 0;
  }

  const importPrefix = isESM() ? "@arcgis/core" : "esri";


  /** Maps all Imports of WatchUtils to ReactiveUtils */
  const convertImports = () => {
    const importUrl = `${importPrefix}/core/watchUtils`;

    root
      .find(j.ImportDeclaration, {
        source: {
          value: importUrl,
        },
      })
      .replaceWith((nodePath) => {
        const { node } = nodePath;

        node.source.value = (node.source.value as string).replace("watchUtils", "reactiveUtils");

        /**
         * Convert all imports from watchUtils to reactiveUtils.
         * Gather new imports in a set (to eliminate duplicates), then construct new specifiers
         */
        const specifiersSet = new Set<string>();
        node.specifiers?.map((specifier) => {
          let name = specifier?.local?.name;
          switch (specifier?.local?.name) {
            case "init":
              name = "watch";
              break;
            case "when":
              name = "when";
              break;
            case "whenOnce":
              name = "when";
              break;
            case "whenNot":
              name = "when";
              break;
            case "whenNotOnce":
              name = "when";
              break;
            case "whenTrue":
              name = "when";
              break;
            case "whenTrueOnce":
              name = "when";
              break;
            case "whenFalse":
              name = "when";
              break;
            case "whenFalseOnce":
              name = "when";
              break;
            case "whenDefined":
              name = "when";
              break;
            case "whenDefinedOnce":
              name = "when";
              break;
            case "whenUndefined":
              name = "when";
              break;
            case "whenUndefinedOnce":
              name = "when";
              break;
          }
          if (name != null) {
            specifiersSet.add(name);
          }
        });
        const specifiers = Array.from(specifiersSet.keys()).map(
          (key: string) => {
            return j.importSpecifier(j.identifier(key), j.identifier(key));
          }
        );

        node.specifiers = specifiers;

        return node;
      });
    };
    
    /**
      // Before
      watchUtils.watch(foo, "some.value", (newValue, oldValue) => {
        console.log(newValue, oldValue);
      });
      
      // After
      reactiveUtils.watch(
        () => foo.some?.value,
        (newValue, oldValue) => console.log(newValue, oldValue)
      );
     */
   const convertWatchFunction = () => {

    root
      .find(j.CallExpression, {
        callee: {
          type: "Identifier",
          name: "watch"
        },
      })
      .replaceWith((nodePath) => {
        const { node } = nodePath;

        const paths = getFullPathsArray(
          node.arguments[0],
          node.arguments[1]
        );
        
        const newArgs = [
          j.arrowFunctionExpression(
            [],
            j.identifier(paths.join(" || "))
          ),
          node.arguments[2]
        ];

        node.arguments = newArgs;

        return node;
      });
  };


  /**
    // Before
    watchUtils.init(foo, "some.value", (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });

    // After
    reactiveUtils.watch(
      () => foo.some?.value,
      (newValue, oldValue) => console.log(newValue, oldValue),
      { initial: true }
    );
   */
   const convertInitFunction = () => {

    root
      .find(j.CallExpression, {
        callee: {
          type: "Identifier",
          name: "init"
        },
      })
      .replaceWith((nodePath) => {
        const { node } = nodePath;
        
        (node.callee as Identifier).name = "watch";

        const paths = getFullPathsArray(
          node.arguments[0],
          node.arguments[1]
        );
        
        const newArgs = [
          j.arrowFunctionExpression(
            [],
            j.identifier(paths.join(" || "))
          ),
          node.arguments[2],
          j.objectExpression([
            j.property(
              "init",
              j.identifier("initial"),
              j.literal(true)
            )
          ])
        ];

        node.arguments = newArgs;

        return node;
      });
  };

    /**
      // Before
      import { watch } from "esri/core/watchUtils";

      when(foo, "some.value", () => console.log("Truthy"));
      whenNot(foo, "some.value", () => console.log("Not truthy"));
      whenTrue(foo, "some.value", () => console.log("True"));
      whenDefined(foo, "some.value", () => console.log("Defined"));
      whenUndefined(foo, "some.value", () => console.log("Undefined"));

      // After
      import { when } from "esri/core/reactiveUtils";

      when(() => foo.some?.value, () => console.log("Truthy"));
      when(() => !foo.some?.value, () => console.log("Not truthy"));
      when(() => foo.some?.value === true, () => console.log("True"));
      when(() => foo.some?.value !== undefined, () => console.log("Defined"));
      when(() => foo.some?.value === undefined, () => console.log("Undefined"));
    */
     const convertAllWhenFunction = () => {

      const whenReplaceFunc = (
        whenType: "when"
        | "whenNot"
        | "whenTrue"
        | "whenFalse"
        | "whenDefined"
        | "whenUndefined",
        isOnce: boolean,
        nodePath
      ) => {
        const { node } = nodePath;

        (node.callee as Identifier).name = "when";

        const paths = getFullPathsArray(
          node.arguments[0],
          node.arguments[1]
        );

        const newArgs = [
          j.arrowFunctionExpression(
            [],
            whenType === "when"
              ? j.identifier(paths.join(" || "))
            : whenType === "whenNot"
              ? j.identifier(paths.map((path)=>`!${path}`).join(" || "))
            : whenType === "whenTrue"
              ? j.identifier(paths.map((path)=>`${path} === true`).join(" || "))
            : whenType === "whenFalse"
              ? j.identifier(paths.map((path)=>`${path} === false`).join(" || "))
            : whenType === "whenDefined"
              ? j.identifier(paths.map((path)=>`${path} !== undefined`).join(" || "))
            : whenType === "whenUndefined"
              ? j.identifier(paths.map((path)=>`${path} === undefined`).join(" || "))
            : j.identifier(paths.join(" || ")) // default
          ),
          node.arguments[2],
          j.objectExpression([
            (isOnce ? 
            j.property(
              "init",
              j.identifier("once"),
              j.literal(true)
            )
            : null) as any,
            j.property(
              "init",
              j.identifier("initial"),
              j.literal(true)
            )
          ].filter((val)=>val != null))
        ];

        node.arguments = newArgs;

        return node;
      };

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "when"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "when", false));
      
      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "when", true));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenNot"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenNot", false));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenNotOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenNot", true));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenTrue"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenTrue", false));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenTrueOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenTrue", true));

        root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenFalse"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenFalse", false));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenFalseOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenFalseOnce", true));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenDefined"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenDefined", false));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenDefinedOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenDefined", true));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenUndefined"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenUndefined", false));

      root
        .find(j.CallExpression, {
          callee: {
            type: "Identifier",
            name: "whenUndefinedOnce"
          },
        }).replaceWith(whenReplaceFunc.bind(this, "whenUndefined", true));


    };

    /** 
     * Combines the param0 and param1 values of WatchUtils functions and returns the full path
     * 
     * ex 1: 
     * 
     * watch(foo, "some.value", (newValue, oldValue) => {
     *   console.log(newValue, oldValue);
     * });
     * 
     * returns [foo?.some?.value]
     * 
     * ex 2:
     * 
     * when(this, ["navBar", "contentArea"], () => {
     *   this.scheduleRender();
     * })
     * 
     * return [this?.navBar, this?.contentArea]
     * 
     */
    const getFullPathsArray = (
      param0: SpreadElement | Expression, 
      param1: SpreadElement | Expression 
    )=>{

      const processParam0 = (expression: any)=>{
        if (expression.type === "ThisExpression"){
          return "this";
        } else if(expression.type === "Identifier"){
          return (expression as Identifier).name;
        } else if(expression.type === "MemberExpression"){
          return `${processParam0(expression.object)}?.${((expression as MemberExpression).property as Identifier).name}`;
        }else {
          return "";
        } 
      }
      
      const param0Value = processParam0(param0);

      const param1Paths: string[] = [];
      if((param1 as any)?.value != null){
        const param1Value: string = ((param1 as Literal).value as string);
        const pathWithOptionalChaining = param1Value.split(".").join("?.");
        param1Paths.push(pathWithOptionalChaining);
      } else if (param1.type === "ArrayExpression"){
        param1Paths.push(
            ...(param1 as ArrayExpression).elements.map((literal) => {
            const literalValue: string = ((literal as Literal).value as string);
            return literalValue.split(".").join("?.");
          })
        );
      }

      return param1Paths.map((param1Path)=> `${param0Value}?.${param1Path}`);
    }

    convertImports();
    convertWatchFunction();
    convertInitFunction();
    convertAllWhenFunction();

  return root.toSource(); //({ quote: 'single', trailingComma: true });
};
