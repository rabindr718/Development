import axios from 'axios';

// Aurora API setup
const tenantId = '7f4bc152-fd84-47dd-baba-8da817c97668';
const bearerToken = 'sk_sand_5a12a3d6bb1964b970e20858';
const auroraApiUrl = 'https:///v2.aurorasolar.com/settings/api/tokens'; // Replace with Aurora's actual base API URL
// api.aurorasolar.com/v1
const auroraApi = axios.create({
  baseURL: auroraApiUrl,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  },
});

// Example function to fetch a list of projects
export const fetchProjects = async () => {
  try {
    const response = await auroraApi.get(`/tenants/${tenantId}/projects`);
    return response.data; // Returns the list of projects
  } catch (error) {
    console.error('Error fetching Aurora projects:', error);
    throw error;
  }
};

// You can add more functions for other endpoints
export const fetchProjectDesigns = async (projectId: string) => {
  try {
    const response = await auroraApi.get(`/projects/${projectId}/designs`);
    return response.data; // Returns the list of designs
  } catch (error) {
    console.error('Error fetching project designs:', error);
    throw error;
  }
};
