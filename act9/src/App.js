import './App.css';
import {useEffect, useRef, useState} from "react";
let didInit = false
function App() {
    useEffect(()=>{
        if(!didInit){
            didInit = true
            //do something
        }
    },[])
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

                <Clock/>
                <VideoPlay/>
                <ChatRoom/>
            </header>
        </div>
    );
}

function MyVideo({src, isPlaying}) {
    const ref = useRef(null)

    useEffect(() => {
        if (isPlaying) {
            ref.current.play()
        } else {
            ref.current.pause()
        }
    })

    return <video ref={ref} src={src} loop playsInline/>
}

function VideoPlay() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <button onClick={() => setIsPlaying(!isPlaying)}>
                Now:{isPlaying ? 'Pause' : 'Play'}</button>
            <MyVideo isPlaying={isPlaying}
                     src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"/>
        </>
    )
}

function ChatRoom() {
    useEffect(() => {

        const connect = createConnection()
        connect.connect()
        return () => {
            connect.disconnect()
        }
    }, [])
    return <h1>Welcome</h1>
}

function createConnection() {
    // A real implementation would actually connect to the server
    return {
        connect() {
            console.log('✅ Connecting...');
        },
        disconnect() {
            console.log('❌ Disconnected.');
        }
    };
}

function MyClock() {
    const [text, setText] = useState("text")

    useEffect(() => {
        function onTimeOut() {
            console.log("Time Out " + text)
        }

        console.log("schedule " + text + " log")
        const timeOutId = setTimeout(onTimeOut, 3000)
        return () => {
            console.log("cancel " + text + " log")
            clearTimeout(timeOutId)
        }
    }, [text])
    return (
        <>
            <label>
                Log:{' '}
                <input value={text}
                       onChange={e => setText(e.target.value)}/>
            </label>
            <h1>{text}</h1>
        </>
    )
}

function Clock() {
    const [show, setShow] = useState(false)
    return (
        <>
            <button onClick={() => {
                setShow(!show)
            }}>{show ? "Unmount" : "Mount"}</button>
            {show && <hr/>}
            {show && <MyClock/>}
        </>
    )
}

export default App;
