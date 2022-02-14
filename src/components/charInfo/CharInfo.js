import { Component } from 'react';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            character: null,
            loading: false,
            error: false
        }
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.updateCharacter();
        }
    }

    onCharLoaded = (res) => {
        this.setState({
            character: res,
            loading: false,
            error: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {
        if (!this.props.id) {
            return;
        }
        this.onCharLoading()
        this.marvelService.getCharacter(this.props.id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    render() {
        const {loading, error, character} = this.state

        const skeleton = loading || error || character ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(error || loading || !character) ? <View character={character}/> : null
        return (
            <div className="char__info">
                {/* <Skeleton/> */}
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
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
                    if (i > 9) {
                        return
                    }
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

export default CharInfo;