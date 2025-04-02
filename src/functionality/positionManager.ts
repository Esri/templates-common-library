import { watch, when } from "@arcgis/core/core/reactiveUtils";
import { debounce } from "./debounce";
import { getPosition } from "./esriWidgetUtils";

interface IWidgetPosition {
  index?: number;
  position: __esri.UIPosition;
}

interface PositionManager {
  [key: string]: {
    widget: any;
    uiPosition: IWidgetPosition;
  };
}

interface PositionManagerBatch {
  [key: number]: PositionManager;
}

const positionManagerBatch: PositionManagerBatch = {};

const lastPositionValue: Map<string, string> = new Map(); // positionKey => serializedPosition
const serializePosition = ({ position, index }: IWidgetPosition = { position: "manual", index: 0 }) => `${position}-${index}`;

/**
 * Deals with issue where widgets load at different times and the positions in the
 * Map UI end up not matching what's prescribed in the Position Manager.
 * https://devtopia.esri.com/WebGIS/arcgis-template-configuration/issues/3105
 * 
 * Use debug === true to find the proper positionKeyLookup values 
 * (note widgets must be present in the UI, which means turned on in the config)
 * @param view
 * @param config
 * @param positionKeyLookup
 * @param debug
 */
export function assertWidgetOrdering(
  view: __esri.MapView | __esri.SceneView,
  config: any,
  positionKeyLookup: Map<string, string>,
  debug?: boolean
) {
  when(
    () => view?.ready === true,
    () => {
      view.when(() => {
        const watchWidgetOrdering = (quadrant: __esri.UIPosition) => {
          let firstAssertion = true;
          watch(
            () => config.updateCount,
            () => {
              let widgets = view.ui.getComponents(quadrant);
              let positionsHaveChanged = widgets.some((el)=>{
                  // check last config value for positionValue
                  const positionKey = getPositionKey(el.id, positionKeyLookup);
                  const positionValue: IWidgetPosition = config[positionKey];
                  if(positionValue != null && positionValue?.position !== quadrant){ 
                    // major side effect - but if the app code doesn't handle moving between quadrants, then this is necessary
                    view.ui.move(el, positionValue);
                  }
                  const serializedPosition = serializePosition(positionValue);

                  return lastPositionValue.get(positionKey) !== serializedPosition;
                });

              if (positionsHaveChanged || firstAssertion) {
                firstAssertion = false;
                setTimeout(() => {
                  widgets = view.ui.getComponents(quadrant);
                  const sortedPositionList = widgets
                    .map((el) => {
                      let positionKey = getPositionKey(el.id, positionKeyLookup);
                      let positionValue = config[positionKey];
                      lastPositionValue.set(positionKey, serializePosition(positionValue));
                      if (debug) {
                        console.log(
                          `id: ${el.id}, ====> looking in config for: ` +
                            `%c${positionKey}`,
                          "font-weight: bold; color: blue;"
                        );
                        if(positionValue == null){
                          console.log(
                              `%c${positionKey} doesn't seem to be a key. Check the ConfigSettings to find what it should be, and update positionKeyLookup with necessary override.`,
                            "font-weight: bold; color: red;"
                          );
                        }
                      }
                      return [el.id, positionValue] as [
                        string,
                        IWidgetPosition
                      ];
                    })
                    .sort((a, b) => {
                      return a[1]?.index - b[1]?.index;
                    });
                  sortedPositionList.forEach((sortedPair, index) => {
                    const [id, positionValue] = sortedPair;
                    if(positionValue){
                      positionValue.index = index; // override to directly match sorted list
                      const el = widgets.find((elem) => elem.id === id);
                      view.ui.move({ component: el, ...positionValue } as any);
                      updateExpandGroup(el, positionValue);
                    }
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
    }, {
      initial: true
    }
  );
}

function getPositionKey(
  id: string,
  positionKeyLookup: Map<string, string>
): string {
  const correctId = positionKeyLookup.get(id) != null ? positionKeyLookup.get(id) : id;
  return `${correctId}Position`
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

  if (positionManagerBatch[viewInstance] == null) {
    positionManagerBatch[viewInstance] = {};
  }

  const widget = getWidget(view, element);
  if (widget) {
    const position = extractPositionAndIndex(uiPosition);
    updatePositionManager(viewInstance, widget, position);
    debouncePositionUpdate(view, viewInstance, position);
  }
}

function updatePositionManager(
  viewInstance: number,
  widget: __esri.Widget | HTMLElement,
  uiPosition: IWidgetPosition
): void {
  const positionManager = positionManagerBatch[viewInstance];
  positionManager[widget.id] = { uiPosition, widget };
}

function debouncePositionUpdate(
  view: __esri.MapView | __esri.SceneView,
  viewInstance: number,
  uiPosition: IWidgetPosition
): void {
  const { position } = uiPosition;
  debounce(
    () => {
      const positionManager = positionManagerBatch[viewInstance];
      const components = Object.values(positionManager).filter(
        (el) => el.uiPosition.position === position
      );
      components.sort((a, b) => a.uiPosition.index - b.uiPosition.index);
      components.forEach((component, index) => {
        const position = {
          index,
          position: component.uiPosition.position,
        };
        view.ui.move(component.widget, position);
      });
    },
    200,
    false,
    viewInstance,
    `widgetPositionBatch-${viewInstance}-${position}`
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

function getWidget(
  view: __esri.MapView | __esri.SceneView,
  element: __esri.Widget | HTMLElement | string
): __esri.Widget | HTMLElement {
  if (typeof element === "string") {
    return view.ui.find(element);
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
