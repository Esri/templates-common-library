export default {
  "config": [
    {
      "type": "section",
      "id": "manager",
      "content": [
        {
          "type": "setting",
          "id": "mapItemCollection",
          "express": true,
          "config": {
            "maxNumItems": 20
          }
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
                      "id": "title",
                      "express": true,
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "customInfoText",
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "legend",
                  "defaultValue": true,
                  "express": true
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "coverPageOrSplash",
          "content": [
            {
              "type": "setting",
              "id": "enableSplashOrCover",
              "content": [
                {
                  "type": "setting",
                  "id": "splashModeType",
                  "config": {
                    "branches": [
                      [
                        "landingPageConfig"
                      ],
                      [
                        "splashTitle",
                        "splashContent",
                        "splashButtonText",
                        "splashIsOpen"
                      ]
                    ]
                  },
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
                    },
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
                      "defaultValue": "Enter"
                    }
                  ],
                  "defaultValue": {
                    "branchValue": "cover-page",
                    "branchOptionsFieldNames": []
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
                  "id": "home",
                  "defaultValue": true,
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "defaultValue": true,
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "fullScreen",
                  "express": false,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "zoomToScale",
                  "express": false,
                  "defaultValue": 10000
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
                  "id": "basemapGallery",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapGalleryConfig",
                      "express": false,
                      "defaultValue": null
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "exportCSV",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "floorFilter",
                  "defaultValue": false,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "filterPanel",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "expandFilters",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "mapItemFilterConfig",
                      "express": false,
                      "defaultValue": null,
                      "config": {
                        "mapsFieldName": "mapItemCollection"
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
          "id": "layerOptions",
          "content": [
            {
              "type": "group",
              "id": "tableVisibility",
              "express": false,
              "content": [
                {
                  "type": "setting",
                  "id": "mapItemLayerSelector",
                  "express": false,
                  "config": {
                    "layerSelectionMode": "none",
                    "mapsFieldName": "mapItemCollection",
                    "supportedCapabilityTypes": [
                      "editable"
                    ],
                    "supportedGeometryTypes": "*",
                    "supportedLayerTypes": [
                      "feature",
                      "group"
                    ],
                    "supportsFieldSelection": true,
                    "fieldSelectionMode": "multiple",
                    "honorMapFieldSettings": true,
                    "dragEnabled": true,
                    "selectAllEnabled": true
                  },
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
                  "defaultValue": false,
                  "express": true
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
                "singleFont": false,
                "numOfSections": 2
              }
            }
          ]
        },
        {
          "type": "subsection",
          "id": "layout",
          "content": [
            {
              "type": "setting",
              "id": "appLayout",
              "express": true,
              "defaultValue": null
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
    }
  ]
};