import axios from "axios";

const serverAddress = "http://localhost:5000"; // Deine API-Adresse

// Fetch todos
const fetchTodos = async () => {
  try {
    const response = await axios.get(serverAddress + "/api/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Weiter werfen, um Fehler in der Komponente zu behandeln
  }
};

// Add a new todo
const addTodo = async (text) => {
  try {
    const response = await axios.post(serverAddress + "/api/todos", { text });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Update a todo
const updateTodo = async (todo) => {
  try {
    await axios.put(serverAddress + `/api/todos/${todo.id}`);
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
const deleteTodo = async (id) => {
  try {
    await axios.delete(serverAddress + `/api/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const todoApi = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
