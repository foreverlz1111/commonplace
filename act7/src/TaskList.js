import {useTasks, useTasksDispatch} from "./TasksContext";
import {useState} from "react";

function Task({task}) {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useTasksDispatch()
    let taskContent
    if (isEditing) {
        taskContent = (
            <>
                <input value={task.text}
                       onChange={event => {
                           dispatch({
                               type: "changed",
                               task: {
                                   ...task,
                                   task: event.target.value
                               }
                           })
                       }}/>
                <button onClick={() => setIsEditing(false)}><b>Save</b></button>
            </>
        )
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>
                    <b>Edit</b>
                </button>
            </>
        )
    }
    return (
        <label>
            <input type="checkbox"
                   checked={task.done}
                   onChange={event => {
                       dispatch({
                           type: "changed",
                           task: {
                               ...task,
                               done: event.target.checked
                           }
                       })
                   }
                   }/>
            {taskContent}
            <button onClick={() => {
                dispatch({
                    type: "deleted",
                    id: task.id
                })
            }
            }><b>delete</b></button>
        </label>
    )
}

export default function TaskList() {
    const tasks = useTasks()
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task}/>
                </li>
            ))}
        </ul>
    )
}