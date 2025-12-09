
// Frontend Service to communicate with Backend

// Fallback data import in case server is not running (Development mode without backend)
import { projects as fallbackProjects, experience as fallbackExperience } from '../data/mockData';

const API_URL = 'http://localhost:5000/api';

const fetchWithTimeout = async (url: string, ms: number) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export const fetchProjects = async () => {
  // Force local data for demo
  return fallbackProjects;
};

export const fetchExperience = async () => {
  // Force local data for demo
  return fallbackExperience;
};

export const fetchProjectById = async (id: number) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/project/${id}`, 3000);
    if (!response.ok) throw new Error('Network response was not ok');
    const json = await response.json();
    return json.data;
  } catch (error) {
    // Fallback search
    return fallbackProjects.find(p => p.id === id) || fallbackExperience.find(p => p.id === id);
  }
}
