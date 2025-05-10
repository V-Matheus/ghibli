import { api } from '../axios';

export async function getAllFilms() {
  try {
    const response = await api.get<FilmProps[]>('/films');

    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
}
