export function isWithinConfigurationExperience(): boolean {
  const { frameElement, location, parent } = window; // If frameElement is null, origins between parent and child do not match
  return frameElement
    ? // If origins match, check if parent iframe has data-embed-type="instant-config"
      frameElement.getAttribute("data-embed-type") === "instant-config"
      ? // If so, app is within config experience - use draft values
        true
      : // Otherwise, it is not within config experience - use publish values
        false
    : // Origins do not match
      // IF TRUE - If parent and child locations do not match, and the location hostnames are local host.
      // Use draft values for locally hosted config panel testing
      // IF FALSE - template app is embedded on hosted page - use publish values.
      location !== parent.location && (location.hostname === "localhost" || location.hostname === "127.0.0.1");
}
