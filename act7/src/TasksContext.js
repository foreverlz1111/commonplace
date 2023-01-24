import {createContext, useContext, useReducer} from "react";

const TasksContext = createContext(null)
const TasksDispatchContext = createContext(null)

export default function TasksProvider({children}) {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    )
    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider
                value={dispatch}
            >
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasks() {
    return useContext(TasksContext)
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext)
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case "added": {
            return [
                ...tasks, {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        }
        case "changed": {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task
                } else {
                    return t
                }
            })
        }
        case "deleted": {
            return tasks.filter(t => t.id !== action.id)
        }
        default: {
            throw Error("未知操作" + action.type)
        }
    }
}

const initialTasks = [
    {id: 0, text: "Jooooooo", done: true},
    {id: 1, text: "axxhhhoowo", done: true},
    {id: 2, text: "dddows", done: true}
]