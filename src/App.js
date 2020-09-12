import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await
    api.post('/repositories',{
      title: `Its a new repositorie ${Date.now()}`,
      url: "This url is here",
      techs: "Pilot"
    });
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204){
      let repoID = repositories.findIndex(repo => repo.id === id);
      repositories.splice(repoID, 1);
      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
