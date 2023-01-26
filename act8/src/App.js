import './App.css';
import {useRef} from "react";

function App() {
    return (
        <div className="App">
            <header className="App-header">

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <Clicker/>
            </header>
        </div>
    );
}

function Clicker() {
    let ref = useRef(0)

    function handleClick() {
        ref.current = ref.current + 1
    }

    function handleClickFocus() {
        ref.current.focus()
    }

    return (
        <>
            <p>(Won't ReRender)ref:{ref.current}</p>
            <input ref={ref}/>
            <button onClick={handleClickFocus}><b>+</b></button>
        </>
    )
}

export default App;
