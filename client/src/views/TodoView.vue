<template>
  <div class="todo-container">
    <h1 class="title">Todo List</h1>
    <div class="todo-input-container">
      <InputText
        v-model="newTodo"
        placeholder="Add a new todo"
        class="input-text"
        @keyup.enter="createTodo"
      />
      <MainButton
        label="Add"
        icon="pi pi-plus"
        class="add-button"
        @click="createTodo"
      />
    </div>

    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="['todo-item', { completed: todo.completed }]"
        @click="toggleTodo(todo)"
      >
        <div class="todo-text-container">
          <span class="todo-text">{{ todo.text }}</span>
        </div>
        <MainButton
          label="Delete"
          icon="pi pi-trash"
          class="delete-button"
          @click.stop="removeTodo(todo.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { todoApi } from "../services/todoApi";

export default {
  setup() {
    const todos = ref([]); // Reactive variable for todos
    const newTodo = ref(""); // Reactive variable for the new todo

    const sortTodos = () => {
      // Move the completed todo to the bottom of the list
      todos.value = [
        ...todos.value.filter((t) => !t.completed),
        ...todos.value.filter((t) => t.completed),
      ];
    };

    // Fetch todos from API
    const getTodos = async () => {
      try {
        todos.value = await todoApi.fetchTodos();
        sortTodos();
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    // Add a new todo
    const createTodo = async () => {
      if (!newTodo.value) return;
      try {
        const newTodoData = await todoApi.addTodo(newTodo.value);
        todos.value.push(newTodoData);
        newTodo.value = ""; // Reset input field
        sortTodos();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    };

    // Toggle the completion status of a todo
    const toggleTodo = async (todo) => {
      todo.completed = !todo.completed;
      try {
        await todoApi.updateTodo(todo);
        sortTodos();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    };

    // Delete a todo
    const removeTodo = async (id) => {
      try {
        await todoApi.deleteTodo(id);
        todos.value = todos.value.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    };

    // Fetch todos when the component is mounted
    onMounted(getTodos);

    // Return variables and methods to use in the template
    return {
      todos,
      newTodo,
      createTodo,
      toggleTodo,
      removeTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/TodoView.css";
</style>
