export default {
  "config": [
    {
      "type": "section",
      "id": "portfolio",
      "content": [
        {
          "type": "group",
          "id": "portfolio",
          "content": [
            {
              "type": "setting",
              "id": "portfolioAppLayout",
              "express": true,
              "config": {
                "branches": [
                  ["header", "descOpenAtStart"],
                  ["descOpenAtStart"],
                  ["accordionSize"]
                ]
              },
              "content": [
                {
                  "type": "setting",
                  "id": "header",
                  "defaultValue": false,
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "descOpenAtStart",
                  "defaultValue": false,
                  "express": false
                },
                {
                  "type": "setting",
                  "id": "accordionSize",
                  "defaultValue": "small",
                  "express": false
                }
              ],
              "defaultValue": {
                "branchValue": "carousel"
              }
            },
            {
              "type": "setting",
              "id": "itemCollection",
              "express": true,
              "config": {
                "maxNumItems": 20,
                "disallowList": []
              },
              "defaultValue": []
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
                  "id": "title",
                  "defaultValue": "",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "splash",
                  "defaultValue": true,
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "splashTitle",
                      "defaultValue": "",
                      "express": false
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
                        "titleText": "",
                        "subtitleText": "",
                        "descriptionText": "",
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
              "id": "exploreNavigate",
              "content": [
                {
                  "type": "setting",
                  "id": "preload",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "autoPlay",
                  "express": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "enableAutoPlay",
                      "express": false,
                      "defaultValue": false
                    },
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
                  "id": "showSectionNavigationButtons",
                  "express": false,
                  "defaultValue": true
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "mapLocation",
          "content": [
            {
              "type": "group",
              "id": "mapLocation",
              "content": [
                {
                  "type": "setting",
                  "id": "portfolioLocation",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "searchLocationOpenAtStart",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "predefinedLocationEnabled",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "predefinedLocation",
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
          "id": "mapTools",
          "content": [
            {
              "type": "group",
              "id": "mapTools",
              "content": [
                {
                  "type": "setting",
                  "id": "home",
                  "defaultValue": true,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "homePosition",
                      "defaultValue": {
                        "index": 1,
                        "position": "top-left"
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "defaultValue": true,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "mapZoomPosition",
                      "defaultValue": {
                        "index": 1,
                        "position": "top-left"
                      }
                    }
                  ]
                },
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
                        "index": 3
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "legend",
                  "defaultValue": true,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "legendOpenAtStart",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "legendPosition",
                      "defaultValue": {
                        "index": 0,
                        "position": "bottom-left"
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "layerList",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "layerListOpenAtStart",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "layerListPosition",
                      "defaultValue": {
                        "index": 0,
                        "position": "bottom-right"
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
                  "id": "scalebar",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "scalebarPosition",
                      "defaultValue": {
                        "index": 1,
                        "position": "bottom-right"
                      }
                    },
                    {
                      "type": "setting",
                      "id": "scalebarDualMode",
                      "defaultValue": false,
                      "express": false
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "search",
                  "defaultValue": true,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "searchOpenAtStart",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "searchPosition",
                      "defaultValue": {
                        "index": 0,
                        "position": "top-right"
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
                        "index": 1
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "basemapGallery",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapGalleryConfig",
                      "express": false,
                      "defaultValue": null
                    },
                    {
                      "type": "setting",
                      "id": "basemapGalleryPosition",
                      "defaultValue": {
                        "position": "bottom-right",
                        "index": 2
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
          "id": "share",
          "content": [
            {
              "type": "group",
              "id": "share",
              "content": [
                {
                  "type": "setting",
                  "id": "print",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "printOpenAtStart",
                      "defaultValue": false,
                      "express": false
                    },
                    {
                      "type": "setting",
                      "id": "printPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 2
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "share",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "shareIncludeSocial",
                      "defaultValue": true,
                      "express": false
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
                  "defaultValue": "dark",
                  "express": true
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
          "id": "positionManagerPortfolio",
          "content": [
            {
              "type": "group",
              "id": "positionManagerPortfolio",
              "content": [
                {
                  "type": "setting",
                  "id": "positionManagerPortfolio",
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