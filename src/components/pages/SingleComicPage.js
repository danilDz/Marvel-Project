import { useParams, Link , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {loading, error, getComic, clearError} = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
        .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                {spinner}
                {errorMessage}
                {content}
            </ErrorBoundary>
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, prices, textObjects, pageCount} = comic
    const thumb = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
    const text = textObjects[0] ? textObjects[0].text : 'There isn\'t description of this comic!'
    // console.log(comic)
    const language = textObjects[0] ? textObjects[0].language : "not available"
    const price = prices[0] && prices[0].price != 0 ? prices[0].price + "$" : "not available"
    return (
        <div className="single-comic">
            <img src={thumb} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{text}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;