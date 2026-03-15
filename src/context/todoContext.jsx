import {createContext, useReducer} from 'react';
import reducer from "../reducers/TodoReducer";
export const TodoContext = createContext([]);
const TodoProvider = ({children}) =>{
    const [todos,todosDispatch] = useReducer(reducer,[]);
    return (
        <TodoContext.Provider value={{ todos: todos,dispatch: todosDispatch }}>
        {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider;

  