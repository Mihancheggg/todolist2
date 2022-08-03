import React, {ChangeEvent, useCallback, useState} from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(props.value);
    },[props.value])
    const activateViewMode = useCallback(() => {
        setEditMode(false);
        props.onChange(title);
    },[props.onChange])
    const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    },[])

    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
