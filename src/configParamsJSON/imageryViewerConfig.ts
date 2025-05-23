export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "conditions": ["imagery"]
      }
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
              "type": "setting",
              "id": "header",
              "express": true,
              "defaultValue": true,
              "content": [
                {
                  "type": "setting",
                  "id": "title",
                  "express": true,
                  "defaultValue": "",
                },
              ],
            },
            {
              "type": "setting",
              "id": "detailsTool",
              "express": true,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "introductionTitle",
                  "express": true,
                  "defaultValue": "",
                },
                {
                  "type": "setting",
                  "id": "detailsContent",
                  "express": true,
                  "defaultValue": null,
                },
                {
                  "type": "setting",
                  "id": "detailsOpenAtStart",
                  "express": true,
                  "defaultValue": false,
                },
                {
                  "type": "setting",
                  "id": "detailsToolPosition",
                  "defaultValue": {
                    "position": "bottom-right",
                    "index": 0,
                  },
                },
              ],
            },
            {
              "type": "setting",
              "id": "legend",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "legendPosition",
                  "defaultValue": {
                    "position": "bottom-left",
                    "index": 0,
                  },
                },
              ],
            },
            {
              "type": "group",
              "id": "mapA11y",
              "content": [
                {
                  "type": "setting",
                  "id": "mapA11yDesc",
                  "express": true,
                },
              ],
            },
          ],
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
                    "backgroundImageSrc": null,
                  },
                },
              ],
            },
          ],
        },
      ],
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
                  "express": false,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "homePosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 1
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
                  "id": "bookmarks",
                  "express": false,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "bookmarksPosition",
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
                        "index": 3
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
                        "position": "top-left"
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "disableScroll",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "scalebar",
                  "express": false,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "scalebarPosition",
                      "defaultValue": {
                        "position": "bottom-right",
                        "index": 0
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "coordinates",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "coordinatesPosition",
                      "defaultValue": {
                        "position": "bottom-left",
                        "index": 1
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "extentSelector",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "extentSelectorConfig",
                      "express": false,
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
          "id": "imageVisualization",
          "content": [
            {
              "type": "group",
              "id": "imageryViewer",
              "content": [
                {
                  "type": "setting",
                  "id": "rendering",
                  "express": true,
                  "defaultValue": true
                }
              ]
            },
            {
              "type": "group",
              "id": "imageMeasurement",
              "content": [
                {
                  "type": "setting",
                  "id": "imageMeasurement",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "areaUnit",
                      "defaultValue": "metric"
                    },
                    {
                      "type": "setting",
                      "id": "linearUnit",
                      "defaultValue": "metric"
                    },
                    {
                      "type": "setting",
                      "id": "imageMeasurementPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 5
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
          "id": "imageSearch",
          "content": [
            {
              "type": "setting",
              "id": "imageSelector",
              "defaultValue": false,
              "express": true,
              "content": [
                {
                  "type": "setting",
                  "id": "imageLayerSelector",
                  "express": true,
                  "config": {
                    "layerSelectionMode": "multiple",
                    "supportedLayerTypes": ["imagery", "imagery-tile"],
                    "supportedGeometryTypes": "*",
                    "supportsFieldSelection": true,
                    "fieldSelectionMode": "single",
                    "supportedFieldTypes": "*",
                    "isFieldSelectionRequired": true,
                    "excludeFields": ["Shape"]
                  },
                  "defaultValue": null
                },
                {
                  "type": "setting",
                  "id": "minimumZoom",
                  "express": false,
                  "defaultValue": 8
                },
                {
                  "type": "setting",
                  "id": "searchExtent",
                  "express": false,
                  "defaultValue": 15
                },
                {
                  "type": "setting",
                  "id": "listImageSeparately",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "autoRefresh",
                  "express": false,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "toggleFootprints",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "imageryDateRange",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "startDate",
                      "defaultValue": ""
                    },
                    {
                      "type": "setting",
                      "id": "endDate",
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "imageDate",
                  "express": false,
                  "config": {
                    "layerSelectionMode": "multiple",
                    "supportedLayerTypes": ["imagery", "imagery-tile"],
                    "supportedGeometryTypes": "*",
                    "supportsFieldSelection": true,
                    "fieldSelectionMode": "single",
                    "supportedFieldTypes": ["date"],
                    "isFieldSelectionRequired": true,
                    "excludeFields": ["Shape"]
                  },
                  "defaultValue": null
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
              "id": "swipe",
              "content": [
                {
                  "type": "setting",
                  "id": "swipe",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "swipeSingleLeadingLayer",
                      "express": true,
                      "config": {
                        "layerSelectionMode": "single",
                        "supportedLayerTypes": ["imagery", "imagery-tile"],
                        "supportedGeometryTypes": "*",
                        "supportsFieldSelection": false
                      },
                      "defaultValue": null
                    },
                    {
                      "type": "setting",
                      "id": "swipeSingleTrailingLayer",
                      "express": true,
                      "config": {
                        "layerSelectionMode": "single",
                        "supportedLayerTypes": ["imagery", "imagery-tile"],
                        "supportedGeometryTypes": "*",
                        "supportsFieldSelection": false
                      },
                      "defaultValue": null
                    },
                    {
                      "type": "setting",
                      "id": "swipeDirection",
                      "defaultValue": "horizontal"
                    },
                    {
                      "type": "setting",
                      "id": "swipePercentage",
                      "express": false,
                      "defaultValue": 35
                    }
                  ]
                }
              ]
            },
            {
              "type": "group",
              "id": "additionalTools",
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
                        "position": "top-right",
                        "index": 2
                      }
                    },
                    {
                      "type": "setting",
                      "id": "nextBasemap",
                      "defaultValue": "topo-vector"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "featureLayerList",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "featureLayerListPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 0
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
                  "id": "editPanel",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "editPanelPosition",
                      "defaultValue": "top-left"
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
              "type": "setting",
              "id": "search",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "searchPosition",
                  "defaultValue": "top-right"
                },
                {
                  "type": "setting",
                  "id": "searchOpenAtStart",
                  "express": false,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "searchConfiguration",
                  "express": false,
                  "defaultValue": null
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
                  "express": true,
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "sharePosition",
                      "defaultValue": "top-right"
                    }
                  ]
                }
              ]
            },
            {
              "type": "group",
              "id": "imagerySharing",
              "content": [
                {
                  "type": "setting",
                  "id": "exportImagery",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "exportImageryPosition",
                      "express": true,
                      "defaultValue": "top-right"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "shareWithOrg",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "shareWithOrgPosition",
                      "express": true,
                      "defaultValue": "top-right"
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
                "singleFont": false
              }
            },
            {
              "type": "setting",
              "id": "customCSS",
              "defaultValue": ""
            },
            {
              "type": "setting",
              "id": "imageryViewerPosition",
              "express": true,
              "defaultValue": {
                "position": "bottom-left",
                "index": 0
              }
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
    }
  ]
};
