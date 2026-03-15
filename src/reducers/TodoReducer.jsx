import { v4 as uuidv4 } from "uuid";
export default function reducer(state, action) {
  switch (action.type) {
    case "added": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.Title,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...state, newTask];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const newTodos = state.filter((item) => item.id !== action.payload.id);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    }
    case "edited": {
        const newTodos = state.map((item) => {
    if (item.id === action.payload.id) {
      item.title = action.payload.title;
      item.details = action.payload.details;
    }
    return item;
  });

  localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;

    }
    default: {
      throw new Error("Invalid action type", action.type);
    }
  }
  return [];
}
