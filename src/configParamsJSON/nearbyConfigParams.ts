export default {
  config: [
    {
      type: "section",
      id: "map",
      config: {
        conditions: ["popupDisabled"],
      },
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
              defaultValue: null,
            },
          ],
          defaultValue: false,
        },
      ],
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
                  express: true,
                  defaultValue: "",
                },
                {
                  type: "setting",
                  id: "titleLink",
                  express: false,
                  defaultValue: "",
                },
              ],
            },
            {
              type: "setting",
              id: "header",
              defaultValue: true,
              express: false,
            },
            {
              type: "setting",
              id: "legend",
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "legendPosition",
                  defaultValue: {
                    position: "top-right",
                    index: 0,
                  },
                },
                {
                  type: "setting",
                  id: "legendOpenAtStart",
                  defaultValue: false,
                },
              ],
            },
            {
              type: "group",
              id: "appComprehension",
              content: [
                {
                  type: "setting",
                  id: "showIntroduction",
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "introductionTitle",
                      express: true,
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "introductionContent",
                      express: true,
                      defaultValue:
                        "Search to learn more about a location and its surrounding area.</br> Use one of the following search methods: <ul><li>Click the search box and type in an address or choose <b>Use current location </b></li><li>Click within the map <div></div></li></ul></br> Results will include information about features of interest.",
                      config: {
                        imageUpload: true,
                      },
                    },
                    {
                      type: "setting",
                      id: "infoAsModal",
                      express: false,
                      defaultValue: false,
                      content: [
                        {
                          type: "setting",
                          id: "splashButtonText",
                          defaultValue: "",
                        },
                      ],
                    },
                    {
                      type: "setting",
                      id: "infoIncludeLocation",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                  defaultValue: true,
                },
              ],
            },
            {
              type: "group",
              id: "mapA11y",
              content: [
                {
                  type: "setting",
                  id: "mapA11yDesc",
                  express: true,
                },
                {
                  type: "setting",
                  id: "keyboardShortcuts",
                  express: true,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "keyboardShortcutsPosition",
                      defaultValue: {
                        position: "top-left",
                        index: 0,
                      },
                    },
                  ],
                },
              ],
            },
          ],
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
                        backgroundImageSrc: null,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      id: "nearby",
      content: [
        {
          type: "subsection",
          id: "searchMode",
          content: [
            {
              type: "setting",
              id: "lookupLayers",
              express: true,
              config: {
                layerSelectionMode: "multiple",
                supportedLayerTypes: [
                  "map-image",
                  "feature",
                  "group",
                  "csv",
                  "geojson",
                ],
                supportedGeometryTypes: "*",
                supportsFieldSelection: false,
              },
              defaultValue: null,
            },
            {
              type: "setting",
              id: "searchUnits",
              express: true,
              defaultValue: "kilometers",
            },
            {
              type: "setting",
              id: "enableBufferSearch",
              express: true,
              config: {
                branches: [
                  ["showAll", "enableSearchScale"],
                  [
                    "sliderRange",
                    "precision",
                    "inputsEnabled",
                    "mapClickLocation",
                    "enableBufferColor",
                    "enableSearchScale",
                    "startupLocation",
                    "hideMap",
                  ],
                ],
              },
              content: [
                {
                  type: "setting",
                  id: "sliderRange",
                  express: true,
                  defaultValue: {
                    default: 1,
                    minimum: 0,
                    maximum: 2,
                  },
                  config: {
                    defaultMinValue: 0,
                    defaultMaxValue: 2,
                    absoluteMinVal: 0,
                    includeDefaultValInput: true,
                    defaultDefaultVal: 1,
                  },
                },
                {
                  type: "setting",
                  id: "mapClickLocation",
                  defaultValue: false,
                  express: false,
                },
                {
                  type: "setting",
                  id: "hideMap",
                  defaultValue: false,
                  express: false,
                },
                {
                  type: "setting",
                  id: "precision",
                  express: false,
                  defaultValue: 1,
                },
                {
                  type: "setting",
                  id: "inputsEnabled",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "enableBufferColor",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "bufferColor",
                      express: false,
                      defaultValue: null,
                    },
                    {
                      type: "setting",
                      id: "bufferTransparency",
                      express: false,
                      defaultValue: 30,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "enableSearchScale",
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "searchScale",
                      express: false,
                      defaultValue: 10000,
                    },
                  ],
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "showAll",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "startupLocation",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                },
              ],
              defaultValue: {
                branchValue: "search-extent",
                branchOptionsFieldNames: [],
              },
            },
          ],
        },
        {
          type: "subsection",
          id: "nearbyResults",
          content: [
            {
              type: "setting",
              id: "mapPin",
              express: false,
              content: [
                {
                  type: "setting",
                  id: "mapPinIcon",
                  defaultValue: "esri-pin-1",
                  express: false,
                },
                {
                  type: "setting",
                  id: "mapPinColor",
                  express: false,
                  defaultValue: null,
                },
                {
                  type: "setting",
                  id: "mapPinSize",
                  express: false,
                  defaultValue: 24,
                },
              ],
              defaultValue: true,
            },
            {
              type: "setting",
              id: "mapPinLabel",
              express: false,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "mapPinLabelColor",
                  express: false,
                  defaultValue: null,
                },
                {
                  type: "setting",
                  id: "mapPinLabelSize",
                  express: false,
                  defaultValue: 12,
                },
              ],
            },
            {
              type: "group",
              id: "mapOptions",
              content: [
                {
                  type: "setting",
                  id: "applyLayerEffects",
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "presetLayerEffects",
                      express: true,
                      defaultValue: {
                        id: "lift-1",
                        data: {
                          includedEffect: "drop-shadow(4px, 4px, 4px, #000000)",
                          excludedEffect: "",
                        },
                      },
                    },
                  ],
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "hideLayers",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "interactiveResults",
                  express: false,
                  defaultValue: true,
                },
              ],
            },
            {
              type: "group",
              id: "popupBehavior",
              content: [
                {
                  type: "setting",
                  id: "showNonResultPopups",
                  express: false,
                  defaultValue: true,
                },
                {
                  type: "setting",
                  id: "showPopupsOnZoom",
                  express: false,
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "nearbyPanelResults",
          content: [
            {
              type: "group",
              id: "panelOptions",
              content: [
                {
                  type: "setting",
                  id: "groupResultsByLayer",
                  express: false,
                  defaultValue: true,
                },
                {
                  type: "setting",
                  id: "collapseIndividualResults",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "openRelatedRecords",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "restrictNumResults",
                  express: false,
                },
              ],
            },
            {
              type: "group",
              id: "addOns",
              content: [
                {
                  type: "setting",
                  id: "includeDistance",
                  express: false,
                  defaultValue: true,
                },
                {
                  type: "setting",
                  id: "showElevationProfile",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "showDirections",
                  express: true,
                  defaultValue: false,
                  config: {
                    proxy: ["route"],
                  },
                  content: [
                    {
                      type: "setting",
                      id: "directionsLayers",
                      express: false,
                      config: {
                        layerSelectionMode: "multiple",
                        supportedLayerTypes: [
                          "map-image",
                          "feature",
                          "group",
                          "csv",
                          "geojson",
                        ],
                        supportedGeometryTypes: ["esriGeometryPoint"],
                        supportsFieldSelection: false,
                      },
                      defaultValue: null,
                    },
                    {
                      type: "setting",
                      id: "directionsUnit",
                      defaultValue: "metric",
                      express: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "filter",
          content: [
            {
              type: "setting",
              id: "enableFilter",
              express: false,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "filterConfig",
                  express: false,
                  defaultValue: null,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "exportShareResults",
          content: [
            {
              type: "setting",
              id: "shareSelected",
              express: false,
              defaultValue: false,
            },
            {
              type: "setting",
              id: "exportToPDF",
              express: true,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "exportButtonIcon",
                  express: false,
                  defaultValue: "export",
                  config: {
                    iconList: [
                      "export",
                      "file-pdf",
                      "print",
                      "print-preview",
                      "images",
                    ],
                  },
                },
              ],
            },
            {
              type: "setting",
              id: "exportCSV",
              express: false,
              defaultValue: false,
            },
          ],
        },
        {
          type: "subsection",
          id: "resultsText",
          content: [
            {
              type: "setting",
              id: "noResultsMessage",
              config: {
                imageUpload: true,
              },
              defaultValue: "No results found that meet the search criteria",
              express: true,
            },
            {
              type: "setting",
              id: "resultsPanelPreText",
              config: {
                imageUpload: true,
              },
              express: false,
              defaultValue: null,
            },
            {
              type: "setting",
              id: "resultsPanelPostText",
              config: {
                imageUpload: true,
              },
              express: false,
              defaultValue: null,
            },
          ],
        },
      ],
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
                  id: "scalebar",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "scalebarPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "scalebarDualMode",
                      defaultValue: false,
                      express: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "mapZoom",
                  express: false,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "mapZoomPosition",
                      express: false,
                      defaultValue: {
                        position: "top-right",
                        index: 1,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "home",
                  express: false,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "homePosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                  ],
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
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "compassWidget",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "compassWidgetPosition",
                      defaultValue: {
                        position: "top-left",
                        index: 1,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "locateWidget",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "locateWidgetPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "bookmarks",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "bookmarksPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 1,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "measureDistance",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "measureDistancePosition",
                      defaultValue: "top-right",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "modify",
          content: [
            {
              type: "group",
              id: "modify",
              content: [
                {
                  type: "setting",
                  id: "enableHighlightColor",
                  defaultValue: false,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "highlightColor",
                      config: {
                        alpha: true,
                      },
                      express: false,
                      defaultValue: "rgba(0, 255, 255, 0.50)",
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "enableHighlightHaloColor",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "highlightHaloColor",
                      express: false,
                      defaultValue: "#00FFFF",
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "layerList",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "layerListOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "visibilityIcon",
                      express: false,
                      defaultValue: "default",
                    },
                    {
                      type: "setting",
                      id: "layerListAddZoom",
                      defaultValue: false,
                      express: false,
                    },
                    {
                      type: "setting",
                      id: "layerListLegend",
                      defaultValue: false,
                      express: false,
                    },
                    {
                      type: "setting",
                      id: "layerListPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "basemapToggle",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "basemapTogglePosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "basemapSelector",
                      express: false,
                      defaultValue: "streets-vector",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "share",
          content: [
            {
              type: "group",
              id: "share",
              content: [
                {
                  type: "setting",
                  defaultValue: true,
                  express: true,
                  id: "share",
                  content: [
                    {
                      type: "setting",
                      id: "sharePosition",
                      defaultValue: "top-right",
                    },
                    {
                      type: "setting",
                      id: "shareIncludeEmbed",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "shareIncludeSocial",
                      defaultValue: true,
                      express: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "search",
          content: [
            {
              type: "setting",
              id: "searchConfiguration",
              express: true,
              defaultValue: null,
            },
          ],
        },
      ],
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
              id: "theme",
              content: [
                {
                  type: "setting",
                  id: "theme",
                  defaultValue: "light",
                  express: true,
                },
                {
                  type: "setting",
                  id: "customTheme",
                  express: true,
                  config: {
                    numOfSections: 3,
                    singleFont: true,
                  },
                  defaultValue: null,
                },
                {
                  type: "setting",
                  id: "customCSS",
                  defaultValue: "",
                },
              ],
            },
          ],
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
                  defaultValue: null,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "layout",
          content: [
            {
              type: "group",
              id: "layout",
              content: [
                {
                  type: "setting",
                  id: "panelSize",
                  express: false,
                  defaultValue: "m",
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "positionManager",
          content: [
            {
              type: "setting",
              id: "positionManager",
              express: true,
              defaultValue: null,
            },
          ],
        },
      ],
    },
    {
      type: "section",
      id: "languageSwitcher",
      express: true,
      content: [
        {
          type: "setting",
          id: "languageSwitcher",
          defaultValue: false,
          express: true,
          content: [
            {
              type: "setting",
              id: "languageSwitcherOpenAtStart",
              express: false,
              defaultValue: false,
            },
            {
              type: "setting",
              id: "languageSwitcherConfig",
              express: true,
              defaultValue: null,
            },
            {
              type: "setting",
              id: "languageSwitcherPosition",
              defaultValue: {
                position: "top-right",
                index: 0,
              },
            },
          ],
        },
      ],
    },
  ],
};
