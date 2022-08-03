import React, {useCallback} from 'react';
import {TaskType} from './Todolist';
import {CheckBoxComponent} from './Components/CheckBox';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from './State/Reducers/TasksReducer';

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const Task = React.memo(({task, todolistID}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskActionCreator(task.id, todolistID)),
        [dispatch, task.id, todolistID])
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     let newIsDoneValue = e.currentTarget.checked;
    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
    // }

    const onTitleChangeHandler = useCallback((newValue: string) => dispatch(changeTaskTitleActionCreator(task.id, newValue, todolistID)),
        [dispatch, task.id, todolistID])

    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <CheckBoxComponent
                callback={(isDone) => dispatch(changeTaskStatusActionCreator(task.id, isDone, todolistID))}
                isDone={task.isDone}/>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            {/*<Checkbox onChange={onChangeHandler} checked={t.isDone} />*/}
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete">
                <Delete/>
            </IconButton>
        </li>
    );
});

