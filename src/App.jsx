import React from 'react'
import ToDoList from './todoList'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/Theme';
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodoContext } from './context/todoContext';
import SnackBarr from './components/SnackBar';
import { ToastContext } from './context/toastContext';
import TodoProvider from './context/todoContext';
const inittodos = [
  {
    id: uuidv4(),
    title: "Learning React",
    details: "redux,react router,context api",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learning JavaScript",
    details: "variables,functions,objects",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Learning Next.js",
    details: "pages,api routes,server side rendering",
    isCompleted: false,
  },
];
function App() {
    let [todos, setTodos] = useState(inittodos);
     const [open, setOpen] = React.useState(false);
     const [message, setMessage] = useState("");
     function showHideSnackbar(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    
<ThemeProvider theme={theme}>
<CssBaseline />
<TodoProvider>
 <ToastContext.Provider value={{showHideSnackbar}} >
  <div className='font-sofia' style={{ display:"flex",alignItems:"center",height:"100vh",backgroundColor: 'black' }} >
  
    <ToDoList />
    <SnackBarr open={open} message={message}/>
  
  </div>
 </ToastContext.Provider>
    </TodoProvider>
  </ThemeProvider>
 
  )
}

export default App
