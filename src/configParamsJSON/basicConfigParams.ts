export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "itemTypes": [
          "2d",
          "3d",
          "weblinkchart"
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
      "id": "about",
      "content": [
        {
          "type": "group",
          "id": "appComprehension",
          "content": [
            {
              "type": "setting",
              "id": "splash",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "splashTitle",
                  "defaultValue": ""
                },
                {
                  "type": "setting",
                  "id": "splashContent",
                  "defaultValue": "",
                  "config": {
                    "imageUpload": true
                  }
                },
                {
                  "type": "setting",
                  "id": "splashButtonText",
                  "defaultValue": ""
                },
                {
                  "type": "setting",
                  "id": "splashButtonPosition",
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
          "type": "setting",
          "id": "header",
          "defaultValue": false,
          "express": true,
          "content": [
            {
              "type": "setting",
              "id": "title",
              "defaultValue": ""
            }
          ]
        },
        {
          "type": "group",
          "id": "featureComprehension",
          "content": [
            {
              "type": "setting",
              "id": "legend",
              "express": true,
              "defaultValue": true,
              "content": [
                {
                  "type": "setting",
                  "id": "legendPosition",
                  "defaultValue": {
                    "position": "top-right",
                    "index": 0
                  }
                },
                {
                  "type": "setting",
                  "id": "legendOpenAtStart",
                  "defaultValue": false
                }
              ]
            },
            {
              "type": "setting",
              "id": "popupFixed",
              "express": true,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "popupFixedPosition",
                  "express": true,
                  "defaultValue": "bottom-right"
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
                    "position": "top-left",
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
          "type": "subsection",
          "id": "exploreNavigate",
          "content": [
            {
              "type": "group",
              "id": "explore",
              "content": [
                {
                  "type": "setting",
                  "id": "bookmarks",
                  "defaultValue": true,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "bookmarksPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 0
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "express": false,
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
                  "id": "home",
                  "express": false,
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
                        "index": 1
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "locateWidget",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "locateWidgetPosition",
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
              "type": "group",
              "id": "navigate",
              "content": [
                {
                  "type": "setting",
                  "id": "disableScroll",
                  "defaultValue": false,
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "scalebar",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "scalebarPosition",
                      "defaultValue": {
                        "position": "bottom-left",
                        "index": 0
                      }
                    },
                    {
                      "type": "setting",
                      "id": "scalebarDualMode",
                      "defaultValue": false,
                      "express": false
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
              "id": "basemapToggle",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "basemapTogglePosition",
                  "defaultValue": {
                    "position": "bottom-left",
                    "index": 0
                  }
                },
                {
                  "type": "setting",
                  "id": "basemapSelector",
                  "defaultValue": "streets-vector"
                }
              ]
            },
            {
              "type": "setting",
              "id": "layerList",
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "layerListPosition",
                  "defaultValue": {
                    "position": "bottom-right",
                    "index": 0
                  }
                },
                {
                  "type": "setting",
                  "id": "layerListOpenAtStart",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "visibilityIcon",
                  "express": false,
                  "defaultValue": "default"
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "share",
          "content": [
            {
              "type": "setting",
              "id": "share",
              "content": [
                {
                  "type": "setting",
                  "id": "shareIncludeEmbed",
                  "defaultValue": false,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "shareIncludeSocial",
                  "defaultValue": true,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "sharePosition",
                  "defaultValue": "top-right"
                }
              ],
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "exportToPDF",
              "express": true,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "exportButtonIcon",
                  "express": false,
                  "defaultValue": "export",
                  "config": {
                    "iconList": [
                      "export",
                      "file-pdf",
                      "print",
                      "print-preview",
                      "images"
                    ]
                  }
                },
                {
                  "type": "setting",
                  "id": "exportToPDFPosition",
                  "defaultValue": {
                    "position": "top-left",
                    "index": 0
                  }
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
              "type": "setting",
              "id": "search",
              "express": true,
              "defaultValue": true,
              "content": [
                {
                  "type": "setting",
                  "id": "searchPosition",
                  "defaultValue": "top-right",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "searchOpenAtStart",
                  "express": true,
                  "defaultValue": false
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
              "type": "setting",
              "id": "theme",
              "defaultValue": "light",
              "express": true
            },
            {
              "type": "group",
              "id": "headerTheme",
              "content": [
                {
                  "type": "setting",
                  "id": "customTheme",
                  "express": true,
                  "config": {
                    "numOfSections": 1,
                    "headerOnly": true,
                    "singleFont": false
                  },
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
              "id": "languageSwitcherOpenAtStart",
              "express": false,
              "defaultValue": false
            },
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
                "index": 5
              }
            }
          ]
        }
      ]
    }
  ]
};