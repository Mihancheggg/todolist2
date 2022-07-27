import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {v1} from 'uuid';
import {ButtonAppBar} from './Components/ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './State/Reducers/TodolistsReducer';
import {
    addTaskActionCreator,
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
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

    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskActionCreator(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskActionCreator(title, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusActionCreator(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleActionCreator(id, newTitle, todolistId))
    }

    function removeTodolist(id: string) {
        let action = removeTodolistAC(id)
        dispatch(action)
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch(changeTodolistTitleAC(id, title))
    }

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
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
