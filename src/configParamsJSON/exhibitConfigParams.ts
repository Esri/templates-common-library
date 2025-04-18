export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "itemTypes": [
          "2d",
          "3d"
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
      "id": "exhibit",
      "content": [
        {
          "type": "group",
          "id": "exhibit",
          "content": [
            {
              "type": "setting",
              "id": "exhibitConfig",
              "express": true,
              "defaultValue": null
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
          "type": "subsection",
          "id": "appComprehension",
          "content": [
            {
              "type": "group",
              "id": "appComprehension",
              "content": [
                {
                  "type": "setting",
                  "id": "header",
                  "defaultValue": true,
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "alignHeader",
                      "defaultValue": "left",
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "showTitle",
                      "defaultValue": false,
                      "express": false,
                      "content": [
                        {
                          "type": "setting",
                          "id": "title",
                          "defaultValue": "",
                          "express": false
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "splash",
                  "defaultValue": false,
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "splashOnStart",
                      "defaultValue": true,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "splashTitle",
                      "defaultValue": "",
                      "express": true
                    },
                    {
                      "type": "setting",
                      "id": "splashContent",
                      "defaultValue": "",
                      "express": true,
                      "config": {
                        "imageUpload": true
                      }
                    },
                    {
                      "type": "setting",
                      "id": "splashButtonText",
                      "defaultValue": "Explore",
                      "express": false
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
          "type": "subsection",
          "id": "coverPageSettings",
          "content": [
            {
              "type": "group",
              "id": "coverPage",
              "content": [
                {
                  "type": "setting",
                  "id": "landingPage",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "landingPageConfig",
                      "express": false,
                      "defaultValue": {
                        "titleText": "Title",
                        "subtitleText": "Subtitle",
                        "descriptionText": "Description content",
                        "entryButtonText": "Enter",
                        "alignment": "center",
                        "backgroundType": "color",
                        "textColor": "#FFFFFF",
                        "entryButtonColor": "#0079C1",
                        "backgroundColor": "#0079C1",
                        "iconImage": null,
                        "iconImageScale": "m",
                        "backgroundImageSrc": null
                      }
                    }
                  ]
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
          "type": "subsection",
          "id": "exploreNavigate",
          "content": [
            {
              "type": "group",
              "id": "explore",
              "content": [
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "express": true,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "mapZoomPosition",
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
            }
          ]
        },
        {
          "type": "subsection",
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
          "type": "subsection",
          "id": "controlPanelOptions",
          "content": [
            {
              "type": "group",
              "id": "controlPanelOptions",
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
                },
                {
                  "type": "setting",
                  "id": "share",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "shareIncludeSocial",
                      "defaultValue": true,
                      "express": false
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "exportToPDF",
                  "defaultValue": false
                }
              ]
            },
            {
              "type": "group",
              "id": "general",
              "content": [
                {
                  "type": "setting",
                  "id": "home",
                  "express": true,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "measure",
                  "express": true,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "locateWidget",
                  "express": true,
                  "defaultValue": false
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "search",
          "content": [
            {
              "type": "group",
              "id": "search",
              "content": [
                {
                  "type": "setting",
                  "id": "search",
                  "defaultValue": false,
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "searchPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 1
                      }
                    },
                    {
                      "type": "setting",
                      "id": "searchOpenAtStart",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "searchConfiguration",
                      "express": true,
                      "defaultValue": null
                    }
                  ]
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
                  "defaultValue": null,
                  "config": {
                    "numOfSections": 1,
                    "headerOnly": true,
                    "fontAlwaysEditable": true
                  }
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
          "express": true,
          "defaultValue": false,
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