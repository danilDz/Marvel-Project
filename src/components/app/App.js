import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
// import ScrollTop from "../scrollTop/ScrollTop";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [id, setId] = useState(null)

    const getId = (id) => {
        setId(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList getId={(id) => getId(id)}/>
                    </ErrorBoundary>
                    
                    <ErrorBoundary>
                        <CharInfo id={id}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;