const checkColor = (props) => {
    if(props === 'Baru Masuk') {
        return '#4F80A0';
    }
    if(props === 'Desain') {
        return '#3662D4';
    }
    if(props === 'Selesai Desain') {
        return '#8019DC';
    }
    if(props === 'Print') {
        return '#DC5019';
    }
    if(props === 'Press') {
        return '#26A8FF';
    }
    if(props === 'Jahit') {
        return '#DC19D9';
    }
    if(props === 'Pending') {
        return '#DC1957';
    }
    if(props === 'Finishing') {
        return '#C2D400';
    }
    if(props === 'Selesai Produksi') {
        return '#04C96D';
    }
    return '#00a6ff';
}

export default checkColor;