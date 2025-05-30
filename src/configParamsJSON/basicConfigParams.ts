export default {
  config: [
    {
      type: "section",
      id: "map",
      config: {
        itemTypes: ["2d", "3d", "weblinkchart"],
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
                  id: "splash",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "splashTitle",
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "splashContent",
                      defaultValue: "",
                      config: {
                        imageUpload: true,
                      },
                    },
                    {
                      type: "setting",
                      id: "splashButtonText",
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "splashButtonPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "info",
                      defaultValue: false,
                      express: false,
                      content: [
                        {
                          type: "setting",
                          id: "detailsOpenAtStart",
                          express: false,
                          defaultValue: false,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "legend",
                  defaultValue: true,
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "legendPosition",
                      express: false,
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "legendConfig",
                      express: false,
                      defaultValue: {
                        style: {
                          type: "card",
                          layout: "stack",
                        },
                      },
                    },
                    {
                      type: "setting",
                      id: "legendOpenAtStart",
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
            {
              type: "setting",
              id: "header",
              defaultValue: false,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "title",
                  express: true,
                  defaultValue: "",
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
                        imageUpload: true,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "customHeaderPositionedAtBottom",
                  defaultValue: false,
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
                  id: "overviewMap",
                  defaultValue: false,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "overviewMapPosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "overviewMapBasemap",
                      express: false,
                      defaultValue: null,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "magnifier",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "magnifierPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "popupHover",
                  express: true,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "popupFixed",
                  express: true,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "popupFixedPosition",
                      express: true,
                      defaultValue: "bottom-right",
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "elevationProfile",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "elevationProfilePosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "elevationProfileUnits",
                      defaultValue: "imperial",
                    },
                    {
                      type: "setting",
                      id: "elevationProfileOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "dockElevationProfile",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "showElevationProfile",
                  express: false,
                  defaultValue: false,
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
                  id: "mapZoom",
                  express: false,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "mapZoomPosition",
                      defaultValue: {
                        position: "top-left",
                        index: 0,
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
                        position: "top-left",
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
                  id: "measure",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "measurePosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "measureOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "coordinateFormats",
                      express: false,
                      defaultValue: "xy",
                    },
                    {
                      type: "setting",
                      id: "measureAreaUnit",
                      express: false,
                    },
                    {
                      type: "setting",
                      id: "measureLinearUnit",
                      express: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "floorFilter",
                  defaultValue: false,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "floorFilterPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "group",
              id: "navigate",
              content: [
                {
                  type: "setting",
                  id: "disableScroll",
                  defaultValue: false,
                  express: true,
                },
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
                        position: "bottom-left",
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
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "modify",
          content: [
            {
              type: "setting",
              id: "enableHighlightColor",
              express: false,
              content: [
                {
                  type: "setting",
                  id: "highlightColor",
                  express: false,
                  defaultValue: "rgba(0, 255, 255, 1)",
                  config: {
                    alpha: true,
                  },
                },
              ],
            },
            {
              type: "setting",
              id: "enableHighlightHaloColor",
              express: false,
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
                  defaultValue: "streets-vector",
                },
              ],
            },
            {
              type: "setting",
              id: "sketchTools",
              express: false,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "sketchToolsPosition",
                  defaultValue: {
                    position: "top-right",
                    index: 0,
                  },
                },
                {
                  type: "setting",
                  id: "sketchMarkerColor",
                  defaultValue: "#fff",
                },
                {
                  type: "setting",
                  id: "sketchMarkerPin",
                  defaultValue: "esri-pin-1",
                },
                {
                  type: "setting",
                  id: "sketchOutlineColor",
                  defaultValue: "#323232",
                },
                {
                  type: "setting",
                  id: "sketchFillColor",
                  defaultValue: "#828282",
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
                  id: "layerListPosition",
                  defaultValue: {
                    position: "bottom-right",
                    index: 0,
                  },
                },
                {
                  type: "setting",
                  id: "layerListOpenAtStart",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "layerListAddTable",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "visibilityIcon",
                  express: false,
                  defaultValue: "default",
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
                  id: "filterPosition",
                  express: false,
                  defaultValue: "top-right",
                },
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
          id: "share",
          content: [
            {
              type: "group",
              id: "print",
              content: [
                {
                  type: "setting",
                  id: "print",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "printPosition",
                      defaultValue: {
                        position: "top-left",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "printConfig",
                      express: false,
                      defaultValue: null,
                    },
                    {
                      type: "setting",
                      id: "printTitle",
                      express: false,
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "printAuthor",
                      express: false,
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "printCopyright",
                      express: false,
                      defaultValue: "",
                    },
                  ],
                },
              ],
            },
            {
              type: "group",
              id: "share",
              content: [
                {
                  type: "setting",
                  defaultValue: false,
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
                    {
                      type: "setting",
                      id: "exportToPDFPosition",
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
          id: "search",
          defaultValue: true,
          content: [
            {
              type: "setting",
              id: "search",
              express: true,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "searchPosition",
                  defaultValue: "top-right",
                  express: true,
                },
                {
                  type: "setting",
                  id: "searchOpenAtStart",
                  defaultValue: false,
                  express: true,
                },
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
          type: "subsection",
          id: "swipe",
          content: [
            {
              type: "setting",
              id: "swipe",
              defaultValue: false,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "swipeDirection",
                  defaultValue: "horizontal",
                  express: true,
                },
                {
                  type: "setting",
                  id: "swipePercentage",
                  express: false,
                  defaultValue: 35,
                },
                {
                  type: "setting",
                  id: "swipeConfiguration",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "swipeConfigurationOpenAtStart",
                      defaultValue: false,
                      express: true,
                    },
                    {
                      type: "setting",
                      id: "swipeConfigurationPosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "swipeLeadingLayers",
                  express: true,
                  config: {
                    layerSelectionMode: "multiple",
                    supportedLayerTypes: [
                      "csv",
                      "map-image",
                      "feature",
                      "geojson",
                      "geo-rss",
                      "graphics",
                      "imagery",
                      "imagery-tile",
                      "kml",
                      "map-notes",
                      "media",
                      "ogc-feature",
                      "tile",
                      "vector-tile",
                      "web-tile",
                      "wms",
                      "wmts",
                    ],
                    supportedGeometryTypes: "*",
                    supportsFieldSelection: false,
                  },
                  defaultValue: null,
                },
                {
                  type: "setting",
                  id: "swipeTrailingLayers",
                  express: true,
                  config: {
                    layerSelectionMode: "multiple",
                    supportedLayerTypes: [
                      "csv",
                      "map-image",
                      "feature",
                      "geojson",
                      "geo-rss",
                      "graphics",
                      "imagery",
                      "imagery-tile",
                      "kml",
                      "map-notes",
                      "media",
                      "ogc-feature",
                      "tile",
                      "vector-tile",
                      "web-tile",
                      "wms",
                      "wmts",
                    ],
                    supportedGeometryTypes: "*",
                    supportsFieldSelection: false,
                  },
                  defaultValue: null,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "time",
          content: [
            {
              type: "group",
              id: "time",
              content: [
                {
                  type: "setting",
                  id: "time",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "timePosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "timeLoop",
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "timeExpandAtStart",
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "timeVisible",
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "timeEffect",
                      defaultValue: false,
                      content: [
                        {
                          type: "setting",
                          id: "excludedEffect",
                          defaultValue: null,
                        },
                        {
                          type: "setting",
                          id: "includedEffect",
                          defaultValue: null,
                        },
                      ],
                    },
                    {
                      type: "setting",
                      id: "liveData",
                      defaultValue: false,
                      content: [
                        {
                          type: "setting",
                          id: "durationTime",
                          defaultValue: 1,
                          min: 0,
                        },
                        {
                          type: "setting",
                          id: "snapTime",
                          defaultValue: false,
                        },
                        {
                          type: "setting",
                          id: "durationPeriod",
                          defaultValue: "weeks",
                        },
                        {
                          type: "setting",
                          id: "timeInterval",
                          defaultValue: 1,
                          min: 0,
                        },
                        {
                          type: "setting",
                          id: "timeIntervalUnits",
                          express: "days",
                          defaultValue: "days",
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
          type: "subsection",
          id: "customURLParams",
          content: [
            {
              type: "group",
              id: "customURLParams",
              express: false,
              content: [
                {
                  type: "setting",
                  id: "customURLParamName",
                  express: false,
                  defaultValue: "",
                },
                {
                  type: "setting",
                  id: "customUrlParam",
                  express: false,
                  config: {
                    layerSelectionMode: "single",
                    supportedLayerTypes: "*",
                    supportedGeometryTypes: "*",
                    supportsFieldSelection: true,
                    fieldSelectionMode: "single",
                    supportedFieldTypes: "*",
                  },
                  defaultValue: null,
                },
              ],
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
              type: "setting",
              id: "theme",
              defaultValue: "light",
              express: true,
            },
            {
              type: "group",
              id: "headerTheme",
              content: [
                {
                  type: "setting",
                  id: "customTheme",
                  express: true,
                  config: {
                    numOfSections: 1,
                    headerOnly: true,
                    singleFont: false,
                  },
                  defaultValue: null,
                },
              ],
            },
            {
              type: "setting",
              id: "customCSS",
              defaultValue: "",
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
                index: 5,
              },
            },
          ],
        },
      ],
    },
  ],
};
