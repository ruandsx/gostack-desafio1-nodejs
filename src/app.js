const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repositoryId = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryId < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  const likes = repositories[repositoryId].likes;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoryId] = repository;

  return res.json(repositories[repositoryId]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryId = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryId < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryId, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryId = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryId < 0) {
    return res.status(400).json({ error: "Repository not found" });
  }

  const likes = repositories[repositoryId].likes + 1;
  const repository = {
    ...repositories[repositoryId],
    likes,
  };

  repositories[repositoryId] = repository;

  return res.json(repository);
});

module.exports = app;
