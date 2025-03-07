export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "conditions": ["attachments"]
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
              "id": "appComprehension",
              "content": [
                {
                  "type": "setting",
                  "id": "title",
                  "express": true,
                  "defaultValue": ""
                },
                {
                  "type": "setting",
                  "id": "splash",
                  "express": true,
                  "defaultValue": false,
                  "content": [
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
                      "express": true,
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "legend",
                  "defaultValue": false,
                  "express": true
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
      "id": "attachments",
      "content": [
        {
          "type": "group",
          "id": "attachments",
          "content": [
            {
              "type": "setting",
              "id": "appLayout",
              "express": true,
              "config": {
                "branches": [
                  ["hideAttributePanel", "autoPlay"],
                  ["thumbnailFormat", "thumbnailHeight", "mapCentricTooltip"]
                ]
              },
              "content": [
                {
                  "type": "setting",
                  "id": "autoPlay",
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "autoPlayDuration",
                      "express": false,
                      "defaultValue": 5
                    }
                  ],
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "hideAttributePanel",
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "thumbnailFormat",
                  "defaultValue": "stretch"
                },
                {
                  "type": "setting",
                  "id": "thumbnailHeight",
                  "config": {
                    "min": 100,
                    "max": 500
                  },
                  "defaultValue": 200
                },
                {
                  "type": "setting",
                  "id": "mapCentricTooltip",
                  "defaultValue": false
                }
              ],
              "defaultValue": {
                "branchValue": "photo-centric",
                "branchOptionsFieldNames": []
              }
            },
            {
              "type": "setting",
              "id": "imageDirection",
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "address",
              "defaultValue": false,
              "express": true
            },
            {
              "type": "setting",
              "id": "onlyDisplayFeaturesWithAttachments",
              "defaultValue": false,
              "express": true
            },
            {
              "type": "setting",
              "id": "applyEffectToNonActiveLayers",
              "defaultValue": false,
              "express": false,
              "content": [
                {
                  "type": "setting",
                  "id": "nonActiveLayerEffects",
                  "express": false,
                  "defaultValue": {
                    "id": "muted-blur",
                    "data": {
                      "includedEffect": "",
                      "excludedEffect": "blur(3px) opacity(50%)"
                    }
                  }
                }
              ]
            },
            {
              "type": "setting",
              "id": "order",
              "defaultValue": "ASC"
            },
            {
              "type": "setting",
              "id": "attachmentLayers",
              "config": {
                "layerSelectionMode": "multiple",
                "supportedLayerTypes": "*",
                "supportedGeometryTypes": "*",
                "supportsFieldSelection": true,
                "fieldSelectionMode": "single",
                "supportedFieldTypes": "*"
              },
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "attachmentsAltText",
              "config": {
                "layerSelectionMode": "multiple",
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
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "fullScreen",
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "zoomLevel",
                  "defaultValue": 10000
                },
                {
                  "type": "setting",
                  "id": "imagePanZoom",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "locateWidget",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "keyboardShortcuts",
                  "express": true,
                  "defaultValue": false
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
                  "defaultValue": true
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
                  "id": "layerList",
                  "defaultValue": false,
                  "content": [
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
                  "id": "selectFeatures",
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "attributeEditing",
                  "defaultValue": false,
                  "express": false
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "filter",
          "content": [
            {
              "type": "setting",
              "id": "enableFilter",
              "express": false,
              "defaultValue": false,
              "content": [
                {
                  "type": "setting",
                  "id": "filterConfig",
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
                  "id": "download",
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
              "type": "setting",
              "id": "search",
              "express": true,
              "defaultValue": true,
              "content": [
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
              "type": "group",
              "id": "layout",
              "content": [
                {
                  "type": "setting",
                  "id": "mapToolsExpanded",
                  "defaultValue": true
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
            }
          ]
        }
      ]
    }
  ]
};