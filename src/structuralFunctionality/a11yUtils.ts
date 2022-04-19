

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

export default {
    setupLiveRegion,
    postToLiveRegion,
    prefersReducedMotion
};