import {useState} from "react";
import {useTasksDispatch} from "./TasksContext";

let nextId = 3
export default function AddTask() {
    const [text, setText] = useState("")
    const dispatch = useTasksDispatch()
    return (
        <>
            <input placeholder="Add"
                   value={text}
                   onChange={event => setText(event.target.value)}/>
            <button onClick={() => {
                setText("")
                dispatch({
                    type: "added",
                    id: nextId++,
                    text: text
                })
            }}><b>+</b></button>
        </>

    )
}