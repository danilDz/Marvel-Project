import { useParams, Link , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Helmet} from 'react-helmet';

import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {getComic, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
        .then(onComicLoaded)
        .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                {setContent(process, View, comic)}
            </ErrorBoundary>
        </>
    )
}

const View = ({data}) => {
    const {thumbnail, title, prices, textObjects, pageCount} = data
    const thumb = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
    const text = textObjects[0] ? textObjects[0].text : 'There isn\'t description of this comic!'
    const language = textObjects[0] ? textObjects[0].language : "not available"
    const price = prices[0] && prices[0].price != 0 ? prices[0].price + "$" : "not available"
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
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