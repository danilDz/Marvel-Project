class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=bd45ac9cd4c42c0d44799afb637c8179';
    _baseOffset = 210;

    getResources = async (url) => {
        let data = await fetch(url);

        if (!data.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${data.status}`);
        }

        return await data.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
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
        // console.log(char.comics.items)
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
}

export default MarvelService;