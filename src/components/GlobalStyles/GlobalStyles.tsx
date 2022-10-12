import './GlobalStyles.css';
import {ReactNode, ReactElement} from 'react'

interface IChildern {
    children: ReactElement
}
function GlobalStyless({ children } : IChildern) {
    return children;
}

export default GlobalStyless;
