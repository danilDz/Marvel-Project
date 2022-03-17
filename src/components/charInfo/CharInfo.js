import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [character, setCharacter] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService()

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