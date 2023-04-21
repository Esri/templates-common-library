/// <reference types="intern" />

import GeneralUtils = require("functionality/generalUtils");

const chai = intern.getPlugin("chai");
const { assert } = chai;
const { suite, test } = intern.getPlugin("interface.tdd");

class GeneralUtilsUT {
  init() {
    suite("GeneralUtils", () => {
      console.log("GeneralUtils", GeneralUtils);

      suite("getPortalDeploymentType", () => {
        const onlineMock = { isPortal: false };
        const enterpriseMockButUnknown = { isPortal: true };
        const unknownMock = { isPortal: undefined };
        const enterpriseFullMock = {
          isPortal: true, allSSL: true,
          helpBase: "/gis/portalhelp/en/",
          portalHostname: "rqawinbi01pt.ags.esri.com/gis",
          sourceJSON: { portalDeploymentType: "ArcGISEnterprise" }
        };
        const enterpriseKuberFullMock = {
          isPortal: true, allSSL: true,
          helpBase: "/web/help/en/",
          portalHostname: "1110pubiwawa.ags.esri.com/web",
          sourceJSON: { portalDeploymentType: "ArcGISEnterpriseOnKubernetes" }
        };
        const unknownFullMock = { isPortal: true, sourceJSON: { portalDeploymentType: "RandomTestString" }};

        test("ago", () => {
          assert.equal(GeneralUtils.getPortalDeploymentType(onlineMock), "ago");
          assert.notEqual(GeneralUtils.getPortalDeploymentType(onlineMock), "unknown");
        });

        test("enterprise", () => {
          assert.equal(GeneralUtils.getPortalDeploymentType(enterpriseFullMock), "enterprise");
          assert.notEqual(GeneralUtils.getPortalDeploymentType(enterpriseFullMock), "unknown");
        });

        test("enterpriseKubernetes", () => {
          assert.equal(GeneralUtils.getPortalDeploymentType(enterpriseKuberFullMock), "enterpriseKubernetes");
          assert.notEqual(GeneralUtils.getPortalDeploymentType(enterpriseKuberFullMock), "unknown");
        });

        test("unknown deployment types", () => {
          assert.equal(GeneralUtils.getPortalDeploymentType(enterpriseMockButUnknown), "unknown");
          assert.equal(GeneralUtils.getPortalDeploymentType(unknownMock), "unknown");
          assert.equal(GeneralUtils.getPortalDeploymentType(unknownFullMock), "unknown");
        });


      });
    });
  }
}

export = GeneralUtilsUT;
