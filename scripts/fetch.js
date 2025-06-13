

export const fetchReportsNZ = async (minMMI) => {
    const url = `https://api.geonet.org.nz/quake?MMI=${minMMI}`
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json
    } catch (err) {
       return (err)
    }
};

