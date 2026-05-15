function parseCSV(csv) {
  const cleaned = csv.replace(/^\uFEFF/, "").trim();
  const rows = cleaned.split("\n");
  console.log("총 행 수:", rows.length);
  if (rows.length < 2) return [];
  const headers = rows[0].replace(/"/g, "").split(",");
  const pick = (row, col) => {
    const i = headers.indexOf(col);
    return i >= 0 ? row[i] : null;
  };
  return rows.slice(1)
    .filter(line => line.trim().length > 0)
    .map(line => {
      const row = line.replace(/"/g, "").split(",");
      return {
        pitch_type:   pick(row, "pitch_type"),
        plate_x:      parseFloat(pick(row, "plate_x")),
        plate_z:      parseFloat(pick(row, "plate_z")),
        hc_x:         parseFloat(pick(row, "hc_x")),
        hc_y:         parseFloat(pick(row, "hc_y")),
        description:  pick(row, "description"),
        events:       pick(row, "events"),
        launch_angle: parseFloat(pick(row, "launch_angle")),
        launch_speed: parseFloat(pick(row, "launch_speed")),
        hit_distance: parseFloat(pick(row, "hit_distance_sc")),
      };
    }).filter(d => !isNaN(d.plate_x));
}
module.exports = { parseCSV };