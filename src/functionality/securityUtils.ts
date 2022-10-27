import Sanitizer from "@esri/arcgis-html-sanitizer";

/** 
 * Creates new instance of @esri/arcgis-html-sanitizer 
 * with appropriate whitelist values
 */
export function createSanitizerInstance(): Sanitizer{
  return new Sanitizer(
    {
      whiteList: {
        h1: ["style"],
        h2: ["style"],
        h3: ["style"],
        h4: ["style"],
        h5: ["style"],
        h6: ["style"],
        img: ["style", "src", "width", "height"],
        pre: ["style"],
        p: ["id", "class", "style"],
        div: ["id", "class", "style", "role"],
        span: ["id", "class", "style", "role"],
        figure: ["class", "style"]
      }
    },
    true
  );
}