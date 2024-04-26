function isHTTP(url: string) {
  return url?.indexOf("http://") !== -1;
}

export function upgradeToHttps(url: string): string {
  return isHTTP(url) ? url.replace(/^http:\/\//, "https://") : url;
}
