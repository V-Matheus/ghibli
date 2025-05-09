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
} from 'lucide-react';
import { Button } from './Button';
import Tag from './Tag';

interface FilmeProps {
  id: number;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: number;
  rt_score: number;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
}

interface CardProps extends ComponentProps<'article'> {
  filme?: FilmeProps;
}

export function Card({ filme, ...props }: CardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  console.log(filme);

  return (
    <article
      className="flex flex-col w-[400px] rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg border-2 border-gray-200"
      {...props}
    >
      <section className="flex group relative w-full bg-transparent hover:bg-black/25">
        <Image
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg"
          alt="Filme alt"
          width={600}
          height={900}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/50">
          Tenkū no Shiro Rapyuta
        </span>

        <div className="flex justify-between absolute inset-0 p-2">
          <div>
            <Tag color="red">
              <Heart size={12} className="text-white" fill="#FFFFFF" />
              Favorite
            </Tag>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Tag color="green">
              <Eye size={12} fill="#008236" />
              Watched
            </Tag>
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
              <Star size={12} className="text-black" fill="#000000 " />
              5/5
            </Tag>
          </div>
        </div>
      </section>

      <section className="flex flex-col p-4 gap-1">
        <h2 className="text-lg font-bold">Título</h2>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            1986 • 2h 4m
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <Star size={16} />
              <span className="text-sm font-medium">95%</span>
            </div>

            <span className="text-xs text-gray-400 italic">Not rated</span>
          </div>
          <div className="flex flex-col gap-3">
            <p
              className={`text-sm ${
                isDescriptionExpanded ? '' : 'line-clamp-3'
              }`}
            >
              Two sisters move to the country with their father in order to be
              closer to their hospitalized mother, and discover the surrounding
              trees are inhabited by Totoros, magical spirits of the forest.
              When the youngest runs away from home, the older sister seeks help
              from the spirits to find her.
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

          <div className="text-xs text-gray-500">
            <p>Director: Hayao Miyazaki</p>
            <p>Producer: Hayao Miyazaki</p>
          </div>

          <div className="flex flex-col items-center pt-0 gap-4">
            <div className="flex w-full items-center justify-between h-9 gap-2 text-white">
              <Button
                onClick={() => setIsWatched(!isWatched)}
                className={`h-full justify-center gap-2 rounded-lg w-full whitespace-nowrap transition-colors border-2 ${
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
                onClick={() => setIsFavorite(!isFavorite)}
                className={`h-full justify-center gap-2 rounded-lg w-full whitespace-nowrap transition-colors border-2 ${
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

            <Button className="w-full justify-center items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors border-2 border-gray-200 hover:bg-gray-100 h-9 rounded-md">
              <StickyNote size={16} />
              With Notes
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
