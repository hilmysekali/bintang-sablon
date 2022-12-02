//Jarak Tanggal
const checkDate = (date) => {
    const pisah = date.split(' ');
    const today = new Date(new Date().toISOString().substr(0, 10) + ' 00:00:00');
    const tgl = new Date(pisah[0] + ' 00:00:00');
    const bedaWaktu = today.getTime() - tgl.getTime();
    const bedaHari = parseInt(bedaWaktu / (1000 * 3600 * 24))
    if (bedaHari === 2) {
        const jarak = {
            warna: 'blue',
            interval: bedaHari
        };
        return jarak;
    } else if (bedaHari > 2 && bedaHari <= 4) {
        const jarak = {
            warna: '#FF8243',
            interval: bedaHari
        };
        return jarak;
    } else if (bedaHari > 4) {
        const jarak = {
            warna: 'red',
            interval: bedaHari
        };
        return jarak;
    } else {
        const jarak = {
            warna: 'black',
            interval: bedaHari
        };
        return jarak;
    }
}

export default checkDate;