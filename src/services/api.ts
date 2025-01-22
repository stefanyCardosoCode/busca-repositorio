import axios from "axios";

const GITHUB_TOKEN = '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';

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const getAllRepositorys = async () => {
    try {
      const response = await api.get(`repositories`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar os detalhes do repositório:', error);
      throw error;
    }
  };

  export const getAllRepositoryDetails = async (owner: string, repoName: string) => {
    try {
      const response = await api.get(`https://api.github.com/repos/${owner}/${repoName}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao carregar detalhes do repositório: ${owner}/${repoName}`);
    }
  };

export const getRepositoryDetails = async (id: string | number) => {
    try {
      const response = await api.get(`repositories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar os detalhes do repositório:', error);
      throw error;
    }
  };

  export const getAllRepositoryUser = async (user: string) => {
    try {
      const response = await api.get(`users/${user}/repos`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar os detalhes do repositório:', error);
      throw error;
    }
  };
  
  export const getRepositoryContributors = async (id: string | number) => {
    try {
      const response = await api.get(`repositories/${id}/contributors`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar os contribuidores:', error);
      throw error;
    }
  };

  export const getUserDetails = async (id: string | number) => {
    try {
      const response = await api.get(`user`);
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar os contribuidores:', error);
      throw error;
    }
  };

export default api;