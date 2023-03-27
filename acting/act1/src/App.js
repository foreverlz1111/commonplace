import {useState} from "react";
import './App.css';

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};
const products = [
    {title: 'Cabbage', isFruit: false, id: 1},
    {title: 'Garlic', isFruit: false, id: 2},
    {title: 'Apple', isFruit: true, id: 3},
]

function App() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
        alert("You click me! count = " + count.toString())
    }

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
                <MyButton count={count} onClick={handleClick}/>
                <MyButton count={count} onClick={handleClick}/>
                <MyJSX></MyJSX>
                <MyUser></MyUser>
                <Mylist></Mylist>
            </header>
        </div>
    );
}

function MyButton({count, onClick}) {
    //共享变量
    return (
        <button onClick={onClick}>Clicked : {count}</button>
    )
}

function MyJSX() {
    return (
        <>
            <h1>About</h1>
            <p>Hello there,<br/>How are you?</p>
        </>
    )
}

function MyUser() {
    return (
        <>
            <h1>{user.name}</h1>
            <img style={{
                borderRadius: 50,
                width: user.imageSize,
                height: user.imageSize
            }}
                 src={user.imageUrl}
                 alt={"Photo of" + user.name}
            />
        </>
    )
}

function Mylist() {
    const listItems = products.map(product =>
        <li style={{listStyle: "none", color: product.isFruit ? "magenta" : "darkgreen"}}
            key={product.id}>{product.title}
        </li>
    )
    return (
        <ul>{listItems}</ul>
    )
}

export default App;
