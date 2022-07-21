export function getDefaultValues(configParamsObj) {
  // Create initial object to return
  const defaultValues = {};
  const { config } = configParamsObj;

  // Iterate through sections
  config.forEach(section => {
    const { content } = section;

    // Skip section if no content exists, i.e. map/scene sections
    if (!content) return;

    // Otherwise, trigger recursive logic
    handleConfigContent(section, defaultValues);
  });
  return defaultValues;
}

function handleConfigContent(configObj, defaultValues) {
  const { content } = configObj;
  content.forEach(contentItem => {
    const { type, id, defaultValue } = contentItem;

    // Show example of slider with warnings
    // Ryan - write a function to automate the process to merge defaultValues from preset config settings to config params JSON IF a defaultValue does not exist in the settings object
    if (type === "setting" && defaultValue === undefined)
      console.warn(`${id} does not have a default value defined.`);

    if (type === "setting") defaultValues[id] = defaultValue;

    // BASE CASE - continue recursive function call if current object has content
    if (contentItem.hasOwnProperty("content"))
      handleConfigContent(contentItem, defaultValues);
  });
}
