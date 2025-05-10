import { Button } from '@/components/Button';
import {
  InputCheckbox,
  InputFild,
  InputIcon,
  InputRoot,
} from '@/components/Input';
import { MovieGrid } from '@/components/FilmsGrid';
import { Select } from '@/components/Select';
import Tag from '@/components/Tag';
import { Eye, Heart, Search, Star, StickyNote, X } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col flex-1 p-4 md:p-8">
      <header className="flex flex-col items-center justify-center w-full gap-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Studio Ghibli Collection
        </h1>
        <p className="text-center text-gray-600 max-w-2xl">
          Explore the magical world of Studio Ghibli films. Mark your favorites
          and keep track of what you`ve watched.
        </p>
      </header>

      <article className="space-y-6">
        <InputRoot>
          <InputIcon>
            <Search size={20} />
          </InputIcon>
          <InputFild placeholder="Search movies..." />
        </InputRoot>

        <section className="flex items-center justify-between">
          <InputCheckbox>Include synopsis in search</InputCheckbox>
          <Select
            options={[
              { value: 'default', name: 'Default' },
              { value: 'title-az', name: 'Title (A-Z)' },
              { value: 'title-za', name: 'Title (Z-A)' },
              { value: 'duration-shortest', name: 'Duration (Shortest)' },
              { value: 'duration-longest', name: 'Duration (Longest)' },
              { value: 'rating-highest', name: 'Your Rating (Highest)' },
              { value: 'rating-lowest', name: 'Your Rating (Lowest)' },
              { value: 'score-highest', name: 'Score (Highest)' },
              { value: 'score-lowest', name: 'Score (Lowest)' },
            ]}
          />
        </section>

        <section className="flex flex-wrap gap-2 items-center">
          <h3 className="text-sm font-medium">Filters:</h3>

          <Button className="text-sm font-medium px-3 gap-1">
            <Eye size={16} />
            Watched
          </Button>

          <Button className="text-sm font-medium px-3 gap-1">
            <Heart size={16} />
            Favorites
          </Button>

          <Button className="text-sm font-medium px-3 gap-1">
            <StickyNote size={16} />
            With Notes
          </Button>

          <Select
            options={[
              { name: 'All Movies', value: 'all-movies' },
              { name: 'Any Rating ⭐', value: 'any-rating' },
              { name: 'Unrated', value: 'unrated' },
              { name: '5 stars ⭐', value: '5-stars' },
              { name: '4 stars ⭐', value: '4-stars' },
              { name: '3 stars ⭐', value: '3-stars' },
              { name: '2 stars ⭐', value: '2-stars' },
              { name: '1 star ⭐', value: '1-star' },
            ]}
          >
            <Star size={16} />
          </Select>
        </section>

        <section className="flex flex-wrap gap-2 items-center">
          <h3 className="text-sm ">Active filters:</h3>
          <Tag outline color="green">
            Watched <X size={12} className="cursor-pointer" />
          </Tag>
          <Tag outline color="red">
            Favorites <X size={12} className="cursor-pointer" />
          </Tag>
          <Tag outline color="blue">
            With Notes
            <X size={12} className="cursor-pointer" />
          </Tag>
          <Tag outline color="yellow">
            5 Stars ⭐⭐⭐⭐⭐
            <X size={12} className="cursor-pointer" />
          </Tag>
          <Tag outline color="purple">
            Sorted by Duration (Longest)
            <X size={12} className="cursor-pointer" />
          </Tag>
        </section>

        <MovieGrid />
      </article>
    </main>
  );
}
