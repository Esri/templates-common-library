export default {
  "config": [
    {
      "type": "section",
      "id": "map",
      "config": {
        "itemTypes": ["3d"]
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
                  "defaultValue": "Enter"
                }
              ]
            },
            {
              "type": "setting",
              "id": "legend",
              "defaultValue": true
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
        }
      ]
    },
    {
      "type": "section",
      "id": "filterData",
      "content": [
        {
          "type": "setting",
          "id": "scoreboardItems",
          "express": true
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
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "mapZoom",
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "slides",
                  "express": true,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "locateWidget",
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "measure",
                  "defaultValue": false
                }
              ]
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
                  "express": true,
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
                  "id": "basemapGallery",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapGalleryConfig",
                      "defaultValue": null
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "daylight",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "daylightDate",
                      "express": false,
                      "defaultValue": ""
                    },
                    {
                      "type": "setting",
                      "id": "daylightTime",
                      "express": false,
                      "defaultValue": ""
                    }
                  ]
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
          "id": "time",
          "content": [
            {
              "type": "setting",
              "id": "timeFilter",
              "defaultValue": false,
              "express": false,
              "content": [
                {
                  "type": "setting",
                  "id": "timeFilterOpenAtStart",
                  "express": false,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "timeFilterConfig",
                  "express": false,
                  "defaultValue": null
                },
                {
                  "type": "setting",
                  "id": "timeLoop",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "autoPlayTimeSlider",
                  "express": false,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "dataSliderSpeed",
                  "express": true,
                  "defaultValue": [2]
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
                  "id": "socialShare",
                  "defaultValue": false,
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
                    "singleFont": false
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
                  "defaultValue": null
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "layout",
          "content": [
            {
              "type": "group",
              "id": "scoreboard",
              "content": [
                {
                  "type": "setting",
                  "id": "scoreboardPosition",
                  "defaultValue": "bottom",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "scoreboardMode",
                  "defaultValue": "floating"
                }
              ]
            },
            {
              "type": "group",
              "id": "toolbar",
              "content": [
                {
                  "type": "setting",
                  "id": "toolbarPosition",
                  "defaultValue": "left"
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