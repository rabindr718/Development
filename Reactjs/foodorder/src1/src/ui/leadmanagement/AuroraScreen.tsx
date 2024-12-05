import React, { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
}

const AuroraAPIComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Change the API URL to point to your proxy server running on localhost:5000
      const auroraApiUrl = 'http://localhost:5000/api/projects';

      try {
        const response = await fetch(auroraApiUrl, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data); // Assuming the response contains an array of projects
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('API Call Error:', err);
        } else {
          setError('An unknown error occurred');
          console.error('Unknown API Call Error:', err);
        }
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Aurora Projects</h1>
      {error && <p>Error fetching projects: {error}</p>}
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li> // Assuming project has 'id' and 'name'
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default AuroraAPIComponent;
