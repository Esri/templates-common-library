export default {
  "config": [
    {
      "type": "section",
      "id": "compare",
      "content": [
        {
          "type": "group",
          "id": "compare",
          "content": [
            {
              "type": "setting",
              "id": "compareConfig",
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
                      "id": "title",
                      "express": true,
                      "defaultValue": ""
                    },
                    {
                      "type": "setting",
                      "id": "titleLink",
                      "express": false,
                      "defaultValue": ""
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
                  "defaultValue": "",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "keyboardShortcuts",
                  "express": true,
                  "defaultValue": false
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
        },
        {
          "type": "subsection",
          "id": "featureComprehension",
          "content": [
            {
              "type": "group",
              "id": "featureComprehension",
              "content": [
                {
                  "type": "setting",
                  "id": "legend",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "legendPosition",
                      "defaultValue": {
                        "position": "bottom-left",
                        "index": 2
                      }
                    },
                    {
                      "type": "setting",
                      "id": "legendOpenAtStart",
                      "express": true,
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
                        "index": 1
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "home",
                  "express": true,
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
                  "id": "locateWidget",
                  "express": true,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "locateWidgetPosition",
                      "defaultValue": {
                        "position": "top-left",
                        "index": 3
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "scalebar",
                  "express": true,
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
                },
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
                        "index": 1
                      }
                    },
                    {
                      "type": "setting",
                      "id": "basemapSelector",
                      "defaultValue": "streets-vector"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "compareOptions",
          "content": [
            {
              "type": "setting",
              "id": "compareLayout",
              "defaultValue": "side-by-side",
              "express": true
            },
            {
              "type": "setting",
              "id": "compareBorder",
              "defaultValue": "1px",
              "express": false
            },
            {
              "type": "setting",
              "id": "expandMap",
              "defaultValue": false,
              "express": true,
              "content": [
                {
                  "type": "setting",
                  "id": "expandMapPosition",
                  "defaultValue": {
                    "position": "top-left",
                    "index": 10
                  }
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
                  "express": false,
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
              "id": "descriptiveTextBtnPosition",
              "defaultValue": {
                "position": "top-left",
                "index": 11
              }
            },
            {
              "type": "setting",
              "id": "layerListPosition",
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
            }
          ]
        }
      ]
    }
  ]
};