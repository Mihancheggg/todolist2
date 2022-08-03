import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    },[props.addTask,props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    },[props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.changeTodolistTitle, props.id])

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    let tasksForTodolist = [...props.tasks];

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    /*const removeTask = useCallback((taskID: string) => {
        props.removeTask(taskID, props.id)
    }, [props.removeTask, props.id])

    const changeTaskStatus = useCallback((id: string, isDone: boolean) => {
        props.changeTaskStatus(id, isDone, props.id)
    }, [props.changeTaskStatus, props.id])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.id)
    }, [props.changeTaskTitle, props.id])*/

    /*const tasksWithUseMemo = useMemo(()=>{
        return tasksForTodolist.map(t => {
            return <Task key={t.id} task={t} todolistID={props.id}/>
        })
    },[tasksForTodolist, props.filter])
*/

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => {

                    /*const changeTaskStatusHandler =(isDone: boolean)=>{
                        props.changeTaskStatus(t.id, isDone, props.id)
                    }*/

                    return <Task key={t.id} task={t} todolistID={props.id}/>
                })
            }
        </ul>
        <div>

            <Button size="small" onClick={onAllClickHandler} color="secondary"
                    variant={props.filter === 'all' ? 'outlined' : 'contained'}>All</Button>
            <Button size="small" onClick={onActiveClickHandler} color="success"
                    variant={props.filter === 'active' ? 'outlined' : 'contained'}>Active</Button>
            <Button size="small" onClick={onCompletedClickHandler} color="error"
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}>Completed</Button>

        </div>
    </div>
})


