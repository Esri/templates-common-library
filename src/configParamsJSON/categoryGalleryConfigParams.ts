export default {
  "config": [
    {
      "type": "section",
      "id": "group",
      "content": [
        {
          "type": "setting",
          "id": "group",
          "defaultValue": "",
          "express": true
        }
      ]
    },
    {
      "type": "section",
      "id": "galleryAbout",
      "content": [
        {
          "type": "setting",
          "id": "title",
          "express": true,
          "defaultValue": ""
        },
        {
          "type": "setting",
          "defaultValue": true,
          "express": true,
          "id": "share",
          "content": [
            {
              "type": "setting",
              "id": "shareIncludeEmbed",
              "express": false,
              "defaultValue": false
            },
            {
              "type": "setting",
              "id": "shareIncludeSocial",
              "defaultValue": true,
              "express": false
            }
          ]
        },
        {
          "type": "setting",
          "id": "headHTML",
          "defaultValue": "",
          "config": {
            "imageUpload": true
          }
        }
      ]
    },
    {
      "type": "section",
      "id": "galleryInteractivity",
      "content": [
        {
          "type": "subsection",
          "id": "galleryDisplay",
          "content": [
            {
              "type": "group",
              "id": "galleryDisplay",
              "content": [
                {
                  "type": "setting",
                  "id": "filterPaneDefault",
                  "express": true,
                  "defaultValue": false
                },
                {
                  "type": "setting",
                  "id": "allowedItemTypes",
                  "defaultValue": "['Group Layer', 'Web Map', 'CityEngine Web Scene', 'Web Scene', '360 VR Experience', 'Pro Map', 'Feature Service', 'Map Service', 'Image Service', 'KML', 'KML Collection', 'WFS', 'WMTS', 'Feature Collection', 'Feature Collection Template', 'Vector Tile Service', 'Scene Service', 'Relational Database Connection', 'Web Mapping Application', 'StoryMap', 'Mobile Application', 'Operations Dashboard Add In', 'Native Application', 'Native Application Template', 'Native Application Installer', 'Workforce Project', 'Form', 'Insights Workbook', 'Insights Workbook Package', 'Insights Model', 'Insights Page', 'Dashboard', 'Hub Initiative', 'Hub Site Application', 'Hub Page', 'AppBuilder Widget Package', 'Symbol Set', 'Color Set', 'Shapefile', 'File Geodatabase', 'CSV', 'CAD Drawing', 'Service Definition', 'Microsoft Word', 'Microsoft Powerpoint', 'Microsoft Excel', 'PDF', 'Image', 'Visio Document', 'iWork Keynote', 'iWork Pages', 'iWork Numbers', 'Report Template', 'Statistical Data Collection', 'Map Document', 'Map Package', 'Mobile Basemap Package', 'Mobile Map Package', 'Tile Package', 'Vector Tile Package', 'Project Package', 'Task File', 'ArcPad Package', 'Explorer Map', 'Document Link', 'Globe Document', 'Scene Document', 'Published Map', 'Map Template', 'Windows Mobile Package', 'Pro Map', 'Layout', 'Project Template', 'Layer', 'Layer Package', 'Explorer Layer', 'Scene Package', 'Image Collection', 'Desktop Style', 'Geoprocessing Package', 'Geoprocessing Package (Pro version)', 'Geoprocessing Sample', 'Locator Package', 'Rule Package', 'Raster function template', 'ArcGIS Pro Configuration', 'Workflow Manager Package', 'Desktop Application', 'Desktop Application Template', 'Code Sample', 'Desktop Add In', 'Explorer Add In', 'ArcGIS Pro Add In', 'Geometry Service', 'Geocoding Service', 'Network Analysis Service', 'Geoprocessing Service', 'Workflow Manager Service', 'Application', 'Big Data File Share', 'Web Tool', 'Notebook', 'Deep Learning Package', 'Web Experience', 'Web Experience Template', 'Feed', 'OGCFeatureServer']"
                },
                {
                  "type": "setting",
                  "id": "sortDefault",
                  "express": true,
                  "defaultValue": "relevance"
                },
                {
                  "type": "setting",
                  "id": "resultsPerQuery",
                  "defaultValue": 16
                },
                {
                  "type": "setting",
                  "id": "showSignInBtn",
                  "defaultValue": false
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "contentFiltering",
          "content": [
            {
              "type": "group",
              "id": "contentFiltering",
              "content": [
                {
                  "type": "setting",
                  "id": "filters",
                  "defaultValue": [
                    "categories",
                    "itemType",
                    "tags"
                  ],
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "filtersDefault",
                  "defaultValue": []
                },
                {
                  "type": "setting",
                  "id": "availableItemTypeFilters",
                  "defaultValue": [
                    "maps",
                    "layers",
                    "scenes",
                    "apps",
                    "files"
                  ]
                },
                {
                  "type": "setting",
                  "id": "useOrgCategories",
                  "express": true,
                  "defaultValue": false
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "itemCardDisplay",
          "content": [
            {
              "type": "group",
              "id": "itemCardDisplay",
              "content": [
                {
                  "type": "setting",
                  "id": "showItemType",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "showItemOwner",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "showItemInfo",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "showItemDetails",
                  "express": true,
                  "defaultValue": true
                },
                {
                  "type": "setting",
                  "id": "itemSummary",
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "itemSummaryMaxChar",
                      "defaultValue": 250
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "openInMapViewer",
                  "express": false,
                  "defaultValue": false
                }
              ]
            }
          ]
        },
        {
          "type": "subsection",
          "id": "map",
          "content": [
            {
              "type": "group",
              "id": "map",
              "content": [
                {
                  "type": "setting",
                  "id": "defaultBasemap",
                  "defaultValue": "streets-vector"
                },
                {
                  "type": "setting",
                  "id": "compassWidget",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "compassWidgetPosition",
                      "defaultValue": "top-right"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "basemapToggle",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "basemapTogglePosition",
                      "defaultValue": "bottom-right"
                    },
                    {
                      "type": "setting",
                      "id": "nextBasemap",
                      "defaultValue": "topo"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "search",
                  "defaultValue": true,
                  "content": [
                    {
                      "type": "setting",
                      "id": "searchPosition",
                      "defaultValue": "top-right"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "locateWidget",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "locateWidgetPosition",
                      "defaultValue": "bottom-right"
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
                      "id": "legendPosition",
                      "defaultValue": "bottom-left"
                    }
                  ]
                },
                {
                  "type": "setting",
                  "id": "home",
                  "defaultValue": false,
                  "content": [
                    {
                      "type": "setting",
                      "id": "homePosition",
                      "defaultValue": "top-left"
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
      "id": "galleryTheme",
      "content": [
        {
          "type": "subsection",
          "id": "galleryLayout",
          "content": [
            {
              "type": "group",
              "id": "galleryLayout",
              "content": [
                {
                  "type": "setting",
                  "id": "displayDefault",
                  "express": true,
                  "defaultValue": "grid"
                },
                {
                  "type": "setting",
                  "id": "theme",
                  "defaultValue": "light",
                  "express": true
                },
                {
                  "type": "setting",
                  "id": "customTheme",
                  "express": true,
                  "config": {
                    "numOfSections": 1,
                    "headerOnly": true,
                    "singleFont": true
                  },
                  "defaultValue": null
                },
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
              "id": "positionManager",
              "defaultValue": ""
            }
          ]
        }
      ]
    }
  ]
};