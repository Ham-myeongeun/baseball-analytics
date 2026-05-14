function parseCSV(csv) {
    const rows = csv.trim().split('\n');
    if (rows.length < 2) return [];

    const headers = rows[0].split(',');
    const pick = (row, col) => {
        const i = headers.indexOf(col);
        return i >= 0 ? row[i] : null;
    };

    return rows.slice(1).map(line => {
        const row = line.split(',');
        return {
            pitch_type:   pick(row, 'pitch_type'),
            // 투구 위치
            plate_x:      parseFloat(pick(row, 'plate_x')),
            plate_z:      parseFloat(pick(row, 'plate_z')),
            // 타구 방향
            hc_x:         parseFloat(pick(row, 'hc_x')),
            hc_y:         parseFloat(pick(row, 'hc_y')),
            // 결과
            description:  pick(row, 'description'),
            events:       pick(row, 'events'),
            // 타구 분석
            launch_angle: parseFloat(pick(row, 'launch_angle')),
            launch_speed: parseFloat(pick(row, 'launch_speed')),
            hit_distance: parseFloat(pick(row, 'hit_distance_sc')),
        };
    }).filter(d => !isNaN(d.plate_x)); // 유효한 데이터만
}

module.exports = { parseCSV };