import { watch, when } from "esri/core/reactiveUtils";
import { debounce } from "./debounce";
import { getPosition } from "./esriWidgetUtils";

interface IWidgetPosition {
  index?: number;
  position: __esri.UIPosition;
}

interface IBatchWidgetPositions {
  [key: number]: Array<{
    widget: __esri.Widget | HTMLElement;
    uiPosition: IWidgetPosition;
  }>;
}

const batch: IBatchWidgetPositions = {};

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

/**
 * This function handles the batch positioning of widgets in a view. Replace the `view.ui.move` method with this function to batch the positioning of widgets.
 * @param {__esri.MapView | __esri.SceneView} view - The view in which the widgets are located.
 * @param {__esri.Widget | HTMLElement | string} element - The widget, HTML element, or widget id to be positioned.
 * @param {IWidgetPosition | __esri.UIPosition} uiPosition - The new position for the widget.
 * @param {number} [viewInstance=0] - The instance of the view. This is useful when you have multiple views and want to specify in which one the widget should be positioned.
 */
export function handleBatchWidgetPositions(
  view: __esri.MapView | __esri.SceneView,
  element: __esri.Widget | HTMLElement | string,
  uiPosition: IWidgetPosition | __esri.UIPosition,
  viewInstance: number = 0
): void {
  if (!isValidInput(view, element, uiPosition)) return;

  if (batch[viewInstance] == null) {
    batch[viewInstance] = [];
  }

  const widget = getWidget(view, element);
  const position = extractPositionAndIndex(uiPosition);

  updateBatchWithWidget(viewInstance, widget, position);
  debounce(
    () => moveWidgetsInBatch(viewInstance, view),
    500,
    false,
    viewInstance,
    "widgetPositionBatch"
  );
}

function isValidInput(
  view: __esri.View,
  element: __esri.Widget | HTMLElement | string,
  uiPosition: IWidgetPosition | __esri.UIPosition
): boolean {
  return Boolean(view && element && uiPosition);
}

function extractPositionAndIndex(
  uiPosition: IWidgetPosition | string
): IWidgetPosition {
  return typeof uiPosition === "string"
    ? { position: uiPosition as __esri.UIPosition }
    : { position: uiPosition.position, index: uiPosition.index };
}

function updateBatchWithWidget(
  viewInstance: number,
  widget: __esri.Widget | HTMLElement,
  uiPosition: IWidgetPosition
): void {
  const existingWidgetIndex = batch[viewInstance].findIndex(
    (el) => el.widget.id === widget.id
  );
  if (existingWidgetIndex > -1) {
    batch[viewInstance][existingWidgetIndex] = { widget, uiPosition };
  } else {
    batch[viewInstance].push({ widget, uiPosition });
  }
}

function moveWidgetsInBatch(viewInstance: number, view: __esri.View): void {
  batch[viewInstance].sort((a, b) => {
    const positionComparison = a.uiPosition.position.localeCompare(
      b.uiPosition.position
    );
    if (positionComparison !== 0) {
      return positionComparison;
    }

    return a.uiPosition.index - b.uiPosition.index;
  });

  batch[viewInstance].forEach((el) => {
    const position =
      el.uiPosition.index == null ? el.uiPosition.position : el.uiPosition;
    view.ui.move(el.widget, position);
  });

  batch[viewInstance] = [];
}

function getWidget(
  view: __esri.View,
  element: __esri.Widget | HTMLElement | string
): __esri.Widget | HTMLElement {
  if (typeof element === "string") {
    return view.ui.find(element) as __esri.Widget | HTMLElement;
  } else {
    return element;
  }
}

function updateExpandGroup(el: any, positionLookup: any): void {
  if (el?.declaredClass === "esri.widgets.Expand") {
    const group = getPosition(positionLookup);
    (el as __esri.Expand).group = group;
  }
}
