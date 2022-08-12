import {Provider} from 'react-redux';
import {AppRootStateType, store} from '../../State/Store';
import {combineReducers, legacy_createStore as createStore} from 'redux';
import {tasksReducer} from '../../State/Reducers/TasksReducer';
import {todolistsReducer} from '../../State/Reducers/TodolistsReducer';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: '1', title: 'What to learn', filter: 'all'},
        {id: '2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['1']: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        ['2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ]
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}