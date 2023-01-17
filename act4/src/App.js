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
                <Poem/>
                <List/>

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

const poem = {
    lines: [
        'I write, erase, rewrite',
        'Erase again, and then',
        'A poppy blooms.',
    ]
};

function Poem() {
    const p = poem.lines.map((line, index) =>
        [<p key={index}>{line}</p>,
            index === (poem.lines.length - 1) ? "" : <hr key={Math.random()}/>]
    )
    return (
        <article key={Math.random()}>
            {p}
        </article>
    )
}

export default App;
