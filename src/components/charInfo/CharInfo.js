import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateCharacter()
    }, [props.id])

    const onCharLoaded = (res) => {
        setCharacter(character => res)
        setLoading(loading => false)
        setError(error => false)
    }

    const onCharLoading = () => {
        setLoading(loading => true)
    }

    const onError = () => {
        setLoading(loading => false)
        setError(error => true)
    }

    const updateCharacter = () => {
        if (!props.id) {
            return;
        }
        onCharLoading()
        marvelService.getCharacter(props.id)
        .then(onCharLoaded)
        .catch(onError)
    }

    const skeleton = loading || error || character ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(error || loading || !character) ? <View character={character}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({character}) => {
    const {name, thumbnail, homepage, wiki, description, comics} = character
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <>
            <div className="char__basics">
                <img src={character.thumbnail} alt={name} style={imgStyle}/>
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
                    // eslint-disable-next-line
                    if (i > 9) return
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
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