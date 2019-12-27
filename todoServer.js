const querystring = require('query-string');

//
// TODO server. Saves TODOs to ./todos.json 
//
function todoServer() {
  let nextId = 4; // eslint-disable-line

  const todos = [
    {id: '1', content: 'Learn React', completed: false},
    {id: '2', content: 'Learn Redux', completed: false},
    {id: '3', content: 'Build an app', completed: false}
  ];

  const httpOk = 200;
  const httpCreated = 201;
  const httpNotFound = 404;
  const httpBadRequest = 400;

  // Handlers return an array in the form of [status, data, headers]

  function listTodos(req) {
    let newTodos = [...todos];
    //  eslint-disable-next-line
    console.log(`query ===> ${JSON.stringify(req.query)}`);
    let vf = 'all';
    if (req.query && req.query.visibility) {
      vf = req.query.visibility;
    }
    newTodos = newTodos.filter(item => {
      if (vf === 'all') return true;
      else if (vf === 'completed' && item.completed) return true;
      else if (vf === 'not_completed' && !item.completed) return true;
      return false;
    });
    if (req.query && req.query.search) {
      newTodos = newTodos.filter(item => {
        const match = req.query.search.toLowerCase();
        return item.content.toLowerCase().indexOf(match) >= 0;
      });
    }
    const result = {todos: newTodos};
    return [httpOk, result];
  }

  function getTodo(id) {
    let found = null;
    todos.forEach(item => {
      if (item.id === id) found = item;
    });
    if (!found) return [httpNotFound, `todo ${id} not found`];
    return [httpOk, found];
  }

  function listOrOneTodo(req) {
    const id = req.params.id;
    if (id) {
      return getTodo(id);
    }
    return listTodos(req);
  }

  function addTodo(req) {
    const newTodo = {...req.body};
    if (!newTodo.content) {
      return [httpBadRequest, 'missing TODO content'];
    }
    newTodo.id = String(nextId++);
    todos.push(newTodo);
    return [httpCreated, newTodo];
  }

  function updateTodo(req) {
    const id = req.params.id;
    if (!id) return [httpNotFound, `todo ${id} not found`];

    const index = todos.findIndex(e => e.id === id);
    if (index === -1) return [httpNotFound];
    const updatedTodo = req.body
    if (!updatedTodo.content) {
      return [httpBadRequest, 'missing TODO content'];
    }
    todos.splice(index, 1, updatedTodo);
    return [httpOk, updatedTodo];
  }

  function deleteTodo(req) {
    const id = req.params.id;
    if (!id) return [httpNotFound, `todo ${id} not found`];
    
    const index = todos.findIndex(e => e.id === id);
    if (index === -1) return [httpNotFound];
    todos.splice(index, 1);
    return [httpOk, {id}];
  }

  return {
    get: listOrOneTodo,
    post: addTodo,
    put: updateTodo,
    'delete': deleteTodo 
  }
}

module.exports = todoServer;
