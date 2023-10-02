# Language Switcher

4.x ArcGIS Maps SDK for JavaScript widget class that handles adding the language switcher to a map view and the necessary watchers.

## Usage Examples

### Instantiation

```
const languageSwitcher = new LanguageSwitcher({
    base: applicationBase,
    configurationSettings: configurationSettings,
    view: view,
    handles: handles
});
```

### Setting up watch handles

(Note: These handles will be added with the rest of the watcher handles that manage configuration settings.)

```
  this._handles.add([
    ...Configuration setting watch handles
    ...languageSwitcher.getLanguageSwitcherHandles(widgetProps),
    ...Configuration setting watch handles
  ]);
```


### Expand group

This method is used to update the expand group to allow only one expand within the group to opened at a time.

expandGroup(group: string): void;

```
  watch(
    () => this._configurationSettings?.languageSwitcherPosition,
    () => {
      if (this._languageSwitcher) {
        const { left, right } = { left: "left", right: "right" };
        const position = this._configurationSettings?.languageSwitcherPosition?.position ?? right;
        const isLeft = position?.indexOf(left) !== -1;
        const isRight = position?.indexOf(right) !== -1;
        const group = isLeft ? left : isRight ? right : null;
        this._languageSwitcher.updateGroup(group);
      }
    },
    { initial: true }
  )
```

## Properties

| Property              | Description                                                                       | Type                  |
| --------------------- | --------------------------------------------------------------------------------- | --------------------- |
| base                  | A class designed to handle common tasks of ArcGIS Instant Apps.                   | ApplicationBase       |
| configurationSettings | Configuration settings class that manages app setting values                      | ConfigurationSettings |
| view                  | Reference to MapView                                                              | MapView               |
| handles               | Handles that contain watchers for an instant apps's configuration setting values. | Handles               |
