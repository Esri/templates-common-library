import ConfigurationSettingsBase from '../../../src/baseClasses/configurationSettingsBase';

class ConfigSettingsTest extends ConfigurationSettingsBase{
    prop1: string;
    prop2: number;
    prop3: { child1: string, child2: number }
}


describe('ConfigurationSettingsBase', () => {
  const confSettings: ConfigSettingsTest = new ConfigSettingsTest({
    prop1: "testProp1",
    prop2: 2,
    prop3: {
      child1: "testChild1",
      child2: "testChild2"
    }
  });
  it('should have a properties assigned properly when instantiated', () => {
    expect(confSettings.prop1).toBe("testProp1");
    expect(confSettings.prop2).toBe(2);
    expect(confSettings.prop3).toEqual({child1: "testChild1",child2: "testChild2"});
  });
});