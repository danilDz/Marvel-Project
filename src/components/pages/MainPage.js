import { useState } from "react";
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../form/CharSearchForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [id, setId] = useState(null)

    const getId = (id) => {
        setId(id)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList getId={(id) => getId(id)}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo id={id}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm/>
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage