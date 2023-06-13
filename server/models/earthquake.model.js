export default {
  name: "earthquakes",
  mapping: {
    "@timestamp": { type: "date" },
    place: { type: "text" },
    url: { type: "text" },
    detail: { type: "text" },
    title: { type: "text" },
    depth: { type: "long" },
    coordinates: { type: "geo_point" },
  },
  pipeline: {
    id: "earthquake-pipeline",
    processors: [
      {
        date: {
          field: "time",
          formats: ["UNIX_MS"],
        },
      },
      {
        remove: {
          field: "time",
          ignore_missing: true,
        },
      },
    ],
  },
};
