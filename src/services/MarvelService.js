import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=bd45ac9cd4c42c0d44799afb637c8179';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        let desc = ''
        if (char.description) {
            if (char.description.length < 210) {
                desc = char.description
            } else {
                desc = char.description.slice(0, 210) + '...'
            }
        } else {
            desc = 'Informaion about this character not found!'
        }
        return {
            name: char.name,
            description: desc,
            id: char.id,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return res.data.results[0]
    }

    const getCharByName = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=bd45ac9cd4c42c0d44799afb637c8179`)
        return res.data.results
    }

    return {loading, error, process, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharByName, setProcess}
}

export default useMarvelService;