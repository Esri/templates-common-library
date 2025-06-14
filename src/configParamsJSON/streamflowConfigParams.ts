export default {
  config: [
    {
      type: "section",
      id: "map",
      config: {
        itemTypes: ["2d"],
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
                {
                  type: "setting",
                  id: "legend",
                  defaultValue: true,
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
                  type: "setting",
                  id: "popupFixed",
                  defaultValue: true,
                  express: true,
                  content: [
                    {
                      type: "setting",
                      id: "popupFixedPosition",
                      defaultValue: "top-right",
                    },
                  ],
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
              id: "help",
              defaultValue: true,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "helpPosition",
                  defaultValue: {
                    position: "top-left",
                    index: 0,
                  },
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
          id: "coverPageOrSplash",
          content: [
            {
              type: "setting",
              id: "enableSplashOrCover",
              content: [
                {
                  type: "setting",
                  id: "splashModeType",
                  config: {
                    branches: [
                      ["landingPageConfig"],
                      [
                        "splashTitle",
                        "splashContent",
                        "splashButtonText",
                        "splashIsOpen",
                      ],
                    ],
                  },
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
                  ],
                  defaultValue: {
                    branchValue: "cover-page",
                    branchOptionsFieldNames: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      id: "streamflow",
      content: [
        {
          type: "setting",
          id: "streamflowServiceType",
          express: true,
          config: {
            branches: [
              ["streamflowFilterLabel", "globalFilter1", "globalFilter2"],
              ["streamflowFilterLabel", "localFilter1"],
            ],
          },
          content: [
            {
              type: "setting",
              id: "streamflowFilterLabel",
              express: true,
            },
            {
              type: "setting",
              id: "globalFilter1",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "riverCountry",
                  express: true,
                  defaultValue: null,
                },
                {
                  type: "setting",
                  id: "streamflowFilterOptions",
                  express: true,
                  defaultValue: "and",
                },
                {
                  type: "setting",
                  id: "outletCountry",
                  express: true,
                  defaultValue: null,
                },
              ],
            },
            {
              type: "setting",
              id: "globalFilter2",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "streamOrder",
                  express: true,
                  defaultValue: null,
                },
              ],
            },
            {
              type: "setting",
              id: "globalFilter3",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "streamflow",
                  express: true,
                  defaultValue: null,
                },
              ],
            },
            {
              type: "setting",
              id: "localFilter1",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "streamOrder",
                  express: true,
                  defaultValue: null,
                },
              ],
            },
            {
              type: "setting",
              id: "localFilter2",
              express: true,
              content: [
                {
                  type: "setting",
                  id: "streamflow",
                  express: true,
                  defaultValue: null,
                },
              ],
            },
          ],
          defaultValue: {
            branchValue: "global",
          },
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
                  id: "bookmarks",
                  defaultValue: false,
                  express: false,
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
              ],
            },
            {
              type: "group",
              id: "navigate",
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
          id: "share",
          content: [
            {
              type: "group",
              id: "share",
              content: [
                {
                  type: "setting",
                  id: "share",
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
                      defaultValue: "top-right",
                    },
                  ],
                  defaultValue: false,
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
              express: true,
              defaultValue: true,
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
  ],
};
