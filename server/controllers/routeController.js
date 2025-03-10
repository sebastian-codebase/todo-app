function getRoutes(app) {
  // Dummy data for Todos
  let todos = [
    { id: 1, text: "Create GitHub Repository", completed: false },
    { id: 2, text: "Create Node.js with express backend", completed: false },
    { id: 3, text: "Create Vue.js with PrimeVue frontend", completed: false },
  ];

  // Get all todos
  app.get("/api/todos", (req, res) => {
    res.json(todos);
  });

  // Add a new todo
  app.post("/api/todos", (req, res) => {
    const newTodo = {
      id: todos.length + 1,
      text: req.body.text,
      completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

  // Delete a todo
  app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id != id);
    res.status(204).send();
  });

  // Update todo (toggle completed status)
  app.put("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id == id);
    if (todo) {
      todo.completed = !todo.completed;
      res.json(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  });
}

module.exports = {
  getRoutes,
};
