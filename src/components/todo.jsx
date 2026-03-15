import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../index.css";
import { TodoContext } from "../context/todoContext";
import { ToastContext } from "../context/toastContext";
import { useContext } from "react";
export default function ToDo({ todo, onDelete ,onEdit}) {
  let [todos, setTodos] = useContext(TodoContext);
  const { showHideSnackbar } = useContext(ToastContext);

  function handleDoneClick2(taskID) {
    const newTodos = todos.map((item) => {
      if (item.id === taskID) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    showHideSnackbar(todo.isCompleted ? "Task marked as  completed!" : "Task marked as not completed!");
  }
 
  

 

  return (
    <>
     
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          backgroundColor: "#5E9FF2",
          p: 1,
          borderRadius: 2,
          transition: "padding 0.3s, box-shadow 0.3s",
          "&:hover": {
            p: 2,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white" }}>
              {todo.details}
            </Typography>
          </CardContent>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => handleDoneClick2(todo.id)}
            sx={{
              backgroundColor: todo.isCompleted ? "#3adf4a" : "white",
              "&:hover": {
                backgroundColor: todo.isCompleted ? "#3adf4a" : "#e0e0e0",
              },
              color: todo.isCompleted ? "white" : "#5E9FF2",
              width: 40,
              height: 40,
            }}
          >
            <DoneIcon />
          </IconButton>

          <IconButton
            onClick={() => onEdit(todo.id)}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#e0e0e0" },
              color: "#5E9FF2",
              width: 40,
              height: 40,
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => onDelete(todo.id)}
            sx={{
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#e0e0e0" },
              color: "red",
              border: "1px solid red",
              width: 40,
              height: 40,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
}
