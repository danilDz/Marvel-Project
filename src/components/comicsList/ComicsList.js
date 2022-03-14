import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [newLoading, setNewLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)


    const {loading, error, getAllComics} = useMarvelService() 

    useEffect(() => {
        onLoadContent(true)
    }, [])

    const onLoadContent = (initial = false) => {
        setNewLoading(initial)
        getAllComics(offset)
        .then(onComicsListLoaded)
        // .catch(setNewLoading(false))
    }

    const onComicsListLoaded = (list) => {
        let ended = false
        if (list.length < 8) {
            ended = true
        }
        const newArr = [...comicsList, ...list]

        setComicsList(comicsList => newArr)
        setNewLoading(newLoading => false)
        setOffset(offset => offset + 8)
        setCharEnded(charEnded => ended)
    }

    function renderItems(comicsList) {
        const items = comicsList.map((item, i) => {
            const thumbnail = `${item.thumbnail.path}.${item.thumbnail.extension}`
            return (
                <li className="comics__item"
                    key={i}
                    tabIndex={0}>
                    <a href="#">
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price}$</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = renderItems(comicsList)
    const newLoadingList = newLoading && !error ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newLoading ? <Spinner/>: null

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            {newLoadingList}
            <button className="button button__main button__long"
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={onLoadContent}
                    disabled={newLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;