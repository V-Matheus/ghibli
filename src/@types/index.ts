declare global {
  export interface FilmProps {
    id: string;
    title: string;
    original_title_romanised: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: string;
    image: string;
    isWatched: boolean;
    isFavorite: boolean;
    notes: string;
  }
}

export {};
