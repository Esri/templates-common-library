# Landing Page

4.x ArcGIS Maps SDK for JavaScript widget class that handles adding the Landing Page to a web app and the necessary watchers.

## Usage Examples

### Instantiation

```
const landingPage = new LandingPage({
    container: document.createElement("div"),
    configurationSettings: this._configurationSettings,
    handles: this.handles,
    portal: this.base.portal,
    base: this.base
});
```

## Properties

| Property              | Description                                                                       | Type                              |
| --------------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| container             | A reference to an HTML DOM element.                                               | HTMLElement                       |
| configurationSettings | Configuration settings class that manages app setting values                      | ConfigurationSettings             |
| portal                | A portal instance.                                                                | Portal                            |
| handles               | Handles that contain watchers for an instant apps's configuration setting values. | Handles                           |
| base                  | Needed to access template app data values to handle deprecated cover page.        | ApplicationBase                   |
| landingPageEl         | Reference to instant-apps-landing-page node. (Internally set)                     | HTMLInstantAppsLandingPageElement |
