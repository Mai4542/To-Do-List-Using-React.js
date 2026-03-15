import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import ToDo from "./components/todo";
import Add from "./components/inputAdd";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { TodoContext } from "./context/todoContext";
import { useContext, useEffect, useMemo } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContext } from "./context/toastContext";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function ToDoList() {
  let [header, setHeader] = useState("My Tasks");
  let {todos,dispatch} = useContext(TodoContext);
  const { showHideSnackbar } = useContext(ToastContext);
  let [filterTodos, setFilterTodos] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editdata, setEditdata] = useState({
  title: "",
  details: "",
  id: null
});
  
  let completedTodos = useMemo(() => {
    return todos.filter((item) => {
      console.log("completed");
      return item.isCompleted;
    });
  }, [todos]);
  let notcompletedTodos = useMemo(() => {
    return todos.filter((item) => {
      console.log("not completed");
      return !item.isCompleted;
    });
  }, [todos]);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
      dispatch({ type: "initialize", payload: JSON.parse(storedTodos) });
    }
  }, [dispatch]);
  const handleAdd = () => {
    dispatch({ type: "added", payload: { Title: header } });
    setHeader("");
    showHideSnackbar("Task added successfully!");
  };
let displayedTodos = todos;
if (filterTodos === "completed") {
    displayedTodos = completedTodos;
} else if (filterTodos === "notcompleted") {
    displayedTodos = notcompletedTodos;
}
  let todo = displayedTodos.map((item) => {
    return <ToDo
  key={item.id}
  todo={item}
  onDelete={(id) => {
    setDeleteId(id);
    setOpen(true);
  }}
  onEdit={() => {
    setEditdata({
      title: item.title, 
      details: item.details,
      id: item.id
    });
    setOpenEdit(true);

  }}
/>;
  });
   const handleClose = () => {
    setOpen(false);
  };
const handleFilterChange = (event, newValue) => {
  if (newValue !== null) {
    setFilterTodos(newValue);
  }
};
  const handleConfirmDelete = () => {
 
 dispatch({type:"deleted",payload:{id:deleteId}});
  setOpen(false);
  showHideSnackbar("Task deleted successfully!");
};
 

  const handleCloseEdit = () => {
    setOpenEdit(false);
    
  };
  
const handleSubmitEdit = (event) => {
  event.preventDefault();

dispatch({type:"edited",payload:{id:editdata.id,title:editdata.title,details:editdata.details}});
  handleCloseEdit();
  showHideSnackbar("Task updated successfully!");
};
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "420px",
            height: "180px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you delete this task, you won't be able to recover it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
       <Dialog
              open={openEdit}
              onClose={handleCloseEdit}
              PaperProps={{
                sx: {
                  width: "470px",
                  height: "350px",
                },
              }}
            >
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <DialogContentText>Edit your task</DialogContentText>
                <form onSubmit={handleSubmitEdit} id="subscription-form">
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name=""
                    label="Title"
                    type="title"
                    fullWidth
                    variant="standard"
                    value={editdata.title}
                    onChange={(e) =>
                      setEditdata({ ...editdata, title: e.target.value })
                    }
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="details"
                    type="details"
                    fullWidth
                    variant="standard"
                    value={editdata.details}
                    onChange={(e) =>
                      setEditdata({ ...editdata, details: e.target.value })
                    }
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Card sx={{ width: 600, maxHeight: "80vh", overflowY: "auto" }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              sx={{ color: "#1976d2", fontWeight: "bold", textAlign: "center" }}
            >
              My Tasks
            </Typography>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <ToggleButtonGroup
                variant="contained"
                value={filterTodos}
                onChange={handleFilterChange}
                exclusive
                aria-label="Basic button group"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
                <ToggleButton value="notcompleted">Uncompleted</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ mt: 2 }}>{todo}</Box>
          </CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Box
                  component="form"
                  sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Headline of task"
                    variant="outlined"
                    value={header}
                    onChange={(e) => {
                      setHeader(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    m: 1,
                    width: "90%",
                    height: "75%",
                    backgroundColor: "#ACCBF2",
                    color: "white",
                    fontSize: "20px",
                  }}
                  className="card"
                  onClick={() => {
                    handleAdd();
                  }}
                  disabled={header.trim() === ""}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </>
  );
}
