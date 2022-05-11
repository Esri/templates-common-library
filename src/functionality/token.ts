export function applyImgTokens(innerHTML: string, token: string): string {
  const bodyEl = document.createElement("body");
  bodyEl.innerHTML = innerHTML;
  const imageNodes = bodyEl.getElementsByTagName("img");
  Array.from(imageNodes).forEach((img: HTMLImageElement) => {
    if (img?.src) {
      const url = new URL(img.src);
      const params = new URLSearchParams(url.search);
      if (
        img.src.indexOf("instantAppsConfigPanel") !== -1 &&
        !params.get("token")
      ) {
        params.append("token", token);
        const str = params.toString();
        const paramsString = str ? str : "";
        const src = `${url.origin}${url.pathname}${
          paramsString ? "?" : ""
        }${paramsString}`;
        img.src = src;
      }
    }
  });
  return bodyEl.innerHTML;
}

export function removeImgTokens(innerHTML: string): string {
  const bodyEl = document.createElement("body");
  bodyEl.innerHTML = innerHTML;
  const imageNodes = bodyEl.getElementsByTagName("img");
  Array.from(imageNodes).forEach((img: HTMLImageElement) => {
    if (img?.src) {
      const url = new URL(img.src);
      const params = new URLSearchParams(url.search);
      if (
        img.src.indexOf("instantAppsConfigPanel") !== -1 &&
        params.get("token")
      ) {
        params.delete("token");
        const str = params.toString();
        const paramsString = str ? str : "";
        const src = `${url.origin}${url.pathname}${
          paramsString ? "?" : ""
        }${paramsString}`;
        img.src = src;
      }
    }
  });
  return bodyEl.innerHTML;
}
