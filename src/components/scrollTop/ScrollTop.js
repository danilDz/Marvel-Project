import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faS } from "@fortawesome/free-solid-svg-icons";

import './scrollTop.scss';

const ScrollTop = () => {
    return(
        <div className="divScroll">
            <button className="scrollTop">
                <FontAwesomeIcon icon={faArrowUp}/>
            </button>
        </div>
        
    )
}

export default ScrollTop