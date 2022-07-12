import React, {ChangeEvent} from 'react';

type CheckBoxComponentPropsType = {
    isDone: boolean
    callback: (isDone: boolean) => void
}

export const CheckBoxComponent = (props: CheckBoxComponentPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.callback(newIsDoneValue)
        //props.changeTaskStatus(t.id, newIsDoneValue, props.id);
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone}/>
    );
};

