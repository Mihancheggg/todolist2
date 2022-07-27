import {userReducer} from './UserReducer';

type StartStateType = {
    age: number,
    childrenCount: number,
    name: string
}

let startState: StartStateType

beforeEach(() => {
    startState = { age: 20, childrenCount: 2, name: 'Dimych' };
})

test('user reducer should increment only age', () => {

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {

    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' })

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
    // your code here
});

test('user reducer should change name of user', () => {
    const newName = 'Viktor';
    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName })

    expect(endState.name).toBe(newName);
});
