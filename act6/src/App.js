import './App.css';
import {useState} from "react";

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

                <MoveDot/>
            </header>
        </div>
    );
}

function MoveDot() {
    const [position, setposition] = useState({
        x: 0,
        y: 0
    })
    return (
        <div onPointerMove={(e) => {
            setposition({
                x: e.clientX + 10,
                y: e.clientY - 25
            })
        }}
             style={{
                 position: "relative",
                 width: "100vw",
                 height: "100vh"
             }}>
            <div style={{
                position: "absolute",
                background: "red",
                borderRadius: "50%",
                transform: `translate(${position.x}px, ${position.y}px)`,
                left: -10,
                top: -10,
                width: 20,
                height: 20
            }}>

            </div>
        </div>
    )
}

export default App;
