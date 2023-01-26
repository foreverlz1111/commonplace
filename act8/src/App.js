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
                <CatScroll/>
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


function CatScroll() {
    const firstref = useRef(null)
    const secondref = useRef(null)
    const thirdref = useRef(null)

    const Cats = [
        {src: "https://placekitten.com/g/200/200", alt: "Tom", ref: firstref},
        {src: "https://placekitten.com/g/300/200", alt: "Maru", ref: secondref},
        {src: "https://placekitten.com/g/250/200", alt: "Jellylorum", ref: thirdref},
    ]

    function handleScrollToFirst() {
        firstref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
    }

    function handleScrollToSecond() {
        secondref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
    }

    function handleScrollToThird() {
        thirdref.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
    }

    return (
        <>
            <nav>
                <button onClick={handleScrollToFirst}>1</button>
                <button onClick={handleScrollToSecond}>2</button>
                <button onClick={handleScrollToThird}>3</button>
            </nav>
            <div>
                <ul>
                    {Cats.map(c => (
                        <li><img src={c.src} alt={c.alt} ref={c.ref}/></li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App;
