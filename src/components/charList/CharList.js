import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../error/ErrorMessage';
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newLoading, setNewLoading] = useState(false)
    const [offset, setOffset] = useState(219)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService()

    useEffect(() => {
        onLoadContent(true)
    }, [])  

    const onLoadContent = (initial = false) => {
        setNewLoading(initial)
        getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (charlist) => {
        let ended = false
        if (charlist.length < 9) {
            ended = true
        }
        const newArr = [...charList, ...charlist]

        setCharList(charList => newArr)
        setNewLoading(newLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const itemsRef = useRef([])

    const onClickCharacter = (id) => {
        itemsRef.current.map(item => {
            item.classList.remove('char__item_selected')
        })
        itemsRef.current[id].classList.add('char__item_selected')
        itemsRef.current[id].focus()
    }

    function renderItems(charList) {

        const duration = 300;

        const items = charList.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <CSSTransition key={item.id} timeout={duration} classNames='char__item'>
                    <li className="char__item"
                    tabIndex={0}
                    key={item.id}
                    ref={el => itemsRef.current[i] = el}
                    onClick={() => {
                        props.getId(item.id); 
                        onClickCharacter(i)
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>      
                </CSSTransition>
            )
        })
        return(
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(charList)

    const newLoadingList = newLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newLoading ? <Spinner/>: null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            {newLoadingList}
            <button 
                className="button button__main button__long"
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={onLoadContent}
                disabled={newLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    getId: PropTypes.func.isRequired
}

export default CharList;