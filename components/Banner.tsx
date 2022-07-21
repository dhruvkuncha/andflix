import React, { useEffect, useState } from "react";
import { Movie } from "../typings";
import Image from "next/image";
import { baseUrl } from "../constants/movie";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalState";

interface Props {
  netflixOriginals: [Movie];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[96vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute md:block left-1/4 top-52 md:top-96 md:left-10 flex flex-col items-center space-y-4">
        <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="flex space-x-3">
          <button className="buttonClass bg-white text-black">
            <FaPlay className="h-4 w-4 text-black md:h-4 md:w-4" /> Play
          </button>
          <button className="buttonClass bg-[gray]/70" onClick={() => {
            setShowModal(true)
            setCurrentMovie(movie)
            }}>
            <InformationCircleIcon className="h-5 w-5 md:h-4 md:w-4" /> More
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
