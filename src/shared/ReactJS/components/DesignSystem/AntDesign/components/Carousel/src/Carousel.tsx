import { Carousel as AntCarousel, CarouselProps as AntCarouselProps } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import classNames from 'classnames';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useInitializeContext } from '../../../base';

export interface Actions {
  /** Function to go to a specific slide. */
  goTo: CarouselRef['goTo'];
  /** Function to go to the next slide. */
  next: CarouselRef['next'];
  /** Function to go to the previous slide. */
  prev: CarouselRef['prev'];
}

export interface Props
  extends Pick<
    AntCarouselProps,
    | 'adaptiveHeight'
    | 'afterChange'
    | 'arrows'
    | 'autoplay'
    | 'autoplaySpeed'
    | 'beforeChange'
    | 'children'
    | 'className'
    | 'dotPosition'
    | 'draggable'
    | 'fade'
    | 'infinite'
    | 'pauseOnHover'
    | 'slidesToScroll'
    | 'slidesToShow'
    | 'speed'
    | 'waitForAnimate'
  > {
  /** Whether to show dots indicating slides. */
  dots?: boolean;
}

/**
 * Carousel component extends the functionality of the Ant Design Carousel component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Carousel component.
 *
 * @param {Props} props - The properties for the Carousel component.
 * @param {string} [props.className] - Custom CSS class for styling the carousel.
 * @param {ReactNode} [props.children] - Content to be rendered inside the carousel.
 * @param {boolean} [props.adaptiveHeight=false] - Adjust the height of the carousel automatically based on the slide content.
 * @param {() => void} [props.afterChange] - Callback function called after a slide changes.
 * @param {boolean} [props.arrows=true] - Display navigation arrows.
 * @param {boolean} [props.autoplay=true] - Enable automatic slide transition.
 * @param {number} [props.autoplaySpeed=3000] - Delay between each auto transition (in milliseconds).
 * @param {() => void} [props.beforeChange] - Callback function called before a slide changes.
 * @param {string} [props.dotPosition='bottom'] - Position of the navigation dots.
 * @param {boolean} [props.dots=true] - Whether to show dots indicating slides.
 * @param {boolean} [props.draggable=true] - Enable dragging to navigate slides.
 * @param {boolean} [props.fade=false] - Use a fade effect for transitions.
 * @param {boolean} [props.infinite=true] - Enable infinite looping of slides.
 * @param {number} [props.speed=500] - Transition speed (in milliseconds).
 * @param {boolean} [props.waitForAnimate=false] - Wait for the animation to finish before changing the slide.
 * @param {boolean} [props.pauseOnHover=true] - Pause the autoplay when the mouse is over the carousel.
 * @param {number} [props.slidesToShow=1] - Number of slides to show at a time.
 * @param {number} [props.slidesToScroll=1] - Number of slides to scroll at a time.
 * @returns {ReactNode} The rendered Carousel component.
 */
export const Carousel = forwardRef<Actions, Props>((props, ref) => {
  const {
    className,
    children,
    adaptiveHeight = false,
    afterChange,
    arrows = true,
    autoplay = true,
    autoplaySpeed = 3000,
    beforeChange,
    dotPosition = 'bottom',
    dots = true,
    draggable = true,
    fade = false,
    infinite = true,
    speed = 500,
    waitForAnimate = false,
    pauseOnHover = true,
    slidesToShow = 1,
    slidesToScroll = 1,
  } = props;

  useInitializeContext();
  const carouselRef = useRef<CarouselRef>(null);

  useImperativeHandle(ref, () => {
    return {
      goTo: (...args): void => {
        return carouselRef.current?.goTo?.(...args);
      },
      next: (): void => {
        return carouselRef.current?.next?.();
      },
      prev: (): void => {
        return carouselRef.current?.prev?.();
      },
    };
  }, []);

  return (
    <AntCarousel
      ref={carouselRef}
      accessibility
      adaptiveHeight={adaptiveHeight}
      arrows={arrows}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
      children={children}
      className={classNames('AntCarousel__container', className)}
      dotPosition={dotPosition}
      dots={dots}
      draggable={draggable}
      fade={fade}
      infinite={infinite}
      pauseOnHover={pauseOnHover}
      slidesToScroll={slidesToScroll}
      slidesToShow={slidesToShow}
      speed={speed}
      waitForAnimate={waitForAnimate}
      afterChange={afterChange}
      beforeChange={beforeChange}
    />
  );
});

Carousel.displayName = 'Carousel';
