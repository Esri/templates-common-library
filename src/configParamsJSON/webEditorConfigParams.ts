export default {
  config: [
    {
      type: "section",
      id: "map"
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
                  id: "header",
                  express: true,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "title",
                      express: true,
                      defaultValue: ""
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
          express: false,
          content: [
            {
              type: "group",
              id: "selectableLayers",
              express: false,
              content: [
                {
                  type: "setting",
                  id: "webEditorSelectedLayers",
                  express: false,
                  defaultValue: true,
                  config: {
                    layerSelectionMode: "multiple",
                    supportedLayerTypes: ["feature"],
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
              express: false,
              content: [
                {
                  type: "setting",
                  id: "enableSelectByattributes",
                  defaultValue: true,
                  express: false
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
              id: "vertices",
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
              express: false
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
                  express: false
                },
                {
                  type: "setting",
                  id: "enableSnapping",
                  defaultValue: true,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "chooseLayersInSnapping",
                      defaultValue: true,
                      express: false,
                      config: {
                        layerSelectionMode: "multiple",
                        supportedLayerTypes: ["feature"],
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
              express: false,
              content: [
                {
                  type: "setting",
                  id: "showGridTools",
                  defaultValue: true,
                  express: false,
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
          id: "theme",
          content: [
            {
              type: "group",
              id: "headerTheme",
              content: [
                {
                  type: "setting",
                  id: "theme",
                  defaultValue: "light",
                  express: true
                },
                {
                  type: "setting",
                  id: "customTheme",
                  express: true,
                  config: {
                    numOfSections: 1,
                    headerOnly: true,
                    singleFont: true,
                    hideLogoScale: true
                  },
                  defaultValue: null
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
