import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {ButtonAppBar} from './Components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './State/Reducers/TodolistsReducer';
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from './State/Reducers/TasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './State/Store';
import {TasksStateType, TodolistType} from './App';

export type FilterValuesType = 'all' | 'active' | 'completed';

/*export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}*/

export function AppWithRedux() {

    /*let todolistId1 = v1();
    let todolistId2 = v1();*/

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskActionCreator(id, todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskActionCreator(title, todolistId))
    },[dispatch])

    const changeFilter =useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) =>  {
        dispatch(changeTaskStatusActionCreator(id, isDone, todolistId))
    },[dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) =>  {
        dispatch(changeTaskTitleActionCreator(id, newTitle, todolistId))
    },[dispatch])

    const removeTodolist = useCallback((id: string) => {
        let action = removeTodolistAC(id)
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    },[dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px 10px 20px 10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {


                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasks[tl.id]}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
