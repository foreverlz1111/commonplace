import './App.css';
import {useEffect, useState} from "react";
import {showNotification} from "./notifications";
import {createConnection} from "./chat";

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

                <MyChatRoom/>
            </header>
        </div>
    );
}

const serverUrl = "https://localhost:1234"

function ChatRoom({roomId, theme}) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId)
        connection.on("connected", () => {
            showNotification("Connected!", theme && "dark")
        })
        connection.connect()
        return () => connection.disconnect()
    }, [roomId, theme])
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
