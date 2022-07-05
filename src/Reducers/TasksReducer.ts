import {TaskType} from '../Todolist';

export const TasksReducer = (state: Array<TaskType>, action: any) => {
    switch (action.type){
        case 'REMOVE-TASK': {
            return state
        }
        default: {
            return state
        }
    }
};

type ActionCreatorsType = RemoveTaskActionCreatorType

//type RemoveTaskActionCreatorType = ReturnType<typeof removeTaskActionCreator>
type RemoveTaskActionCreatorType = ReturnType<typeof removeTaskActionCreator>

const removeTaskActionCreator = () => {
    return {
        type: 'REMOVE-TASK',
        payload: {

        }
    } as const
}