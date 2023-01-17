import './App.css';
import {people} from "./data";
import {getImageUrl} from "./utils";

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

                <List></List>
            </header>
        </div>
    );
}

function List() {
    console.log("key:", Math.random())
    return people.map((p) =>
        <li key={p.id}>
            <img src={getImageUrl(p)}
                 alt={p.name}></img>
            <p>
                <b>{p.name}</b>
                {" " + p.profession + ""}
                known for {p.accomplishment}
            </p>
        </li>
    )
}

export default App;
