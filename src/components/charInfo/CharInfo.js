import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {

    const [character, setCharacter] = useState(null)

    const {getCharacter, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateCharacter()
    }, [props.id])

    const onCharLoaded = (res) => {
        setCharacter(character => res)
    }

    const updateCharacter = () => {
        if (!props.id) {
            return;
        }
        clearError()
        getCharacter(props.id)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, character)}
        </div>
    )
}

const View = ({data}) => {
    const {name, thumbnail, homepage, wiki, description, comics} = data
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character!'}
                {comics.map((item, i) => {
                    const id = item.resourceURI.slice(43)
                    
                    // eslint-disable-next-line
                    if (i > 9) return
                    return (
                        <Link key={i} to={`/comics/${id}`} className="char__comics-item">
                            {item.name}
                        </Link>
                    )
                })}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;