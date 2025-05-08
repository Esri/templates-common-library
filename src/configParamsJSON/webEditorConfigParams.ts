{
  config: [
    {
      type: "section",
      id: "map",
      content: [
        {
          type: "setting",
          id: "mapArea",
          express: false,
          content: [
            {
              type: "setting",
              id: "mapAreaConfig",
              express: false,
              defaultValue: null
            }
          ],
          defaultValue: false
        }
      ]
    },
    {
      type: "section",
      id: "about",
      content: [
        {
          type: "subsection",
          id: "appComprehension",
          content: [
            {
              type: "group",
              id: "appComprehension",
              content: [
                {
                  type: "setting",
                  id: "title",
                  defaultValue: "",
                  express: true
                },
                {
                  type: "setting",
                  id: "customHeader",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "customHeaderHTML",
                      defaultValue: "",
                      config: {
                        imageUpload: true
                      }
                    }
                  ]
                },
                {
                  type: "setting",
                  id: "splash",
                  express: true,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "splashButtonText",
                      defaultValue: ""
                    },
                    {
                      type: "setting",
                      id: "splashButtonPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 1
                      }
                    },
                    {
                      type: "setting",
                      id: "splashButtonIcon",
                      express: true,
                      defaultValue: "information",
                      config: {
                        iconList: [
                          "information",
                          "information-f",
                          "information-letter",
                          "lightbulb",
                          "question",
                          "question-f",
                          "question-mark"
                        ]
                      }
                    },
                    {
                      type: "setting",
                      id: "splashTitle",
                      express: true,
                      defaultValue: ""
                    },
                    {
                      type: "setting",
                      id: "splashContent",
                      express: true,
                      defaultValue: "",
                      config: {
                        imageUpload: true
                      }
                    }
                  ]
                }
              ]
            },
            {
              type: "group",
              id: "mapA11y",
              content: [
                {
                  type: "setting",
                  id: "mapA11yDesc",
                  express: true
                }
              ]
            }
          ]
        },
        {
          type: "subsection",
          id: "coverPageSettings",
          content: [
            {
              type: "group",
              id: "coverPage",
              content: [
                {
                  type: "setting",
                  id: "landingPage",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "landingPageConfig",
                      express: false,
                      defaultValue: {
                        titleText: "",
                        subtitleText: "",
                        descriptionText: "",
                        entryButtonText: "",
                        alignment: "center",
                        backgroundType: "color",
                        textColor: "#FFFFFF",
                        entryButtonColor: "#0079C1",
                        backgroundColor: "#0079C1",
                        iconImage: null,
                        iconImageScale: "m",
                        backgroundImageSrc: null
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
      type: "section",
      id: "editing",
      express: true,
      content: [
        {
          type: "subsection",
          id: "selection",
          express: true,
          content: [
            {
              type: "group",
              id: "selectableLayers",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "webEditorSelectedLayers",
                  express: true,
                  defaultValue: true,
                  config: {
                    layerSelectionMode: "multiple",
                    supportedLayerTypes: "*",
                    supportedGeometryTypes: "*",
                    selectAllEnabled: true
                  }
                },
                {
                  type: "setting",
                  id: "allowUserControlSelectableLayers",
                  defaultValue: true,
                  express: false
                }
              ]
            },
            {
              type: "group",
              id: "selectByAttributes",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "enableSelectByattributes",
                  defaultValue: true,
                  express: true
                }
              ]
            }
          ]
        },
        {
          type: "subsection",
          id: "tools",
          express: true,
          content: [
            {
              type: "setting",
              id: "create",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "move",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "verticies",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "split",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "reshape",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "merge",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "deleteButton",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "copyPaste",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "undoRedo",
              defaultValue: true,
              express: true
            }
          ]
        },
        {
          type: "subsection",
          id: "snapping",
          content: [
            {
              type: "group",
              id: "snappingOptions",
              content: [
                {
                  type: "setting",
                  id: "enableTooltips",
                  defaultValue: true,
                  express: true
                },
                {
                  type: "setting",
                  id: "enableSnapping",
                  defaultValue: true,
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "enableUserControlSnappingGeomertyFeaures",
                      defaultValue: true,
                      express: false
                    },
                    {
                      type: "setting",
                      id: "chooseLayersInSnapping",
                      defaultValue: true,
                      express: true,
                      config: {
                        layerSelectionMode: "multiple",
                        supportedLayerTypes: "*",
                        supportedGeometryTypes: "*",
                        selectAllEnabled: true
                      }
                    },
                    {
                      type: "setting",
                      id: "enableUserControlSnappingLayers",
                      defaultValue: true,
                      express: false
                    }
                  ]
                }
              ]
            },
            {
              type: "group",
              id: "gridTools",
              defaultValue: true,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "showGridTools",
                  defaultValue: true,
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "showGridToolsPosition",
                      express: false,
                      defaultValue: {
                        position: "bottom-right",
                        index: 0
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
      type: "section",
      id: "interactivity",
      content: [
        {
          type: "subsection",
          id: "exploreNavigate",
          content: [
            {
              type: "group",
              id: "explore",
              content: [
                {
                  type: "setting",
                  id: "home",
                  defaultValue: true,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "homePosition",
                      express: false,
                      defaultValue: {
                        position: "bottom-right",
                        index: 1
                      }
                    }
                  ]
                },
                {
                  type: "setting",
                  id: "mapZoom",
                  defaultValue: true,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "mapZoomPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 2
                      }
                    }
                  ]
                },
                {
                  type: "setting",
                  id: "fullScreen",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "fullScreenPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "subsection",
          id: "search",
          content: [
            {
              type: "setting",
              id: "search",
              express: true,
              defaultValue: true,
              content: [
                {
                  type: "setting",
                  id: "searchOpenAtStart",
                  express: true,
                  defaultValue: true
                },
                {
                  type: "setting",
                  id: "searchConfiguration",
                  express: true,
                  defaultValue: null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "section",
      id: "sidebar",
      content: [
        {
          type: "subsection",
          id: "sidebarContent",
          content: [
            {
              type: "setting",
              id: "sidebarExpanded",
              express: true,
              defaultValue: false
            },
            {
              type: "setting",
              id: "webEditorLayerListPanel",
              defaultValue: false,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "layerListAddZoom",
                  defaultValue: false,
                  express: false
                },
                {
                  type: "setting",
                  id: "layerListAddTable",
                  defaultValue: false,
                  express: false
                }
              ]
            },
            {
              type: "setting",
              id: "showTablesPane",
              defaultValue: false,
              express: true
            },
            {
              type: "setting",
              id: "webEditorBasemapGallery",
              express: false,
              defaultValue: true,
              content: [
                {
                  type: "setting",
                  id: "basemapGalleryConfig",
                  express: false,
                  defaultValue: null
                }
              ]
            },
            {
              type: "setting",
              id: "webEditorLegendPanel",
              defaultValue: true,
              express: true
            },
            {
              type: "setting",
              id: "bookmarksPanel",
              express: true,
              defaultValue: false
            },
            {
              type: "setting",
              id: "showShortcutsPanel",
              express: true,
              default: true
            }
          ]
        },
        {
          type: "subsection",
          id: "settings",
          content: [
            {
              type: "setting",
              id: "showSettingsPanel",
              express: true,
              defaultValue: true,
              content: [
                {
                  type: "setting",
                  id: "allowUserContolEditingSettings",
                  express: false,
                  defaultValue: true
                },
                {
                  type: "setting",
                  id: "showDPad",
                  express: false,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "dPadPosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0
                      }
                    },
                    {
                      type: "setting",
                      id: "mapRotation",
                      express: false,
                      defaultValue: true
                    }
                  ]
                },
                {
                  type: "setting",
                  id: "showAttributesPaneWhenCreatingFeatures",
                  defaultValue: true,
                  express: false
                },
                {
                  type: "setting",
                  id: "showDeleteFeatures",
                  defaultValue: true,
                  express: false
                },
                {
                  type: "setting",
                  id: "setDefaultUnits",
                  defaultValue: true,
                  express: false
                },
                {
                  type: "setting",
                  id: "showShortcutKeysOnTooltips",
                  defaultValue: true,
                  express: false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "section",
      id: "themeLayout",
      content: [
        {
          type: "subsection",
          id: "layout",
          content: [
            {
              type: "setting",
              id: "panelSize",
              express: false,
              defaultValue: "m"
            }
          ]
        },
        {
          type: "subsection",
          id: "theme",
          content: [
            {
              type: "group",
              id: "theme",
              content: [
                {
                  type: "setting",
                  id: "theme",
                  defaultValue: "dark",
                  express: true
                },
                {
                  type: "setting",
                  id: "customTheme",
                  express: true,
                  defaultValue: null,
                  config: {
                    singleFont: false
                  }
                },
                {
                  type: "group",
                  id: "additionalOptions",
                  content: [
                    {
                      type: "setting",
                      id: "customCSS",
                      defaultValue: ""
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: "subsection",
          id: "logo",
          content: [
            {
              type: "group",
              id: "logo",
              content: [
                {
                  type: "setting",
                  id: "logo",
                  express: false,
                  defaultValue: null
                }
              ]
            }
          ]
        },
        {
          type: "subsection",
          id: "positionManager",
          content: [
            {
              type: "setting",
              id: "positionManager",
              express: true,
              defaultValue: null
            }
          ]
        }
      ]
    }
  ]
}