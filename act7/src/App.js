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

                <Form/>
                <Accordion/>
            </header>
        </div>
    );
}

function Form() {
    const [answer, setAnswer] = useState("")
    const [error, setError] = useState(null)
    const [status, setStatus] = useState("typing")

    if (status === "success") {
        return (<h1>GOOD!</h1>)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        try {
            await submitForm(answer)
            setStatus("success")
        } catch (err) {
            setStatus("typing")
            setError(err)
        }
    }

    function handleTextareaChange(e) {
        setAnswer(e.target.value)
    }

    return (
        <>
            <h2>Input opt</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={answer}
                          onChange={handleTextareaChange}
                          disabled={status === "submitting"}/>
                <br/>
                <button disabled={answer.length === 0 || status === "submitting"}>submit</button>
                {error != null && <p>{error.message}</p>}
            </form>
        </>
    )
}

function submitForm(answer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== "opt"
            if (shouldError) {
                reject(new Error("Wrong,try again"))
            } else {
                resolve()
            }
        }, 500)
    })
}
function Accordion() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <h2>Almaty, Kazakhstan</h2>
            <Panel
                title="About"
                isActive={activeIndex === 0}
                onShow={() => setActiveIndex(0)}
            >
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel
                title="Etymology"
                isActive={activeIndex === 1}
                onShow={() => setActiveIndex(1)}
            >
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>
        </>
    );
}

function Panel({
                   title,
                   children,
                   isActive,
                   onShow
               }) {
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={onShow}>
                    Show
                </button>
            )}
        </section>
    );
}
export default App;
