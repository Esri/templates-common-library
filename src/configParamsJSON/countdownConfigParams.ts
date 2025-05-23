export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "itemTypes": [
          "2d",
          "3d"
        ],
        "conditions": [
          "supportsOrderBy"
        ]
      },
      "content": [
        {
          "type": "setting",
          "id": "mapArea",
          "express": false,
          "content": [
            {
              "type": "setting",
              "id": "mapAreaConfig",
              "express": false,
              "defaultValue": null
            }
          ],
          "defaultValue": false
        }
      ]
    },
    {
      "type": "section",
      "id": "countdown",
      "content": [
        {
          "type": "group",
          "id": "countdown",
          "content": [
            {
              "type": "setting",
              "id": "countdownSectionsConfig",
              "express": true,
              "defaultValue": [
                {
                  "type": "details",
                  "enabled": true,
                  "title": "Details",
                  "content": "Welcome to the Countdown App! Start exploring the data in this app by using the countdown section to page through each location. While paging through the locations in the countdown section, the map will focus on the extent that showcases that feature. Use the pin to compare feature to identify relationships among the locations in the map. Click the button below to get started.",
                  "navTitle": "Details",
                  "icon": "text-paragraph-large"
                },
                {
                  "type": "countdown",
                  "enabled": true,
                  "order": "DESC",
                  "featuresDisplayed": 10,
                  "pagingLabel": "Page {current} of {total}",
                  "zoomScale": 5000000,
                  "navTitle": "Countdown",
                  "icon": "caret-double-horizontal",
                  "buttonText": "Next: {nextSection}",
                  "highlight": false,
                  "enableFilterField": false,
                  "presetLayerEffects": {
                    "id": "muted-blur",
                    "data": {
                      "includedEffect": "",
                      "excludedEffect": "blur(3px) opacity(50%)"
                    }
                  }
                },
                {
                  "type": "leaderboard",
                  "enabled": true,
                  "order": "DESC",
                  "featuresDisplayed": 10,
                  "zoomScale": 5000000,
                  "navTitle": "Leaderboard",
                  "icon": "list-number",
                  "buttonText": "Next: {nextSection}",
                  "highlight": false,
                  "enableFilterField": false,
                  "presetLayerEffects": {
                    "id": "muted-blur",
                    "data": {
                      "includedEffect": "",
                      "excludedEffect": "blur(3px) opacity(50%)"
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "mapFilter",
          "content": [
            {
              "type": "setting",
              "id": "enableMapFilter",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "globalFilter",
                  "express": false
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "play",
          "content": [
            {
              "type": "setting",
              "id": "autoPlay",
              "express": true,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "enableAutoPlay",
                  "defaultValue": false,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "autoPlayDuration",
                  "express": false,
                  "defaultValue": 5
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "id": "about",
      "content": [
        {
          "type": "group",
          "id": "header",
          "content": [
            {
              "type": "setting",
              "id": "header",
              "defaultValue": true,
              "express": true,
              "content": [
                {
                  "type": "setting",
                  "id": "title",
                  "defaultValue": "",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "titleLink",
                  "defaultValue": "",
                  "express": true
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "legend",
          "content": [
            {
              "type": "setting",
              "id": "legend",
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "legendPosition",
                  "defaultValue": {
                    "position": "bottom-left",
                    "index": 0
                  }
                },
                {
                  "type": "setting",
                  "id": "legendOpenAtStart",
                  "defaultValue": false
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "mapA11y",
          "content": [
            {
              "type": "setting",
              "id": "mapA11yDesc",
              "express": true
            },
            {
              "type": "setting",
              "id": "keyboardShortcuts",
              "express": true,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "keyboardShortcutsPosition",
                  "defaultValue": {
                    "position": "bottom-right",
                    "index": 0
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "id": "interactivity",
      "content": [
        {
          "type": "group",
          "id": "explore",
          "content": [
            {
              "type": "setting",
              "id": "mapZoom",
              "defaultValue": true,
              "content": [
                {
                  "type": "setting",
                  "id": "mapZoomPosition",
                  "defaultValue": {
                    "position": "top-left",
                    "index": 1
                  }
                }
              ]
            },
            {
              "type": "setting",
              "id": "home",
              "defaultValue": true,
              "content": [
                {
                  "type": "setting",
                  "id": "homePosition",
                  "defaultValue": {
                    "position": "top-left",
                    "index": 0
                  }
                }
              ]
            },
            {
              "type": "setting",
              "id": "compassWidget",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "compassWidgetPosition",
                  "defaultValue": {
                    "position": "top-left",
                    "index": 2
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "modify",
          "content": [
            {
              "type": "setting",
              "id": "enableHighlightColor",
              "express": false,
              "content": [
                {
                  "type": "setting",
                  "id": "highlightColor",
                  "express": false,
                  "config": {
                    "alpha": true
                  },
                  "defaultValue": "rgba(0, 255, 255, 0.50)"
                }
              ]
            },
            {
              "type": "setting",
              "id": "enableHighlightHaloColor",
              "express": false,
              "content": [
                {
                  "type": "setting",
                  "id": "highlightHaloColor",
                  "express": false,
                  "defaultValue": "#00FFFF"
                }
              ]
            }
          ]
        },
        {
          "type": "group",
          "id": "share",
          "content": [
            {
              "type": "setting",
              "id": "share",
              "defaultValue": false,
              "express": true,
              "content": [
                {
                  "type": "setting",
                  "id": "shareIncludeSocial",
                  "defaultValue": true,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "sharePosition",
                  "defaultValue": {
                    "position": "top-right",
                    "index": 1
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "id": "themeLayout",
      "content": [
        {
          "type": "subsection",
          "id": "theme",
          "content": [
            {
              "type": "group",
              "id": "theme",
              "content": [
                {
                  "type": "setting",
                  "id": "theme",
                  "express": true,
                  "defaultValue": "light"
                },
                {
                  "type": "setting",
                  "id": "customTheme",
                  "express": true,
                  "defaultValue": null
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "logo",
          "content": [
            {
              "type": "group",
              "id": "logo",
              "content": [
                {
                  "type": "setting",
                  "id": "logo",
                  "express": false,
                  "defaultValue": null
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "positionManager",
          "content": [
            {
              "type": "setting",
              "id": "positionManager",
              "express": true,
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "controlPanelPosition",
              "defaultValue": {
                "position": "top-right",
                "index": 0
              }
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "id": "languageSwitcher",
      "express": true,
      "content": [
        {
          "type": "setting",
          "id": "languageSwitcher",
          "defaultValue": false,
          "express": true,
          "content": [
            {
              "type": "setting",
              "id": "languageSwitcherConfig",
              "express": true,
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "languageSwitcherPosition",
              "defaultValue": {
                "position": "top-right",
                "index": 1
              }
            }
          ]
        }
      ]
    }
  ]
};