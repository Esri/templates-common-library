export default {
  config: [
    {
      type: "section",
      id: "map",
      config: {
        itemTypes: ["2d"],
      },
    },

    {
      type: "section",
      id: "about",
      content: [
        {
          type: "group",
          id: "header",
          content: [
            {
              type: "setting",
              id: "header",
              defaultValue: false,
              express: true,
              content: [
                {
                  type: "setting",
                  id: "title",
                  defaultValue: "",
                },
              ],
            },
          ],
        },
        {
          type: "group",
          id: "splash",
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
              ],
            },
          ],
        },
      ],
    },
    {
      type: "section",
      id: "webEditor",
      content: [],
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
