/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/

import Camera from "@arcgis/core/Camera";

import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import { PictureMarkerSymbol, SimpleMarkerSymbol } from "@arcgis/core/symbols";
import { eachAlways } from "@arcgis/core/core/promiseUtils";
import esri = __esri;
import Basemap from "@arcgis/core/Basemap";

interface CameraProperties {
  heading?: number;
  position?: Point;
  tilt?: number;
}

//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

export function parseViewComponents(components: string): string[] {
  if (!components) {
    return;
  }
  return components.split(",");
}

export function parseViewpoint(viewpoint: string): Camera {
  // ?viewpoint=cam:-122.69174973,45.53565982,358.434;117.195,59.777
  const viewpointArray = viewpoint && viewpoint.split(";");

  if (!viewpointArray || !viewpointArray.length) {
    return;
  }

  const cameraIndex = viewpointArray[0].indexOf("cam:") !== -1 ? 0 : 1;
  const tiltAndHeadingIndex = cameraIndex === 0 ? 1 : 0;
  const cameraString = viewpointArray[cameraIndex];
  const tiltAndHeadingString = viewpointArray[tiltAndHeadingIndex];
  const cameraProperties = _getCameraProperties(
    cameraString,
    tiltAndHeadingString
  );

  if (cameraProperties.position) {
    return new Camera(cameraProperties);
  }

  return;
}

export function parseCenter(center: string): Point {
  // ?center=-13044705.25,4036227.41,102113&level=12
  // ?center=-13044705.25;4036227.41;102113&level=12
  // ?center=-117.1825,34.0552&level=12
  // ?center=-117.1825;34.0552&level=12
  if (!center) {
    return null;
  }

  const centerArray = _splitURLString(center);
  const centerLength = centerArray.length;

  if (centerLength < 2) {
    return null;
  }

  const x = parseFloat(centerArray[0]);
  const y = parseFloat(centerArray[1]);

  if (isNaN(x) || isNaN(y)) {
    return null;
  }

  const wkid = centerLength === 3 ? parseInt(centerArray[2], 10) : 4326;
  return new Point({
    x,
    y,
    spatialReference: {
      wkid
    }
  });
}

export function parseLevel(level: string): number {
  return level && parseInt(level, 10);
}

export function parseExtent(extent: string): Extent {
  // ?extent=-13054125.21,4029134.71,-13032684.63,4041785.04,102100
  // ?extent=-13054125.21;4029134.71;-13032684.63;4041785.04;102100
  // ?extent=-117.2672,33.9927,-117.0746,34.1064
  // ?extent=-117.2672;33.9927;-117.0746;34.1064
  if (!extent) {
    return null;
  }

  const extentArray = _splitURLString(extent);
  const extentLength = extentArray.length;

  if (extentLength < 4) {
    return null;
  }

  const xmin = parseFloat(extentArray[0]),
    ymin = parseFloat(extentArray[1]),
    xmax = parseFloat(extentArray[2]),
    ymax = parseFloat(extentArray[3]);

  if (isNaN(xmin) || isNaN(ymin) || isNaN(xmax) || isNaN(ymax)) {
    return null;
  }

  const wkid = extentLength === 5 ? parseInt(extentArray[4], 10) : 4326;
  const ext = new Extent({
    xmin,
    ymin,
    xmax,
    ymax,
    spatialReference: {
      wkid
    }
  });
  return ext;
}

export async function parseMarker(marker: string): Promise<esri.Graphic | {}> {
  // ?marker=-117;34;4326;My Title;http://www.daisysacres.com/images/daisy_icon.gif;My location&level=10
  // ?marker=-117,34,4326,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
  // ?marker=-13044705.25,4036227.41,102100,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
  // ?marker=-117,34,,My Title,http://www.daisysacres.com/images/daisy_icon.gif,My location&level=10
  // ?marker=-117,34,,,,My location&level=10
  // ?marker=-117,34&level=10
  // ?marker=10406557.402,6590748.134,2526

  if (!marker) {
    return Promise.reject();
  }

  const markerArray = _splitURLString(marker);
  const markerLength = markerArray.length;
  if (markerLength < 2) {
    return Promise.reject();
  }

  const modules = await eachAlways([import("@arcgis/core/Graphic"), import("@arcgis/core/PopupTemplate"), import("@arcgis/core/symbols/PictureMarkerSymbol"), import("@arcgis/core/symbols/SimpleMarkerSymbol")]);
  const [Graphic, PopupTemplate, PictureMarkerSymbol, SimpleMarkerSymbol] = modules.map((module) => module.value);

  const x = parseFloat(markerArray[0]);
  const y = parseFloat(markerArray[1]);
  const content = markerArray[3];
  const icon_url = markerArray[4];
  const label = markerArray[5];
  const wkid = markerArray[2] ? parseInt(markerArray[2], 10) : 4326;

  const markerSymbol = icon_url
    ? new PictureMarkerSymbol.default({
      url: icon_url,
      height: "32px",
      width: "32px"
    }) as PictureMarkerSymbol
    : new SimpleMarkerSymbol.default({
      outline: {
        width: 1
      },
      size: 14,
      color: [255, 255, 255, 0]
    }) as SimpleMarkerSymbol;

  const point = new Point({
    x,
    y,
    spatialReference: {
      wkid
    }
  });

  const hasPopupDetails = content || label;
  const popupTemplate = hasPopupDetails
    ? new PopupTemplate.default({
      title: content || null,
      content: label || null
    }) as esri.PopupTemplate
    : null;

  const graphic = new Graphic.default({
    geometry: point,
    symbol: markerSymbol,
    popupTemplate: popupTemplate
  });
  return graphic as esri.Graphic;
}

export function parsePopup(popupFixed, popupFixedPosition) {
  return {
    "popup": {
      dockEnabled: popupFixed,
      "dockOptions": {
        breakpoint: !popupFixed,
        position: popupFixed ? popupFixedPosition : "auto"
      }
    }
  }
}
export function parseBasemap(basemapUrl, basemapReferenceUrl) {
  if (!basemapUrl) {
    return;
  }
  return _getBasemap(basemapUrl, basemapReferenceUrl).then(basemap => {
    return basemap;
  })
}
//--------------------------------------------------------------------------
//
//  Private Methods
//
//--------------------------------------------------------------------------

function _splitURLString(value: string): string[] {
  if (!value) {
    return null;
  }

  const splitValues = value.split(";");

  return splitValues.length === 1 ? value.split(",") : splitValues;
}

function _getCameraPosition(camera: string): Point {
  if (!camera) {
    return null;
  }

  const cameraValues = camera.substr(4, camera.length - 4);
  const positionArray = cameraValues.split(",");

  if (positionArray.length < 3) {
    return null;
  }

  const x = parseFloat(positionArray[0]),
    y = parseFloat(positionArray[1]),
    z = parseFloat(positionArray[2]);
  const wkid =
    positionArray.length === 4 ? parseInt(positionArray[3], 10) : 4326;
  return new Point({
    x,
    y,
    z,
    spatialReference: {
      wkid
    }
  });
}

function _getHeadingAndTilt(headingAndTilt: string): CameraProperties {
  if (!headingAndTilt) {
    return null;
  }

  const tiltHeadingArray = headingAndTilt.split(",");

  return tiltHeadingArray.length >= 0
    ? {
      heading: parseFloat(tiltHeadingArray[0]),
      tilt: parseFloat(tiltHeadingArray[1])
    }
    : null;
}
function _getBasemap(basemapUrl, basemapReferenceUrl): Promise<Basemap> {

  // ?basemapUrl=https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer&basemapReferenceUrl=http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer
  if (!basemapUrl) {
    return;
  }
  return eachAlways([import("@arcgis/core/layers/Layer"), import("@arcgis/core/Basemap")]).then((modules) => {
    modules = modules.map((module) => module.value);
    const [Layer, Basemap] = modules;

    const getBaseLayer = Layer.default.fromArcGISServerUrl({ url: basemapUrl });

    const getReferenceLayer = basemapReferenceUrl
      ? Layer.default.fromArcGISServerUrl({
        url: basemapReferenceUrl
      })
      : Promise.resolve();

    const getBaseLayers = eachAlways({ baseLayer: getBaseLayer, referenceLayer: getReferenceLayer });

    return getBaseLayers.then(async (response) => {
      const error = response?.baseLayer?.error || response?.referenceLayer?.error;
      if (error) {
        return Promise.reject(error);
      } else {
        const baseLayer = response.baseLayer;
        const referenceLayer = response.referenceLayer;
        const basemapOptions = {
          baseLayers: [baseLayer.value],
          referenceLayers: referenceLayer.value ? [referenceLayer.value] : []
        };
        const basemap = new Basemap.default(basemapOptions);
        await basemap.loadAll();
        return basemap;
      }
    });
  });







}

function _getCameraProperties(
  camera: string,
  headingAndTilt: string
): CameraProperties {
  const cameraPosition = _getCameraPosition(camera);
  const headingAndTiltProperties = _getHeadingAndTilt(headingAndTilt);

  return {
    position: cameraPosition,
    ...headingAndTiltProperties
  };
}
