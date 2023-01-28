import './App.css';
import {useEffect, useRef, useState} from "react";

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

                <VideoPlay/>
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

export default App;
