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

function Item({p}) {
    return (
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

function List() {
    console.log("key:", Math.random())
    const chemists = people.filter(p => p.profession === "chemist")
    const others = people.filter(p => p.profession !== "chemist")
    return (
        [
            chemists.map(chemist =>
                <Item key={Math.random()} p={chemist}></Item>),
            others.map(other =>
                <Item key={Math.random()} p={other}></Item>)
        ]
    )
}

export default App;
