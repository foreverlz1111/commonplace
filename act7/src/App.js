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

export default App;
