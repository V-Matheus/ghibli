'use client';
import Image from 'next/image';
import { ComponentProps, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  Heart,
  Star,
  StickyNote,
  X,
} from 'lucide-react';
import { Button } from './Button';
import Tag from './Tag';
import { useDispatch, useSelector } from 'react-redux';
import { setFilms } from '@/store/slices/films-slice';
import { RootState } from '@/store/store';
import { Modal } from './Modal';
import { SubmitHandler, useForm } from 'react-hook-form';

interface CardProps extends ComponentProps<'article'> {
  film?: FilmProps;
}

export function Card({ film, ...props }: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const dispatch = useDispatch();

  const interaction = useSelector((state: RootState) =>
    state.films.interactiveFilms.find((i) => i.id === film?.id),
  );

  const isFavorite = interaction?.isFavorite || false;
  const isWatched = interaction?.isWatched || false;

  const handleFavoriteToggle = () => {
    dispatch(setFilms({ id: film!.id, isFavorite: !isFavorite }));
  };

  const handleWatchedToggle = () => {
    dispatch(setFilms({ id: film!.id, isWatched: !isWatched }));
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ rate: number; note: string }>();

  const rate = watch('rate');

  const onSubmit: SubmitHandler<{ rate: number; note: string }> = (data) => {
    console.log(data);

    dispatch(
      setFilms({
        id: film!.id,
        note: data.note,
        rate: data.rate,
      }),
    );
    setIsModalOpen(false);
  };

  return (
    <article
      className="flex flex-col rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg border-2 border-gray-200"
      {...props}
    >
      <section className="flex group relative w-full bg-transparent hover:bg-black/25 aspect-[2/3]">
        <Image
          src={film?.image || '/images/placeholder.png'}
          alt={film?.title || 'Film'}
          width={300}
          height={450}
          className="object-cover w-full h-full"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/50">
          {film?.original_title_romanised || 'Original Titler Romanised'}
        </span>

        {isFavorite && (
          <Tag className="absolute left-2 top-2 h-5" color="red">
            <Heart size={12} className="text-white" fill="#FFFFFF" />
            Favorite
          </Tag>
        )}

        <div className="flex absolute right-2 top-2 flex-col items-end gap-1">
          {isWatched && (
            <Tag color="green">
              <Eye size={12} fill="#008236" />
              Watched
            </Tag>
          )}

          <Tag color="blue">
            <StickyNote size={12} fill="#1447e6 " />
            Notes
          </Tag>
          <Tag
            color="yellow"
            customStyles={{
              bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
              text: 'text-gray-800',
              border: 'border-gray-300',
            }}
          >
            <Star size={12} className="text-black" fill="#000000" />
            5/5
          </Tag>
        </div>
      </section>

      <section className="flex flex-1 flex-col p-4 gap-1">
        <h2 className="text-lg font-bold">{film?.title || 'Título'}</h2>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {film?.release_date || 'Ano'} •{' '}
            {film?.running_time
              ? `${Math.floor(Number(film.running_time) / 60)}h ${
                  Number(film.running_time) % 60
                }m`
              : 'Duração'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <Star className="text-yellow-500" fill="#efb100" size={16} />
              <span className="text-sm font-medium">
                {film?.rt_score || 'N/A'}%
              </span>
            </div>

            <span className="text-xs text-gray-400 italic">
              {interaction?.rate ? (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`${
                        interaction?.rate && index < interaction.rate
                          ? 'text-yellow-500'
                          : 'text-gray-400'
                      }`}
                      fill={
                        interaction?.rate && index < interaction.rate
                          ? '#efb100'
                          : 'none'
                      }
                      size={12}
                    />
                  ))}
                </div>
              ) : (
                'Not rated'
              )}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className={`text-sm ${
                isDescriptionExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {film?.description ||
                'Descrição do film não disponível no momento.'}
            </p>
            <Button
              onClick={toggleDescription}
              className="gap-2 text-gray-500 hover:text-gray-700 text-xs max-w-24"
            >
              {isDescriptionExpanded ? (
                <>
                  <ChevronUp size={16} />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  <span>Read More</span>
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-500 mb-auto">
            <p>Director: {film?.director || 'Desconhecido'}</p>
            <p>Producer: {film?.producer || 'Desconhecido'}</p>
          </div>

          {interaction?.note && (
            <div className="p-2 bg-blue-50 rounded-md">
              <div className="flex items-center gap-2">
                <StickyNote size={12} className="text-blue-500" />
                <span className="text-xs font-medium text-blue-600">
                  Your Notes:
                </span>
              </div>
              <p className="text-xs text-gray-600">{interaction.note}</p>
            </div>
          )}

          <div className="flex flex-col items-center pt-0 gap-4">
            <div className="flex w-full items-center justify-between h-9 gap-2 text-white">
              <Button
                onClick={() => handleWatchedToggle()}
                className={`text-xs md:text-sm h-full justify-center gap-2 rounded-lg w-full whitespace-nowrap transition-colors border-2 ${
                  isWatched
                    ? 'bg-black text-white border-black hover:bg-gray-900 hover:border-gray-900'
                    : 'bg-white text-black border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Eye
                  size={16}
                  className={isWatched ? 'text-white' : 'text-black'}
                />
                Watched
              </Button>

              <Button
                onClick={() => handleFavoriteToggle()}
                className={`text-xs md:text-sm h-full justify-center gap-2 rounded-lg w-full whitespace-nowrap transition-colors border-2 ${
                  isFavorite
                    ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                    : 'bg-white text-black border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart
                  size={16}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  className={isFavorite ? 'text-white' : 'text-black'}
                />
                Favorites
              </Button>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full justify-center items-center gap-2 whitespace-nowrap text-xs md:text-sm font-medium transition-colors border-2 border-gray-200 hover:bg-gray-100 h-9 rounded-md"
            >
              <StickyNote size={16} />
              With Notes
            </Button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} open>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 md:p-8"
          >
            <section className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg md:text-xls font-semibold">
                Edit Notes for {film?.title}
              </h3>

              <X
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer"
                size={16}
              />
            </section>

            <section className="flex flex-col gap-4">
              <label className="text-sm sm:text-base font-medium">
                Your Rating:
              </label>
              <div
                className="flex items-center gap-2"
                onMouseLeave={() => setHoveredRating(null)}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Button
                    key={index}
                    type="button"
                    onMouseEnter={() => setHoveredRating(index + 1)}
                    onClick={() => setValue('rate', index + 1)}
                  >
                    <Star
                      className={`${
                        (hoveredRating !== null && index < hoveredRating) ||
                        (rate !== null && index < rate)
                          ? 'text-yellow-500'
                          : 'text-gray-400'
                      }`}
                      fill={
                        (hoveredRating !== null && index < hoveredRating) ||
                        (rate !== null && index < rate)
                          ? '#efb100'
                          : 'none'
                      }
                      size={24}
                    />
                  </Button>
                ))}

                <span className="text-xs sm:text-sm text-gray-600">
                  {rate ? `${rate}/5` : 'Not rated'}
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <label
                htmlFor="note"
                className="text-sm sm:text-base font-medium"
              >
                Your Notes:
              </label>
              <textarea
                {...register('note', { required: true })}
                id="note"
                className="w-full h-[150px] p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black resize-none text-sm sm:text-base"
                placeholder="Write your thoughts about this movie..."
              />
              {errors.note && (
                <span className="text-xs sm:text-sm text-red-500">
                  Notes cannot be empty
                </span>
              )}
            </section>

            <section className="flex items-center justify-end gap-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md text-xs sm:text-sm font-medium transition-colors focus:outline-none border border-gray-200 hover:bg-gray-100 h-10 px-4 py-2"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={!!errors.note}
                className={`text-white rounded-md text-sm font-medium transition-colors focus:outline-none border h-10 px-4 py-2 ${
                  !!errors.note
                    ? 'border-gray-300 bg-gray-500 cursor-not-allowed'
                    : 'border-gray-200 bg-black hover:bg-gray-900'
                }`}
              >
                Save Notes
              </Button>
            </section>
          </form>
        </Modal>
      )}
    </article>
  );
}
