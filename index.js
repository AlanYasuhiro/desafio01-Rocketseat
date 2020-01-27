const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

// Verificar se projeto existe
function checkProjectExists(req, res, next){
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({error: 'Project does not exist'});
  }

  return next();
}

function logRequest(req, res, next){
  console.count("Número de requisições");

  return next();
}

server.use(logRequest);

// Cadastrar projeto
server.post('/projects', (req, res) => {
  const {id, title} = req.body;

  const project = {
    id,
    title,
    tasks: []
  }; 

  projects.push(project);

  return res.json(projects);
})

// Cadastrar tasks do projeto
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id = id);

  project.tasks.push(title);

  return res.json(projects);

})

// Listar os projetos por id
server.get('/projects/:id', (req, res) => {
  const {id} = req.params;

  return res.json(projects[id]);
})

// Listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
})

// Alterar o título do projeto
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project); 
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;

  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex,1);

  return res.send();

})

server.listen(3000);