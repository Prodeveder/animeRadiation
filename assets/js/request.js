
const SearchAnime = async (q) => {
    let url = `https://api.jikan.moe/v4/anime?q=${q}`;
    const response = await (await(await( fetch(url))).json()).data;

    return response
}

const HeaderAnime = async () => {
    let url = `https://api.jikan.moe/v4/top/anime`;
    const response = await (await(await( fetch(url))).json()).data;

    return response
}

const RecommendationAnime = async () => {
    let url = `https://api.jikan.moe/v4/recommendations/anime`;
    const response = await (await(await( fetch(url))).json()).data;

    return response
}



export { SearchAnime, HeaderAnime };