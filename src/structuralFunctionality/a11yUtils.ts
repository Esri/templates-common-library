import { ApplicationConfig } from "../interfaces/applicationBase";

const liveRegionId = "a11y-live-region";

interface LiveRegionParams {
  id?: string;
  parent?: HTMLElement;
  mode?: "polite" | "assertive";
}

export function setupLiveRegion(params?: LiveRegionParams): HTMLElement {
  const root = params?.parent ?? document.body;
  const regionId = params?.id ?? liveRegionId;
  const mode = params?.mode ?? "polite";
  let region = root.querySelector<HTMLElement>(`#${regionId}`);
  if (!region) {
    region = document.createElement("div");
    region.id = regionId;
    region.classList.add("screen-readers-only");
    region.setAttribute("role", "alert");
    region.setAttribute("aria-live", mode);
    region.setAttribute("aria-atomic", "true");
    region.textContent = "";
    root.appendChild(region);
  }
  return region;
}
export function getMapDescription(
  config: ApplicationConfig,
  view: __esri.MapView | __esri.SceneView,
  portalItem: __esri.PortalItem
): string {
  let appitem,
    mapItem = null;

  if (portalItem) {
    appitem = portalItem?.snippet || portalItem?.description;
  }
  const mapPortalItem = (view as any)?.map?.portalItem;
  if (mapPortalItem) {
    mapItem = mapPortalItem?.snippet || mapPortalItem?.description;
  }
  return config?.mapA11yDesc || appitem || mapItem;
}

export function setMapDescription(view: __esri.MapView | __esri.SceneView, mapA11yDesc: string, sanitizerInstance: any): void {
  if (!view || !mapA11yDesc) return;

  if (typeof sanitizerInstance?.sanitize !== "function") {
    console.error("Invalid sanitizer instance. Aborting.");
    return;
  }

  // Constants for node IDs, class names, and aria attributes
  const MAP_DESC_NODE_ID = "mapDescription";
  const SR_ONLY_CLASS = "sr-only";
  const ROOT_VIEW_NODE_CLASS_NAME = "esri-view-surface";
  const ARIA_DESCRIBEDBY = "aria-describedby";

  // sr-only node
  const mapDescriptionNode = document.getElementById(MAP_DESC_NODE_ID);

  const sanitizedMapA11yDesc = sanitizerInstance.sanitize(mapA11yDesc);

  if (!mapDescriptionNode) {
    // Creates node to be read by screen reader, sets mapA11yDesc value, and appended to view container.
    const mapA11yDescContainer = document.createElement("div");
    mapA11yDescContainer.id = MAP_DESC_NODE_ID;
    mapA11yDescContainer.classList.add(SR_ONLY_CLASS);
    mapA11yDescContainer.innerHTML = sanitizedMapA11yDesc;
    view.container.appendChild(mapA11yDescContainer);

    // Iterates through esri view dom tree and sets 'aria-describedby' to 'mapDescription' to queried nodes
    const rootNode = document.getElementsByClassName(ROOT_VIEW_NODE_CLASS_NAME);
    view.container.setAttribute(ARIA_DESCRIBEDBY, MAP_DESC_NODE_ID);
    for (let k = 0; k < rootNode.length; k++) {
      rootNode[k].setAttribute(ARIA_DESCRIBEDBY, MAP_DESC_NODE_ID);
    }
  } else {
    mapDescriptionNode.innerHTML = sanitizedMapA11yDesc;
  }
}

export function postToLiveRegion(message: string, id?: string) {
  const regionId = id ? id : liveRegionId;
  const region = document.body.querySelector<HTMLElement>(`#${regionId}`);
  if (region) {
    region.textContent = message;
  }
}
export function prefersReducedMotion(): boolean {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches ? true : false;
}
export function goToOverride(
  view: __esri.MapView | __esri.SceneView,
  goToParams: any
) {
  if (prefersReducedMotion()) {
    goToParams.options = {
      ...goToParams.options,
      animate: false,
    };
  }
  return view.goTo(goToParams.target, goToParams.options);
}
export default {
  setupLiveRegion,
  prefersReducedMotion,
  postToLiveRegion,
};
