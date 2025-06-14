export default {
 "config": [
  {
   "type": "section",
   "id": "map",
   "content": [
    {
     "type": "setting",
     "id": "mapArea",
     "express": false,
     "defaultValue": false,
     "content": [
      {
       "type": "setting",
       "id": "mapAreaConfig",
       "express": false,
       "defaultValue": null
      }
     ]
    }
   ]
  },
  {
   "type": "section",
   "id": "about",
   "content": [
    {
     "type": "subsection",
     "id": "appComprehension",
     "content": [
      {
       "type": "group",
       "id": "appComprehension",
       "content": [
        {
         "type": "setting",
         "id": "header",
         "defaultValue": true,
         "express": true,
         "content": [
          {
           "type": "setting",
           "id": "title",
           "defaultValue": "",
           "express": true
          },
          {
           "type": "setting",
           "id": "titleLink",
           "express": false,
           "defaultValue": ""
          },
          {
           "type": "setting",
           "id": "customHeader",
           "defaultValue": false,
           "content": [
            {
             "type": "setting",
             "id": "customHeaderHTML",
             "defaultValue": "",
             "config": {
              "imageUpload": true
             }
            }
           ]
          }
         ]
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
           "defaultValue": ""
          },
          {
           "type": "setting",
           "id": "splashButtonPosition",
           "defaultValue": {
            "position": "top-right",
            "index": 0
           }
          },
          {
           "type": "setting",
           "id": "splashButtonIcon",
           "express": true,
           "defaultValue": "information",
           "config": {
            "iconList": [
             "information",
             "information-f",
             "information-letter",
             "lightbulb",
             "question",
             "question-f",
             "question-mark"
            ]
           }
          }
         ]
        }
       ]
      },
      {
       "type": "group",
       "id": "mapA11y",
       "content": [
        {
         "type": "setting",
         "id": "mapA11yDesc",
         "express": true
        },
        {
         "type": "setting",
         "id": "keyboardShortcuts",
         "express": true,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "keyboardShortcutsPosition",
           "defaultValue": {
            "position": "top-left",
            "index": 0
           }
          }
         ]
        }
       ]
      }
     ]
    },
    {
     "type": "subsection",
     "id": "coverPageSettings",
     "content": [
      {
       "type": "group",
       "id": "coverPage",
       "content": [
        {
         "type": "setting",
         "id": "landingPage",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "landingPageConfig",
           "express": false,
           "defaultValue": {
            "titleText": "",
            "subtitleText": "",
            "descriptionText": "",
            "entryButtonText": "",
            "alignment": "center",
            "backgroundType": "color",
            "textColor": "#FFFFFF",
            "entryButtonColor": "#0079C1",
            "backgroundColor": "#0079C1",
            "iconImage": null,
            "iconImageScale": "m",
            "backgroundImageSrc": null
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
   "type": "section",
   "id": "sidebar",
   "content": [
    {
     "type": "setting",
     "id": "sidebarPosition",
     "express": false,
     "defaultValue": "start"
    },
    {
     "type": "setting",
     "id": "sidebarExpanded",
     "express": false,
     "defaultValue": false
    },
    {
     "type": "group",
     "id": "activePanel",
     "content": [
      {
       "type": "setting",
       "id": "activePanel",
       "defaultValue": "legendPanel",
       "express": true,
       "content": [
        {
         "type": "setting",
         "id": "legendPanel",
         "defaultValue": true,
         "express": true,
         "content": [
          {
           "type": "setting",
           "id": "legendPanelText",
           "express": false,
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "layerListPanel",
         "defaultValue": false,
         "express": true,
         "content": [
          {
           "type": "setting",
           "id": "layerListPanelText",
           "express": false,
           "defaultValue": null
          },
          {
           "type": "setting",
           "id": "visibilityIcon",
           "express": false,
           "defaultValue": "default"
          },
          {
           "type": "setting",
           "id": "layerListAddZoom",
           "defaultValue": false,
           "express": false
          },
          {
           "type": "setting",
           "id": "layerListLegend",
           "defaultValue": false,
           "express": false
          },
          {
           "type": "setting",
           "id": "layerListAddTable",
           "defaultValue": false,
           "express": false,
           "content": [
            {
             "type": "setting",
             "id": "attributeEditing",
             "defaultValue": false,
             "express": false
            }
           ]
          },
          {
           "type": "setting",
           "id": "selectedLayers",
           "express": true,
           "config": {
            "layerSelectionMode": "multiple",
            "supportedLayerTypes": "*",
            "supportedGeometryTypes": "*",
            "supportsFieldSelection": false
           },
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "bookmarksPanel",
         "express": true,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "bookmarksPanelText",
           "express": false,
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "popupPanel",
         "defaultValue": true,
         "express": true,
         "content": [
          {
           "type": "setting",
           "id": "popupTipText",
           "defaultValue": null,
           "express": false
          },
          {
           "type": "setting",
           "id": "popupPanelText",
           "express": false,
           "defaultValue": null
          },
          {
           "type": "setting",
           "id": "classicPanel",
           "defaultValue": false,
           "express": false
          }
         ]
        },
        {
         "type": "setting",
         "id": "layerEditPanel",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "layerEditPanelText",
           "express": false,
           "defaultValue": null
          },
          {
           "type": "setting",
           "id": "enableSnap",
           "express": false,
           "defaultValue": true
          },
          {
           "type": "setting",
           "id": "editableLayers",
           "express": false,
           "config": {
            "layerSelectionMode": "multiple",
            "supportedLayerTypes": [
             "feature"
            ],
            "supportedCapabilityTypes": [
             "editable"
            ],
            "supportedGeometryTypes": "*",
            "supportsFieldSelection": false
           },
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "utilityNetwork",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "utilityNetworkText",
           "express": false,
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "orientedImagery",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "orientedImageryText",
           "express": false,
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "details",
         "defaultValue": true,
         "express": true,
         "content": [
          {
           "type": "setting",
           "id": "detailsContent",
           "express": true,
           "defaultValue": null,
           "config": {
            "imageUpload": true
           }
          },
          {
           "type": "setting",
           "id": "infoButtonIcon",
           "express": true,
           "defaultValue": "information",
           "config": {
            "iconList": [
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
           "type": "setting",
           "id": "detailsText",
           "defaultValue": null,
           "express": false
          }
         ]
        },
        {
         "type": "setting",
         "id": "filterPanel",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "filterConfig",
           "express": false,
           "defaultValue": null
          },
          {
           "type": "setting",
           "id": "filterPanelText",
           "express": false,
           "defaultValue": null
          }
         ]
        },
        {
         "type": "setting",
         "id": "basemapGallery",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "basemapGalleryConfig",
           "express": false,
           "defaultValue": null
          },
          {
           "type": "setting",
           "id": "basemapGalleryText",
           "defaultValue": null,
           "express": false
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
   "id": "interactivity",
   "content": [
    {
     "type": "subsection",
     "id": "exploreNavigate",
     "content": [
      {
       "type": "group",
       "id": "explore",
       "content": [
        {
         "type": "setting",
         "id": "popupHover",
         "express": false,
         "defaultValue": false
        },
        {
         "type": "setting",
         "id": "home",
         "defaultValue": true,
         "express": false,
         "content": [
          {
           "type": "setting",
           "id": "homePosition",
           "express": false,
           "defaultValue": {
            "position": "top-left",
            "index": 0
           }
          }
         ]
        },
        {
         "type": "setting",
         "id": "compassWidget",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "compassWidgetPosition",
           "defaultValue": {
            "position": "top-left",
            "index": 1
           }
          }
         ]
        },
        {
         "type": "setting",
         "id": "locateWidget",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "locateWidgetPosition",
           "defaultValue": {
            "position": "top-right",
            "index": 0
           }
          }
         ]
        },
        {
         "type": "setting",
         "id": "mapZoom",
         "defaultValue": true,
         "express": false,
         "content": [
          {
           "type": "setting",
           "id": "mapZoomPosition",
           "defaultValue": {
            "position": "top-left",
            "index": 1
           }
          }
         ]
        },
        {
         "type": "setting",
         "id": "fullScreen",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "fullScreenPosition",
           "defaultValue": {
            "position": "bottom-right",
            "index": 0
           }
          }
         ]
        },
        {
         "type": "setting",
         "id": "measure",
         "express": false,
         "defaultValue": false,
         "content": [
          {
           "type": "setting",
           "id": "measurePosition",
           "defaultValue": {
            "position": "top-right",
            "index": 0
           }
          },
          {
           "type": "setting",
           "id": "measureOpenAtStart",
           "express": false,
           "defaultValue": false
          },
          {
           "type": "setting",
           "id": "coordinateFormats",
           "express": false,
           "defaultValue": "xy"
          },
          {
           "type": "setting",
           "id": "measureAreaUnit",
           "express": false
          },
          {
           "type": "setting",
           "id": "measureLinearUnit",
           "express": false
          }
         ]
        },
        {
         "type": "setting",
         "id": "enableFeatureSearchScale",
         "express": false,
         "content": [
          {
           "type": "setting",
           "id": "searchScale",
           "express": false,
           "defaultValue": 10000
          }
         ],
         "defaultValue": false
        }
       ]
      },
      {
       "type": "group",
       "id": "navigate",
       "content": [
        {
         "type": "setting",
         "id": "disableScroll",
         "express": false,
         "defaultValue": false
        },
        {
         "type": "setting",
         "id": "scalebar",
         "express": false,
         "defaultValue": true,
         "content": [
          {
           "type": "setting",
           "id": "scalebarPosition",
           "defaultValue": {
            "position": "bottom-left",
            "index": 0
           }
          },
          {
           "type": "setting",
           "id": "scalebarDualMode",
           "defaultValue": false,
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
     "id": "modify",
     "content": [
      {
       "type": "setting",
       "id": "enableHighlightColor",
       "express": false,
       "defaultValue": false,
       "content": [
        {
         "type": "setting",
         "id": "highlightColor",
         "express": false,
         "config": {
          "alpha": true
         },
         "defaultValue": "rgba(0, 255, 255, 0.50)"
        }
       ]
      },
      {
       "type": "setting",
       "id": "enableHighlightHaloColor",
       "defaultValue": false,
       "express": false,
       "content": [
        {
         "type": "setting",
         "id": "highlightHaloColor",
         "express": false,
         "defaultValue": "#00FFFF"
        }
       ]
      },
      {
       "type": "setting",
       "id": "basemapToggle",
       "defaultValue": false,
       "express": false,
       "content": [
        {
         "type": "setting",
         "id": "basemapTogglePosition",
         "defaultValue": {
          "position": "bottom-right",
          "index": 0
         }
        },
        {
         "type": "setting",
         "id": "basemapSelector",
         "express": false,
         "defaultValue": "streets-vector"
        }
       ]
      },
      {
       "type": "setting",
       "id": "sketchTools",
       "express": false,
       "defaultValue": false,
       "content": [
        {
         "type": "setting",
         "id": "sketchToolsPosition",
         "defaultValue": {
          "position": "top-right",
          "index": 0
         }
        },
        {
         "type": "setting",
         "id": "sketchMarkerColor",
         "defaultValue": "#fff"
        },
        {
         "type": "setting",
         "id": "sketchMarkerPin",
         "defaultValue": "esri-pin-1"
        },
        {
         "type": "setting",
         "id": "sketchOutlineColor",
         "defaultValue": "#323232"
        },
        {
         "type": "setting",
         "id": "sketchFillColor",
         "defaultValue": "#828282"
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
       "type": "setting",
       "id": "exportToPDF",
       "express": false,
       "defaultValue": false,
       "content": [
        {
         "type": "setting",
         "id": "exportButtonIcon",
         "express": true,
         "defaultValue": "export",
         "config": {
          "iconList": [
           "export",
           "file-pdf",
           "print",
           "print-preview",
           "images"
          ]
         }
        }
       ]
      },
      {
       "type": "setting",
       "id": "share",
       "express": false,
       "defaultValue": true,
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
      }
     ]
    },
    {
     "type": "subsection",
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
         "id": "searchPosition",
         "defaultValue": {
          "position": "top-right",
          "index": 1
         }
        },
        {
         "type": "setting",
         "id": "searchOpenAtStart",
         "express": true,
         "defaultValue": true
        },
        {
         "type": "setting",
         "id": "searchConfiguration",
         "express": true,
         "defaultValue": null
        }
       ]
      }
     ]
    },
    {
     "type": "subsection",
     "id": "customURLParams",
     "content": [
      {
       "type": "group",
       "id": "customURLParams",
       "content": [
        {
         "type": "setting",
         "id": "customURLParamName",
         "express": false,
         "defaultValue": ""
        },
        {
         "type": "setting",
         "id": "customUrlParam",
         "express": false,
         "config": {
          "layerSelectionMode": "single",
          "supportedLayerTypes": "*",
          "supportedGeometryTypes": "*",
          "supportsFieldSelection": true,
          "fieldSelectionMode": "single",
          "supportedFieldTypes": "*"
         },
         "defaultValue": null
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
     "id": "layout",
     "content": [
      {
       "type": "setting",
       "id": "panelSize",
       "express": false,
       "defaultValue": "m"
      }
     ]
    },
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
         "defaultValue": "dark",
         "express": true
        },
        {
         "type": "setting",
         "id": "customTheme",
         "express": true,
         "defaultValue": null,
         "config": {
          "singleFont": false
         }
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
       "express": true,
       "defaultValue": null
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
       "id": "languageSwitcherOpenAtStart",
       "express": false,
       "defaultValue": false
      },
      {
       "type": "setting",
       "id": "languageSwitcherConfig",
       "express": true,
       "defaultValue": null
      },
      {
       "type": "setting",
       "id": "languageSwitcherPosition",
       "defaultValue": {
        "position": "top-right",
        "index": 0
       }
      }
     ]
    }
   ]
  }
 ],
};
