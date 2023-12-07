import flattenJson from "./flatten.js";
import assignNestedValue from "./assignNestedValue.js";

function isValidJson(obj) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

function transformJson(inputJson, outputFormatJson, mappingJson) {
  if (!inputJson || !outputFormatJson || !mappingJson) {
    throw new Error("Invalid Input. Please check your input and try again");
  }

  if (!isValidJson(inputJson)) {
    throw new Error("Invalid input JSON");
  }
  if (!isValidJson(outputFormatJson)) {
    throw new Error("Invalid output format JSON");
  }
  if (!isValidJson(mappingJson)) {
    throw new Error("Invalid mapping JSON");
  }
  const flattenedInput = flattenJson(inputJson);
  const output = JSON.parse(JSON.stringify(outputFormatJson));

  for (const [inputKey, outputKey] of Object.entries(mappingJson)) {
    if (inputKey.includes("{")) {
      const pattern = /\{([^}]+)\}/g;
      let value = inputKey;
      let match;

      while ((match = pattern.exec(inputKey)) !== null) {
        const keyToReplace = match[1];
        const valueToReplace = flattenedInput[keyToReplace] || "";
        value = value.replace(match[0], valueToReplace);
      }

      assignNestedValue(output, outputKey, value.trim());
    } else {
      const inputValue = flattenedInput[inputKey];
      if (inputValue !== undefined) {
        assignNestedValue(output, outputKey, inputValue);
      }
    }
  }

  return output;
}

export default transformJson;
