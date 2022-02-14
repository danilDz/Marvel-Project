import { Component } from "react";

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        charList: [],
        loading: true,
        newLoading: false,
        error: false,
        offset: 219,
        charEnded: false
    }

    marvelService = new MarvelService()

    componentDidMount () {
        this.marvelService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }  

    onCharListLoaded = (charList) => {
        let ended = false
        if (charList.length < 9) {
            ended = true
        }
        const newArr = [...this.state.charList, ...charList]
        this.setState({
            charList: newArr,
            newLoading: false,
            loading: false,
            offset: this.state.offset + 9,
            charEnded: ended
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onClickCharacter = (id) => {
        document.querySelectorAll('.char__item').forEach(item => {
            // console.log(item.getAttribute('data-key'))
            item.classList.remove('char__item_selected')
            if (item.getAttribute('data-key') == id) {
                item.classList.add('char__item_selected')
            }
        })
    }

    renderItems(charList) {
        const items = charList.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className="char__item" data-key={item.id} key={item.id} onClick={() => {this.props.getId(item.id); this.onClickCharacter(item.id)}}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    onCharListLoading = () => {
        this.setState({
            newLoading: true
        })
    }

    onLoadContent = () => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(this.state.offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    }

    render () {
        const {charList, loading, error, newLoading, charEnded} = this.state

        const items = this.renderItems(charList)

        const newLoadingList = newLoading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/>: null
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                {newLoadingList}
                <button 
                    className="button button__main button__long"
                    style={charEnded ? {display: 'none'} : null}
                    onClick={this.onLoadContent}
                    disabled={newLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    } 
}

export default CharList;