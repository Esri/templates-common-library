
// Scenario 1 ---- General Watch

import { watch } from "esri/core/watchUtils";

watch(foo, "some.value", (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

watch(this.foo, "some.value", (newValue, oldValue) => {
  console.log(newValue, oldValue);
});


// Scenario 2 ---- Init

import { init } from "esri/core/watchUtils";

init(foo, "some.value", (newValue, oldValue) => {
  console.log(newValue, oldValue);
});


// Scenario 3 ---- When

import { when, whenNot, whenTrue, whenDefined, whenUndefined } from "esri/core/watchUtils";

when(foo, "some.value", () => console.log("Truthy"));
when(this, ["navBar", "contentArea"], () => {
  this.scheduleRender();
}),
whenNot(foo, "some.value", () => console.log("Not truthy"));
whenTrue(foo, "some.value", () => console.log("True"));
whenTrueOnce(foo, "some.value", () => console.log("TrueOnce"));
whenFalse(foo, "some.value", () => console.log("False"));
whenFalseOnce(foo, "some.value", () => console.log("FalseOnce"));
whenDefined(foo, "some.value", () => console.log("Defined"));
whenUndefined(foo, "some.value", () => console.log("Undefined"));


// Scenario 4 ---- once

import { once } from "esri/core/watchUtils";

const handle = once(foo, "some.value");

handle.then(({ value }) => {
  console.log(value);
});

handle.remove(); // Stop watching and clean up


// Scenario 5 ---- whenOnce

import { whenOnce } from "esri/core/watchUtils";

const handleWhenOnce = whenOnce(foo, "some.value");

handleWhenOnce.then(() => {
  console.log("Became truthy!");
});

handleWhenOnce.remove(); // Stop watching and clean up

