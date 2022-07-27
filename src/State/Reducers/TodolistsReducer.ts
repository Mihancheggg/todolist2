import {FilterValuesType, TodolistType} from '../../App';
import {v1} from 'uuid';

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: tsarType):Array<TodolistType>  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.payload.todolistID, title: action.payload.newTodolistTitle, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                filter: action.payload.newFilter
            } : el)
        }
        default:
            return state
    }
}

type tsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export type addTodolistACType = ReturnType<typeof addTodolistAC>

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId: todolistId
        }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle: newTodolistTitle,
            todolistID: v1()
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId2, newTodolistTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId2, newFilter}
    } as const
}