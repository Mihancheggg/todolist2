import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from '../EditableSpan';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'ToDoList/EditableSpan',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        onChange: {
            description: 'Value changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
onChange: action('Value changed')
}