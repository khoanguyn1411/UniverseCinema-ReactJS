import { ItemSeason, Separate, TextHover, Title } from "@/components";
import { FunctionComponent, useState } from "react";
import { TProps } from "..";

export const MovieSeasons: FunctionComponent<TProps.noType> = ({ movie }) => {
  const seasons = movie.seasons;
  const [seasonsDisplay, setSeasonsDisplay] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => {
    if (!isExpanded) {
      setSeasonsDisplay(seasons.length);
    } else {
      setSeasonsDisplay(2);
    }
    setIsExpanded(!isExpanded);
  };
  return (
    seasons &&
    seasons.length > 0 && (
      <div className="mt-[1.5rem] flex flex-col">
        <Title className="mb-[1rem]">Seasons</Title>
        {seasons.slice(0, seasonsDisplay).map((season) => (
          <ItemSeason key={season.id} movieName={movie.name} season={season} />
        ))}
        {seasons.length > 2 && (
          <TextHover
            onClick={handleExpand}
            className="self-center italic underline font-bold cursor-pointer"
          >
            {!isExpanded ? "View all seasons" : "Collapse"}
          </TextHover>
        )}
        <Separate />
      </div>
    )
  );
};
