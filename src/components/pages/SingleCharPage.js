import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import './singleComic.scss';
import AppBanner from "../appBanner/AppBanner";

const SingleCharPage = () => {
    const {charName} = useParams()
    const [char, setChar] = useState(null)
    const {getCharByName, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [charName])

    const updateChar = () => {
        clearError()
        getCharByName(charName)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char[0])
    }

    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                {setContent(process, View, char)}
            </ErrorBoundary>
        </>
        
    )
}

const View = ({data}) => {
    const {thumbnail, name, description} = data
    const thumb = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character page`}
                />
                <title>{`${name}`}</title>
            </Helmet>
            <img src={thumb} alt={name} className="single-comic__img_char"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description.length > 0 ? description : 'There isn\'t description of this character!'}</p>
            </div>
        </div>
    )
}

export default SingleCharPage