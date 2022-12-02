const dateFormat = props => {
    const tgl = new Date(props);
    const yyyy = tgl.getFullYear();
    let mm = tgl.getMonth() + 1;
    let dd = tgl.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;
    return formatted;
}

export default dateFormat;