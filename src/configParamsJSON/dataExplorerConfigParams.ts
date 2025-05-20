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
                  ],
                },
              ],
            },
            {
              type: "setting",
              id: "header",
              defaultValue: true,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "title",
                  defaultValue: "",
                  express: true,
                },
              ],
            },
          ],
        },
        {
          type: "subsection",
          id: "featureComprehension",
          content: [
            {
              type: "group",
              id: "featureComprehension",
              content: [
                {
                  type: "setting",
                  id: "legend",
                  express: true,
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
      id: "dataExplorer",
      content: [
        {
          type: "subsection",
          id: "aiLayerOptions",
          content: [],
        },
        {
          type: "subsection",
          id: "chatText",
          content: [
            {
              type: "setting",
              id: "promptItemCreatorConfig",
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
              id: "basemapGallery",
              defaultValue: false,
              content: [
                {
                  type: "setting",
                  id: "basemapGalleryConfig",
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
                    index: 0,
                  },
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
                  id: "layerListAddTable",
                  defaultValue: false,
                  express: false,
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
              content: [
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
              defaultValue: false,
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
