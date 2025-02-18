export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "conditions": ["renderer"]
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
          "type": "subsection",
          "id": "appComprehension",
          "content": [
            {
              "type": "group",
              "id": "title",
              "content": [
                {
                  "type": "setting",
                  "id": "title",
                  "express": true,
                  "defaultValue": ""
                }
              ]
            },
            {
              "type": "group",
              "id": "splash",
              "content": [
                {
                  "type": "setting",
                  "id": "splash",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "splashButtonPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 0
                      }
                    },
                    {
                      "type": "setting",
                      "id": "splashTitle",
                      "express": true,
                      "defaultValue": ""
                    },
                    {
                      "type": "setting",
                      "id": "splashContent",
                      "express": true,
                      "defaultValue": "",
                      "config": {
                        "imageUpload": true
                      }
                    },
                    {
                      "type": "setting",
                      "id": "splashButtonText",
                      "defaultValue": "Okay"
                    }
                  ]
                }
              ]
            },
            {
              "type": "setting",
              "id": "header",
              "defaultValue": true,
              "express": true,
              "content": [
                {
                  "type": "group",
                  "id": "customHeader",
                  "content": [
                    {
                      "type": "setting",
                      "id": "customHeader",
                      "defaultValue": false,
                      "content": [
                        {
                          "type": "setting",
                          "id": "customHeaderHTML",
                          "defaultValue": "",
                          "config": {
                            "imageUpload": true
                          }
                        }
                      ]
                    }
                  ]
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
            },
            {
              "type": "group",
              "id": "mapA11y",
              "content": [
                {
                  "type": "setting",
                  "id": "mapA11yDesc",
                  "express": true
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
                    "titleText": "",
                    "subtitleText": "",
                    "descriptionText": "",
                    "entryButtonText": "",
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
    },
    {
      "type": "section",
      "id": "interactiveLegend",
      "content": [
        {
          "type": "setting",
          "id": "interactiveLegendStyle",
          "express": true,
          "config": {
            "branches": [
              ["interactiveLegendOpenAtStart"],
              ["interactiveLegendPanelLocation"]
            ]
          },
          "content": [
            {
              "type": "setting",
              "id": "interactiveLegendOpenAtStart",
              "express": true,
              "defaultValue": true
            },
            {
              "type": "setting",
              "id": "interactiveLegendPanelLocation",
              "express": true,
              "defaultValue": "left"
            }
          ],
          "defaultValue": {
            "branchValue": "floating",
            "branchOptionsFieldNames": []
          }
        },
        {
          "type": "setting",
          "id": "compact",
          "express": true,
          "defaultValue": false
        },
        {
          "type": "setting",
          "id": "updateExtent",
          "express": true,
          "defaultValue": false
        },
        {
          "type": "setting",
          "id": "featureCount",
          "express": true,
          "defaultValue": false
        },
        {
          "type": "setting",
          "id": "applyLayerEffects",
          "express": true,
          "content": [
            {
              "type": "setting",
              "id": "presetLayerEffects",
              "express": true,
              "defaultValue": {
                "id": "lift-1",
                "data": {
                  "includedEffect": "drop-shadow(4px, 4px, 4px, #000000)",
                  "excludedEffect": ""
                }
              }
            }
          ],
          "defaultValue": false
        },
        {
          "type": "setting",
          "id": "infoPanel",
          "defaultValue": false,
          "express": true,
          "content": [
            {
              "type": "setting",
              "id": "infoPanelOpenAtStart",
              "defaultValue": false,
              "express": true
            },
            {
              "type": "setting",
              "id": "infoPanelPosition",
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
                  "id": "bookmarks",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "bookmarksPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 2
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
                        "index": 4
                      }
                    }
                  ]
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
                        "index": 5
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
                  "id": "compassWidget",
                  "express": false,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "compassWidgetPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 4
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
              "type": "group",
              "id": "modify",
              "content": [
                {
                  "type": "setting",
                  "id": "basemapToggle",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapTogglePosition",
                      "defaultValue": {
                        "position": "bottom-right",
                        "index": 0
                      }
                    },
                    {
                      "type": "setting",
                      "id": "basemapSelector",
                      "express": false,
                      "defaultValue": null
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
                        "index": 1
                      }
                    },
                    {
                      "type": "setting",
                      "id": "visibilityIcon",
                      "express": false,
                      "defaultValue": "default"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "timeFilter",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "timeFilterPosition",
                      "defaultValue": {
                        "position": "bottom-right",
                        "index": 2
                      }
                    },
                    {
                      "type": "setting",
                      "id": "timeFilterConfig",
                      "express": false,
                      "defaultValue": null
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "enableHighlightColor",
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "highlightColor",
                      "express": false,
                      "defaultValue": "#00FFFF"
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
            }
          ]
        },
        {
          "type": "subsection",
          "id": "share",
          "content": [
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
                      "express": true,
                      "defaultValue": {
                        "position": "top-right",
                        "index": 3
                      }
                    }
                  ]
                }
              ]
            },
            {
              "type": "group",
              "id": "screenshot",
              "content": [
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
                        "index": 4
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
          "id": "search",
          "content": [
            {
              "type": "group",
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
                      "id": "searchOpenAtStart",
                      "defaultValue": false
                    },
                    {
                      "type": "setting",
                      "id": "searchPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 1
                      }
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
          "type": "subsection",
          "id": "customURLParams",
          "content": [
            {
              "type": "group",
              "id": "customURLParams",
              "content": [
                {
                  "type": "setting",
                  "id": "customURLParamName",
                  "express": false,
                  "defaultValue": ""
                },
                {
                  "type": "setting",
                  "id": "customUrlParam",
                  "express": false,
                  "config": {
                    "layerSelectionMode": "single",
                    "supportedLayerTypes": "*",
                    "supportedGeometryTypes": "*",
                    "supportsFieldSelection": true,
                    "fieldSelectionMode": "single",
                    "supportedFieldTypes": "*"
                  },
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
                  "config": {
                    "numOfSections": 1,
                    "singleFont": false
                  },
                  "defaultValue": null
                },
                {
                  "type": "setting",
                  "id": "customCSS",
                  "defaultValue": ""
                },
                {
                  "type": "setting",
                  "id": "interactiveLegendPosition",
                  "express": true,
                  "defaultValue": {
                    "position": "bottom-left",
                    "index": 0
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
              "type": "group",
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