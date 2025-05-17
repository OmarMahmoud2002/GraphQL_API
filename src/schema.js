const { gql } = require('apollo-server-express');




module.exports = gql`
  type User {
    id: ID
    username: String
    email: String
    todos: [Todo]
  }

  type Todo {
    id: ID
    title: String
    completed: Boolean
    user: User
  }

  type Query {
    # Users
    getUsers: [User]
    getUser(id: ID): User

    # Todos
    getTodos: [Todo]
    getTodo(id: ID): Todo
    getTodosByUser(userId: ID): [Todo]
    getTodosByCompletion(completed: Boolean): [Todo]  # New query to get todos by completion status
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    # Auth
    register(username: String, email: String, password: String): AuthPayload
    login(email: String, password: String): AuthPayload

    # Users
    addUser(username: String, email: String, password: String): User    # لو حابب تضيف عبر الأدمن
    updateUser(id: ID, username: String, email: String, password: String): User
    deleteUser(id: ID): Boolean

    # Todos
    addTodo(title: String): Todo          # user مأخوذ من الـ context
    updateTodo(id: ID, title: String, completed: Boolean): Todo
    deleteTodo(id: ID): Boolean
  }
`;
