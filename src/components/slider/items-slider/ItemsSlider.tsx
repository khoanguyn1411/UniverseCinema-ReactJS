import { icArrowLeft, icArrowRight, Icon } from "@/assets/icons";
import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
import { WrapperModule } from "./WrapperModule";

type TProps = {
  children: React.ReactNode;
  settingConfig: Settings;
  className?: string;
  positionDots?: number;
  slideDisplay: number;
};

export const ItemsSlider: React.FC<TProps> = ({
  children,
  settingConfig,
  className,
  positionDots = 1,
  slideDisplay,
}) => {
  const slider = React.useRef<Slider>(null);
  const settings: Settings = {
    ...settingConfig,
    slidesToShow: slideDisplay,
    slidesToScroll: slideDisplay,
    arrows: false,
  };
  const [isShowLeftArrow, setIsShowLeftArrow] = useState<Boolean>(false);
  const [isShowRightArrow, setIsShowRightArrow] = useState<Boolean>(true);

  const handleCheckLastItems = (prev: number, curr: number) => {
    if (curr === 0) {
      setIsShowLeftArrow(false);
    } else if (curr === 20 - slideDisplay) {
      setIsShowRightArrow(false);
    } else {
      setIsShowLeftArrow(true);
      setIsShowRightArrow(true);
    }
  };

  return (
    <div className="relative max-w-[130rem] m-auto">
      <WrapperModule positionDots={positionDots} className="wrapper">
        <Slider
          className={className}
          ref={slider}
          beforeChange={handleCheckLastItems}
          {...settings}
        >
          {children}
        </Slider>
        {isShowLeftArrow && (
          <button
            className="group absolute top-0 bottom-0 left-0 p-[1.5rem]"
            onClick={() => slider?.current?.slickPrev()}
          >
            <span>
              <Icon
                className="text-black text-[3rem] opacity-50 group-hover:opacity-100 group-hover:transition-all"
                icon={icArrowLeft}
              />
            </span>
          </button>
        )}

        {isShowRightArrow && (
          <button
            className="group absolute top-0 bottom-0 right-0 p-[1.5rem]"
            onClick={() => slider?.current?.slickNext()}
          >
            <span>
              <Icon
                className="group-hover:opacity-100 group-hover:transition-all opacity-50 transition-all text-black text-[3rem]"
                icon={icArrowRight}
              />
            </span>
          </button>
        )}
      </WrapperModule>
    </div>
  );
};
