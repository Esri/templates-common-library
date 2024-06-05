import { watch, when } from "esri/core/reactiveUtils";
import { getPosition } from "./esriWidgetUtils";

/**
 * Deals with issue where widgets load at different times and the positions in the
 * Map UI end up not matching what's prescribed in the Position Manager.
 * https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/3105
 * @param view
 * @param config
 * @param positionKeyLookup
 * @param debug
 */
export function assertWidgetOrdering(
  view: __esri.View,
  config: any,
  positionKeyLookup: Map<string, string>,
  debug?: boolean
) {
  when(
    () => view?.ready === true,
    () => {
      view.when(() => {
        const watchWidgetOrdering = (quadrant: __esri.UIPosition) => {
          let leftPosition = view.ui.getComponents(quadrant);
          let firstAssertion = true;
          watch(
            () => config.updateCount,
            () => {
              const leftPositionNew = view.ui.getComponents(quadrant);

              const positionsHaveChanged: boolean =
                leftPosition.length !== leftPositionNew.length ||
                leftPosition.some((el, i) => {
                  return el !== leftPositionNew[i];
                });

              if (positionsHaveChanged || firstAssertion) {
                leftPosition = leftPositionNew;
                firstAssertion = false;
                setTimeout(() => {
                  const sortedPositionList = leftPosition
                    .map((el) => {
                      const id =
                        positionKeyLookup.get(el.id) != null
                          ? positionKeyLookup.get(el.id)
                          : el.id;
                      let positionKey = `${id}Position`;
                      if (debug) {
                        console.log(
                          `id: ${id}, ====> looking in config for: ` +
                            `%c${positionKey}`,
                          "font-weight: bold; color: blue;"
                        );
                      }
                      return [el.id, config[positionKey]] as [
                        string,
                        { index: number; position: string }
                      ];
                    })
                    .sort((a, b) => {
                      return a[1]?.index - b[1]?.index;
                    });
                  sortedPositionList.forEach((sortedPair) => {
                    const [id, positionLookup] = sortedPair;
                    const el = leftPosition.find((elem) => elem.id === id);
                    view.ui.move({ component: el, ...positionLookup } as any);
                    updateExpandGroup(el, positionLookup);
                  });
                }, 200);
              }
            },
            { initial: true }
          );
        };

        watchWidgetOrdering("top-left");
        watchWidgetOrdering("top-right");
        watchWidgetOrdering("bottom-left");
        watchWidgetOrdering("bottom-right");
      });
    }
  );
}

function updateExpandGroup(el: any, positionLookup: any): void {
  if (el?.declaredClass === "esri.widgets.Expand") {
    const group = getPosition(positionLookup);
    (el as __esri.Expand).group = group;
  }
}
