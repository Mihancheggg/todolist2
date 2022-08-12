import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'ToDoList/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const changeTaskStatusActionCreator = action('Status changed')

const BaseArgs = {
    changeTaskStatus: changeTaskStatusActionCreator,

}

export const TaskStory = Template.bind({});

TaskStory.args = {
...BaseArgs,
    task: {id:'1', isDone: false, title: 'JS'},
    todolistID: 'todolistID1'
}