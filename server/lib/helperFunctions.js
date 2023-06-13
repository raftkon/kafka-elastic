import fs from "fs";

async function writeJSON(data) {
  const jsonContent = JSON.stringify(data);
  console.log("Writing data to JsSON file");
  fs.writeFile("murder_case_newData.json", jsonContent, "utf-8", () => {
    console.log("Writing data completed!");
  });
}

function readJSON(filename) {
  try {
    console.log("Reading data from JSON file");
    const data = fs.readFileSync(filename);
    console.log("Reading data completed!");
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}
async function readXLSX(filename) {
  const workbook = XLSX.readFile(filename);
  const worksheet = workbook.Sheets["Data"];
  const parsedData = XLSX.utils.sheet_to_json(worksheet);
  await writeJSON(parsedData);
  return parsedData;
}

function transformEarthquakeData(data) {
  return data.map((doc) => {
    const { time, place, url, detail, title } = doc.properties;
    const [longitude, latitude, depth] = doc.geometry.coordinates;
    return {
      time,
      place,
      url,
      detail,
      title,
      depth,
      latitude,
      longitude,
    };
  });
}

export default {
  readJSON,
  writeJSON,
  readXLSX,
  transformEarthquakeData,
};
