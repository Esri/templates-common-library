export default {
  config: [
    {
      type: "section",
      id: "map",
      config: {
        itemTypes: ["3d"],
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
                  express: true,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "legendConfig",
                      express: false,
                      defaultValue: {
                        style: {
                          type: "classic",
                          layout: "stack",
                        },
                      },
                    },
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
              ],
            },
            {
              type: "setting",
              id: "header",
              express: true,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "title",
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
                  id: "spinGlobe",
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "spinGlobePosition",
                      express: false,
                      defaultValue: "bottom-left",
                    },
                  ],
                  defaultValue: false,
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
                      id: "elevationProfileOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "elevationProfileUnits",
                      defaultValue: "imperial",
                    },
                    {
                      type: "setting",
                      id: "showElevationProfile",
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
                  id: "orientedImagery",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "orientedImageryPosition",
                      defaultValue: {
                        position: "top-right",
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
                  id: "slides",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "slidesPosition",
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
                  ],
                },
                {
                  type: "setting",
                  id: "coordinates",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "coordinateUnits",
                      express: false,
                      defaultValue: "metric",
                    },
                    {
                      type: "setting",
                      id: "coordinatesPosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "slice",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "slicePosition",
                      defaultValue: {
                        position: "bottom-left",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "sliceOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "fullScreen",
                  express: false,
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
                  defaultValue: true,
                },
                {
                  type: "setting",
                  id: "home",
                  defaultValue: false,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "homePosition",
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
              ],
            },
            {
              type: "group",
              id: "navigate",
              content: [
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
                        index: 1,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "compassWidget",
                  express: false,
                  defaultValue: true,
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
                  id: "navigationToggle",
                  express: false,
                  defaultValue: true,
                  content: [
                    {
                      type: "setting",
                      id: "navigationTogglePosition",
                      defaultValue: {
                        position: "top-left",
                        index: 1,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "disableScroll",
                  express: false,
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "insetMap",
          content: [
            {
              type: "setting",
              id: "insetOverviewMap",
              express: false,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "insetOverviewMapOpenAtStart",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "insetMapMarkerColor",
                  express: false,
                  defaultValue: "#fff",
                },
                {
                  type: "setting",
                  id: "insetOverviewMapPosition",
                  defaultValue: {
                    position: "bottom-left",
                    index: 0,
                  },
                },
                {
                  type: "setting",
                  id: "insetOverviewSplitAtStart",
                  express: false,
                  defaultValue: false,
                },
                {
                  type: "setting",
                  id: "insetOverviewSplitDirection",
                  express: false,
                  defaultValue: "horizontal",
                },
                {
                  type: "setting",
                  id: "insetOverviewMapBasemap",
                  express: false,
                  defaultValue: null,
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
                {
                  type: "setting",
                  id: "basemapGallery",
                  express: false,
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "basemapGalleryConfig",
                      express: false,
                      defaultValue: null,
                      config: {
                        is3d: true,
                      },
                    },
                    {
                      type: "setting",
                      id: "basemapGalleryPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 2,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "daylight",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "daylightPosition",
                      defaultValue: {
                        position: "bottom-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "daylightOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                    {
                      type: "setting",
                      id: "daylightDate",
                      express: false,
                      defaultValue: "",
                    },
                    {
                      type: "setting",
                      id: "daylightTime",
                      express: false,
                      defaultValue: "",
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "shadowCast",
                  defaultValue: false,
                  express: false,
                  content: [
                    {
                      type: "setting",
                      id: "shadowCastPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "shadowCastOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "showWeather",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "weatherPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "buildingExplorer",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "buildingExplorerPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
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
                {
                  type: "setting",
                  id: "lineOfSight",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "lineOfSightPosition",
                      defaultValue: {
                        position: "top-right",
                        index: 0,
                      },
                    },
                    {
                      type: "setting",
                      id: "lineOfSightOpenAtStart",
                      express: false,
                      defaultValue: false,
                    },
                  ],
                },
                {
                  type: "setting",
                  id: "viewshed",
                  defaultValue: false,
                  content: [
                    {
                      type: "setting",
                      id: "viewshedPosition",
                      defaultValue: {
                        position: "top-right",
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
                      defaultValue: "streets-vector",
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
                },
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
        {
          type: "subsection",
          id: "share",
          content: [
            {
              type: "setting",
              id: "share",
              express: true,
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "shareIncludeEmbed",
                  defaultValue: false,
                  express: false,
                },
                {
                  type: "setting",
                  id: "shareIncludeSocial",
                  defaultValue: true,
                  express: false,
                },
                {
                  type: "setting",
                  id: "sharePosition",
                  defaultValue: {
                    position: "top-right",
                    index: 0,
                  },
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
        {
          type: "subsection",
          id: "search",
          content: [
            {
              type: "setting",
              id: "search",
              defaultValue: false,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "searchPosition",
                  defaultValue: {
                    position: "top-right",
                    index: 0,
                  },
                },
                {
                  type: "setting",
                  id: "searchOpenAtStart",
                  express: true,
                  defaultValue: false,
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
              defaultValue: false,
              express: false,
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
