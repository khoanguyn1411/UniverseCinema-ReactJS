import { Button, ItemMovie, NoResult, SwiperApp, Title } from "@/components";
import { funcs, values } from "@/constants";
import { useCallAPI } from "@/hooks";
import { IMovie } from "@/types";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { TProps } from "..";

import { icArrowLeft, icArrowRight } from "@/assets/icons";
import SwiperCore, { Navigation } from "swiper";
import { SwiperProps, SwiperSlide } from "swiper/react";

export const MovieRecommendation: FunctionComponent<TProps.withType> = ({
  type,
  movie,
}) => {
  const refNext = useRef(null);
  const refPre = useRef(null);

  const result = useCallAPI(
    funcs.getAPI(
      `/${type}/${movie.id}/recommendations?`,
      "&language=en-US&page=1"
    ),
    [movie]
  );

  const [settingsSwiper, setSettingsSwiper] = useState<SwiperProps>(null);

  useEffect(() => {
    setSettingsSwiper({
      modules: [Navigation],
      navigation: {
        prevEl: refPre?.current,
        nextEl: refNext?.current,
      },
      onScrollbarDragMove(swiper) {
        if (swiper.isBeginning) {
          refPre.current.classList.add("opacity-30");
        } else {
          refPre.current.classList.remove("opacity-30");
        }

        if (swiper.isEnd) {
          refNext.current.classList.add("opacity-30");
        } else {
          refNext.current.classList.remove("opacity-30");
        }
      },
      onSlideChange(swiper) {
        if (swiper.isBeginning) {
          refPre.current.classList.add("opacity-30");
        } else {
          refPre.current.classList.remove("opacity-30");
        }

        if (swiper.isEnd) {
          refNext.current.classList.add("opacity-30");
        } else {
          refNext.current.classList.remove("opacity-30");
        }
      },
      direction: "horizontal",
      scrollbar: {
        draggable: true,
      },
    });
  }, [result]);

  const recomendationList: IMovie[] = result?.results;
  const handleSwiperApp = (swiper: SwiperCore) => {
    if (swiper.isBeginning) {
      refPre.current.classList.add("opacity-30");
    } else {
      refPre.current.classList.remove("opacity-30");
    }
  };

  return (
    <div className="mb-[2rem]">
      <div className="justify-between mt-[2rem] flex items-center">
        <Title>Recommendation</Title>
        {recomendationList && recomendationList.length > 0 && (
          <div>
            <Button
              iconOnly
              icon={icArrowLeft}
              rounded
              ref={refPre}
              className="h-[3rem] w-[3rem]"
            />
            <Button
              iconOnly
              rounded
              icon={icArrowRight}
              ref={refNext}
              className="h-[3rem] w-[3rem] ml-5"
            />
          </div>
        )}
      </div>
      <div className="relative mt-4">
        {recomendationList && recomendationList.length > 0 ? (
          <SwiperApp
            data={recomendationList}
            settings={settingsSwiper}
            noViewmore
            onAppSwiper={handleSwiperApp}
          >
            {recomendationList.map((item) => (
              <SwiperSlide key={type + item.id}>
                <ItemMovie
                  size="small"
                  isSwiper
                  movie={item}
                  className="mx-0"
                />
              </SwiperSlide>
            ))}
          </SwiperApp>
        ) : (
          <NoResult className="mt-[1rem]">
            There is no recommendation for this{" "}
            {type === values.MEDIA_TYPE.MOVIE ? "movie." : "TV show."}
          </NoResult>
        )}
      </div>
    </div>
  );
};