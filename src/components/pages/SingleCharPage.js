import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import useMarvelService from "../../services/MarvelService";

import './singleComic.scss';
import AppBanner from "../appBanner/AppBanner";

const SingleCharPage = () => {
    const {charName} = useParams()
    const [char, setChar] = useState(null)
    const {loading, error, getCharByName, clearError} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [charName])

    const updateChar = () => {
        clearError()
        getCharByName(charName)
        .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char[0])
    }

    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

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

const View = ({char}) => {
    const {thumbnail, name, description} = char
    const thumb = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null
    return (
        <div className="single-comic">
            <img src={thumb} alt={name} className="single-comic__img_char"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description.length > 0 ? description : 'There isn\'t description of this character!'}</p>
            </div>
        </div>
    )
}

export default SingleCharPage