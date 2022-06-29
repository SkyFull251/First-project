const postData = async (url, data) => {
    const dataServ = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await dataServ.json();
};

const getResource = async (url) => {
    const dataServ = await fetch(url);

    if(!dataServ.ok){
        throw new Error(`Could not fetch ${url}, stutus: ${dataServ.status}`);
    }

    return await dataServ.json();
};

export {postData};
export {getResource};