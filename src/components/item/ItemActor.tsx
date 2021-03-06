import { imgNoAvatar } from "@/assets/images";
import { ImageContainer } from "@/components";
import { configs } from "@/configs";
import { IActors } from "@/types";
import { FunctionComponent } from "react";

type TProps = {
  actor: IActors;
};

export const ItemActor: FunctionComponent<TProps> = ({ actor }) => {
  let urlImg: string;
  if (actor.profile_path === null) {
    urlImg = imgNoAvatar;
  } else {
    urlImg = configs.api.IMAGE_URL_SMALL + actor.profile_path;
  }
  return (
    <div className="shadow-default rounded-[1rem] h-full cursor-pointer w-[15.2rem]">
      <ImageContainer url={urlImg} className="rounded-t-[1rem] h-[15rem]">
        <img alt={actor.name} src={urlImg} />
      </ImageContainer>
      <div className="p-[1rem]">
        <h1 className="font-bold">{actor.name || actor.original_name}</h1>
        <h1 className="text-s14">{actor.character}</h1>
      </div>
    </div>
  );
};
