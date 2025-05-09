import { api } from '../axios';

export interface FilmProps {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
  image: string;
}

export async function getAllFilms() {
  try {
    const response = await api.get<FilmProps[]>('/films');

    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
}
