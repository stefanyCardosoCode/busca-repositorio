export interface RepoDetails {
  stars: any;
  forks: any;
  repositoryName: string;
  projectName: string;
  id: number;
  name: string;
  owner: User;
  description: string | null;
  language: string;
  forks_count: number;
  stargazers_count: number;
  html_url: string;
  created_at: string;
  updated_at: string;
}

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface User {
  avatar_url: string;
  login: string;
}

export interface DotColorProps {
  language: Language;
}

export type Language = 'JavaScript' | 'Python' | 'Java' | 'Ruby' | string;

