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

                <AddingA/>
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


let initialArtists = [
    {id: 0, name: 'Marta Colvin Andrade'},
    {id: 1, name: 'Lamidi Olonade Fakeye'},
    {id: 2, name: 'Louise Nevelson'},
];

function AddingA() {

    const [name, setName] = useState("")
    const [artists, setArtists] = useState(initialArtists)
    // let nextId = artists.length
    return (
        <>
            <h1>The List:</h1>
            <input value={name}
                   onChange={e => setName(e.target.value)}/>
            <button onClick={() => {
                setName("")
                setArtists([
                    {id: Math.random(), name: name},
                    ...artists
                ])
            }
            }><b>+</b></button>
            <ul>
                {artists.map(artist =>
                    <li key={artist.id}>{artist.name}
                        <button onClick={() => {
                            setArtists(
                                artists.filter(a => a.id !== artist.id)
                            )
                        }
                        }><b>-</b></button>
                    </li>
                )}
            </ul>
        </>
    )
}

export default App;
