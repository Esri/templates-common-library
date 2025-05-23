export default {
  "config": [
    {
      "type": "section",
      "id": "map",
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
      "id": "slider",
      "content": [
        {
          "type": "setting",
          "id": "sliderBranchingConditional",
          "express": true,
          "config": {
            "branches": [
              [
                "numericSliderConfig"
              ],
              [
                "timeLoop",
                "timeAutoplay",
                "dataSliderExcludedEffect",
                "dataSliderIncludedEffect",
                "dataSliderSpeed",
                "timeVisible",
                "dataSliderTimeModes",
                "dataSliderHideTicks",
                "liveData"
              ]
            ]
          },
          "content": [
            {
              "type": "setting",
              "id": "dataSliderExcludedEffect",
              "express": true,
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "numericSliderConfig",
              "express": true,
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "dataSliderSpeed",
              "express": true,
              "defaultValue": [
                2
              ]
            },
            {
              "type": "setting",
              "id": "timePosition",
              "defaultValue": {
                "position": "bottom-left",
                "index": 0
              }
            },
            {
              "type": "setting",
              "id": "timeLoop",
              "express": true,
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "timeAutoplay",
              "express": true,
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "dataSliderIncludedEffect",
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "timeVisible",
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "liveData",
              "defaultValue": false,
              "express": true,
              "content": [
                {
                  "type": "setting",
                  "id": "liveDataType",
                  "express": true,
                  "defaultValue": "forecast"
                },
                {
                  "type": "setting",
                  "id": "durationTime",
                  "express": true,
                  "defaultValue": 1,
                  "min": 0
                },
                {
                  "type": "setting",
                  "id": "snapTime",
                  "express": true,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "durationPeriod",
                  "express": true,
                  "defaultValue": "weeks"
                },
                {
                  "type": "setting",
                  "id": "timeInterval",
                  "express": true,
                  "defaultValue": 1,
                  "min": 0
                },
                {
                  "type": "setting",
                  "id": "timeIntervalUnits",
                  "express": true,
                  "defaultValue": "days"
                }
              ]
            },
            {
              "type": "setting",
              "id": "dataSliderTimeModes",
              "defaultValue": null,
              "express": true
            },
            {
              "type": "setting",
              "id": "dataSliderHideTicks",
              "defaultValue": false
            }
          ],
          "defaultValue": null
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
                  "express": true,
                  "defaultValue": true,
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
                      "id": "splashOnStart",
                      "defaultValue": true
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
                      "defaultValue": ""
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "infoPanel",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "infoPanelOpenAtStart",
                      "defaultValue": false
                    },
                    {
                      "type": "setting",
                      "id": "infoPanelPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 10
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "legend",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "legendConfig",
                      "express": false,
                      "defaultValue": {
                        "style": {
                          "type": "classic",
                          "layout": "stack"
                        }
                      }
                    },
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
                },
                {
                  "type": "setting",
                  "id": "landingPagePosition",
                  "defaultValue": {
                    "position": "top-right",
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
                  "id": "mapZoom",
                  "express": false,
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
                  "id": "bookmarks",
                  "express": false,
                  "defaultValue": false,
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
                },
                {
                  "type": "setting",
                  "id": "fullScreen",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "fullScreenPosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 0
                      }
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "disableScroll",
                  "defaultValue": false,
                  "express": false
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
                  "type": "setting",
                  "id": "popupHover",
                  "defaultValue": false
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
                      "id": "layerListPosition",
                      "defaultValue": {
                        "position": "top-right",
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
                },
                {
                  "type": "setting",
                  "id": "basemapToggle",
                  "defaultValue": false,
                  "express": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapTogglePosition",
                      "defaultValue": {
                        "position": "top-left",
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
                  "id": "enableFilter",
                  "express": false,
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "filterPosition",
                      "express": false,
                      "defaultValue": {
                        "position": "top-right",
                        "index": 10
                      }
                    },
                    {
                      "type": "setting",
                      "id": "filterConfig",
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
                    },
                    {
                      "type": "setting",
                      "id": "sharePosition",
                      "defaultValue": {
                        "position": "top-right",
                        "index": 10
                      }
                    }
                  ]
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
                        "position": "top-right",
                        "index": 10
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
              "type": "group",
              "id": "sliderTheme",
              "content": [
                {
                  "type": "setting",
                  "id": "dataSliderTheme",
                  "express": true,
                  "defaultValue": "light"
                },
                {
                  "type": "setting",
                  "id": "dataSliderOpacityToggle",
                  "express": true,
                  "defaultValue": false
                }
              ]
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
            },
            {
              "type": "group",
              "id": "additionalOptions",
              "content": [
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
          "id": "positionManager",
          "content": [
            {
              "type": "setting",
              "id": "dataSliderPositionOptions",
              "express": true,
              "defaultValue": "bottom"
            },
            {
              "type": "setting",
              "id": "positionManagerDataSlider",
              "express": true,
              "config": {
                "disabledDependentField": "dataSliderPositionOptions"
              },
              "defaultValue": null
            },
            {
              "type": "setting",
              "id": "openAtStartManager",
              "express": false,
              "defaultValue": null,
              "config": {
                "mobileSetting": true
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