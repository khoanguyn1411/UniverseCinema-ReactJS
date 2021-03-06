import {
  Loading,
  Modal,
  NoResult,
  Separate,
  TextHover,
  Title,
} from "@/components";
import { useCallAPI } from "@/hooks";
import { ITrailer } from "@/types";
import { FunctionComponent, useState } from "react";
import { TProps } from "..";

export const MovieTrailers: FunctionComponent<TProps.withType> = ({
  movie,
  type,
}) => {
  const [result, isLoading] = useCallAPI(`/${type}/${movie.id}/videos`, null, [
    movie,
  ]);
  const pathYoutube = "https://www.youtube.com/embed/";
  const trailerList: ITrailer[] = result?.results;
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);

  return (
    <>
      <Title className="mb-[1rem] mt-[1.5rem]">Trailers</Title>
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {!isLoading && (
        <>
          {trailerList && trailerList.length > 0 ? (
            <div className="flex flex-col">
              {trailerList.slice(0, 2).map((trailer) => (
                <div key={`trailer_${trailer.id}`} className="mb-[2rem]">
                  <h1 className="font-bold text-s18 mb-[1rem]">
                    {trailer.name}
                  </h1>
                  <iframe
                    key={trailer.id}
                    title={trailer.key}
                    src={pathYoutube + trailer.key}
                    className="w-full h-[75vh] max-h-[50rem] rounded-[1rem] shadow-default"
                  />
                </div>
              ))}
              {trailerList.length > 2 && (
                <TextHover
                  onClick={() => setIsOpenModal(true)}
                  className="self-center italic underline font-bold cursor-pointer"
                >
                  View all trailers
                </TextHover>
              )}
            </div>
          ) : (
            <NoResult>There is no trailer available yet.</NoResult>
          )}
        </>
      )}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)} className="">
          <div className=" overflow-auto">
            {trailerList.map((trailer) => (
              <div
                key={`trailerFull_${trailer.id}`}
                className="mb-[2rem] mr-[1rem]"
              >
                <h1 className="font-bold text-s18 mb-[1rem]">{trailer.name}</h1>
                <iframe
                  key={trailer.id}
                  title={trailer.key}
                  src={pathYoutube + trailer.key}
                  className="w-full h-[72vh] rounded-[1rem]"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
      <Separate />
    </>
  );
};
