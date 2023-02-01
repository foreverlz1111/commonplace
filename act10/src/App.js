import './App.css';
import {useEffect, useState} from "react";
import {showNotification} from "./notifications";
import {createConnection} from "./chat";

function App() {
    const [position, setPosition] = useState({x: 0, y: 0})
    const [canMove, setCanMove] = useState(true)

    function handleMove(e) {
        if (canMove) {
            setPosition({x: e.clientX, y: e.clientY})
        }
    }

    useEffect(() => {
        window.addEventListener("pointermove", handleMove)
        return () => window.removeEventListener("pointermove", handleMove)
    }, [canMove])

    return (
        <>
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

                    <Movable canMove={canMove}
                             setCanMove={setCanMove}/>
                    <MyChatRoom/>
                </header>
            </div>
            <div style={{
                position: "absolute",
                backgroundColor: "white",
                borderRadius: "50%",
                opacity: 0.5,
                transform: `translate(${position.x}px,${position.y}px)`,
                pointerEvents: "none",
                left: -10,
                top: -10,
                width: 20,
                height: 20
            }}/>
        </>

    );
}

const serverUrl = "https://localhost:1234"
const Connected_msg = "连接成功！"

function Movable({canMove, setCanMove}) {
    return (
        <>
            <span>
                <input type="checkbox"
                       checked={canMove}
                       onChange={event => setCanMove(event.target.checked)}>
                </input>Set dot move
            </span>
        </>
    )
}

function ChatRoom({roomId, theme}) {
    const onConnected = (() => {
        showNotification(Connected_msg, theme && "dark")
    })
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.on("connected", () => {
            onConnected()
        })
        connection.connect()
        return () => connection.disconnect()
    }, [roomId])
    return <h1>Welcome to : {roomId}</h1>
}

function MyChatRoom() {
    const [roomId, setRoomId] = useState("general")
    const [isDark, setIsDark] = useState(false)

    return (
        <>
            <label>
                Select:
                <select value={roomId}
                        onChange={e => setRoomId(e.target.value)}>
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <label>
                <input type="checkbox"
                       checked={isDark}
                       onChange={event => setIsDark(event.target.checked)}
                />Dark-Mode({isDark.toString()})
            </label>
            <hr/>
            <ChatRoom roomId={roomId}
                      theme={isDark}/>
        </>
    )
}

export default App;
