'use client';
import { Select } from '@/components/Select';
import Tag from '@/components/Tag';
import { Eye, Heart, Search, Star, StickyNote, X } from 'lucide-react';
import { Button } from '@/components/Button';
import {
  InputCheckbox,
  InputFild,
  InputIcon,
  InputRoot,
} from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFavoriteFilter,
  setIncludeSynopsis,
  setMinStarsFilter,
  setSearchQuery,
  setSortOrder,
  setWatchedFilter,
  setWithNotesFilter,
} from '@/store/slices/filters-slice';
import { RootState } from '@/store/store';

export function FiltersSorting() {
  const dispatch = useDispatch();

  const { isWatched, isFavorite, withNotes, minStars, search } = useSelector(
    (state: RootState) => state.filters,
  );

  const hasActiveFilters = isWatched || isFavorite || withNotes || minStars;

  return (
    <article className="flex flex-col flex-1 gap-5">
      <InputRoot>
        <InputIcon>
          <Search size={20} />
        </InputIcon>
        <InputFild
          placeholder="Search movies..."
          value={search.query || ''}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </InputRoot>

      <section className="flex items-center justify-between">
        <InputCheckbox
          checked={search.includeSynopsis || false}
          onChange={(e) => dispatch(setIncludeSynopsis(e.target.checked))}
        >
          Include synopsis in search
        </InputCheckbox>
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
          selectedOption="Default"
          onChange={(option) => dispatch(setSortOrder(option.target.value))}
        />
      </section>

      <section className="flex flex-wrap gap-2 items-center">
        <h3 className="text-sm font-medium">Filters:</h3>

        <Button
          className={`text-sm font-medium px-3 gap-1 h-10 rounded-lg ${
            isWatched
              ? 'bg-green-100 border-green-500 text-green-700'
              : 'border-gray-200'
          }`}
          onClick={() => dispatch(setWatchedFilter(!isWatched))}
        >
          <Eye size={16} />
          Watched
        </Button>

        <Button
          className={`text-sm font-medium px-3 gap-1 h-10 rounded-lg ${
            isFavorite
              ? 'bg-red-100 border-red-500 text-red-700'
              : 'border-gray-200'
          }`}
          onClick={() => dispatch(setFavoriteFilter(!isFavorite))}
        >
          <Heart size={16} />
          Favorites
        </Button>

        <Button
          className={`text-sm font-medium px-3 gap-1 h-10 rounded-lg ${
            withNotes
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'border-gray-200'
          }`}
          onClick={() => dispatch(setWithNotesFilter(!withNotes))}
        >
          <StickyNote size={16} />
          With Notes
        </Button>

        <Select
          options={[
            { name: 'All Movies', value: '' },
            { name: 'Any Rating ⭐', value: 'any-rating' },
            { name: 'Unrated', value: 'unrated' },
            { name: '5 stars ⭐', value: '5-stars' },
            { name: '4 stars ⭐', value: '4-stars' },
            { name: '3 stars ⭐', value: '3-stars' },
            { name: '2 stars ⭐', value: '2-stars' },
            { name: '1 star ⭐', value: '1-star' },
          ]}
          selectedOption={
            minStars === '5-stars'
              ? '5 Stars'
              : minStars === '4-stars'
              ? '4 Stars'
              : minStars === '3-stars'
              ? '3 Stars'
              : minStars === '2-stars'
              ? '2 Stars'
              : minStars === '1-star'
              ? '1 Star'
              : minStars === 'any-rating'
              ? 'Any Rating'
              : minStars === 'unrated'
              ? 'Unrated'
              : 'All Movies'
          }
          onChange={(option) =>
            dispatch(setMinStarsFilter(option.target.value))
          }
          className={
            minStars ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : ''
          }
        >
          <Star
            size={16}
            className={`${minStars ? 'text-yellow-500' : 'text-gray-400'}`}
            fill={minStars ? '#efb100' : 'none'}
          />
        </Select>
      </section>

      {hasActiveFilters && (
        <section className="flex flex-wrap gap-2 items-center">
          <h3 className="text-sm ">Active filters:</h3>
          {isWatched && (
            <Tag outline color="green">
              Watched
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => dispatch(setWatchedFilter(false))}
              />
            </Tag>
          )}

          {isFavorite && (
            <Tag outline color="red">
              Favorites{' '}
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => dispatch(setFavoriteFilter(false))}
              />
            </Tag>
          )}

          {withNotes && (
            <Tag outline color="blue">
              With Notes
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => dispatch(setWithNotesFilter(false))}
              />
            </Tag>
          )}

          {minStars && (
            <Tag outline color="yellow">
              {minStars === '5-stars'
                ? '5 Stars ⭐⭐⭐⭐⭐'
                : minStars === '4-stars'
                ? '4 Stars ⭐⭐⭐⭐'
                : minStars === '3-stars'
                ? '3 Stars ⭐⭐⭐'
                : minStars === '2-stars'
                ? '2 Stars ⭐⭐'
                : minStars === '1-star'
                ? '1 Star ⭐'
                : minStars === 'any-rating'
                ? 'Any Rating'
                : minStars === 'unrated'
                ? 'Unrated'
                : null}
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => dispatch(setMinStarsFilter(null))}
              />
            </Tag>
          )}

          {/* <Tag outline color="purple">
          Sorted by Duration (Longest)
          <X size={12} className="cursor-pointer" />
        </Tag> */}
        </section>
      )}
    </article>
  );
}
