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
                <ShapeE/>
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
]
let initialShapes = [
    { id: 0, type: 'circle', x: 50, y: 100 },
    { id: 1, type: 'square', x: 150, y: 100 },
    { id: 2, type: 'circle', x: 250, y: 100 },
]
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
function ShapeE(){
    const [shapes,setShapes] = useState(initialShapes)

    function handleClick(){
        const nextShape = shapes.map(s =>{
            if (s.type === "square"){
                return s
            }else {
                return {
                    ...s,
                    y:s.y + 50
                }
            }
        })
        setShapes(nextShape)
    }
    return(
        <>
        <button onClick={handleClick}>⬇</button>
            {shapes.map(s=>(
                <div key={s.id}
                style={{background:"purple",
                position:"absolute",
                left:s.x,
                top:s.y,
                borderRadius:s.type === "circle"?"50%":"",
                width:20,
                height:20}}></div>
            ))}
        </>
    )
}
export default App;
