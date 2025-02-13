# Overview

The `Carousel` component extends the functionality of the Ant Design Carousel component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Carousel component.

# Props

| Prop           | Type         | Default    | Description                                                                 |
| -------------- | ------------ | ---------- | --------------------------------------------------------------------------- |
| className      | `string`     | -          | Custom CSS class for styling the carousel.                                  |
| children       | `ReactNode`  | -          | Content to be rendered inside the carousel.                                 |
| adaptiveHeight | `boolean`    | `false`    | Adjust the height of the carousel automatically based on the slide content. |
| afterChange    | `() => void` | -          | Callback function called after a slide changes.                             |
| arrows         | `boolean`    | `true`     | Display navigation arrows.                                                  |
| autoplay       | `boolean`    | `true`     | Enable automatic slide transition.                                          |
| autoplaySpeed  | `number`     | `3000`     | Delay between each auto transition (in milliseconds).                       |
| beforeChange   | `() => void` | -          | Callback function called before a slide changes.                            |
| dotPosition    | `string`     | `'bottom'` | Position of the navigation dots.                                            |
| dots           | `boolean`    | `true`     | Whether to show dots indicating slides.                                     |
| draggable      | `boolean`    | `true`     | Enable dragging to navigate slides.                                         |
| fade           | `boolean`    | `false`    | Use a fade effect for transitions.                                          |
| infinite       | `boolean`    | `true`     | Enable infinite looping of slides.                                          |
| pauseOnHover   | `boolean`    | `true`     | Pause the autoplay when the mouse is over the carousel.                     |
| slidesToShow   | `number`     | `1`        | Number of slides to show at a time.                                         |
| slidesToScroll | `number`     | `1`        | Number of slides to scroll at a time.                                       |
| speed          | `number`     | `500`      | Transition speed (in milliseconds).                                         |
| waitForAnimate | `boolean`    | `false`    | Wait for the animation to finish before changing the slide.                 |

# Usage

```jsx
import { Carousel } from "path-to-Carousel";

// Example usage
<Carousel className="custom-class" adaptiveHeight afterChange={() => console.log("Slide changed")} arrows autoplay autoplaySpeed={2000} beforeChange={() => console.log("Slide will change")} dotPosition="top" dots draggable fade infinite speed={700} waitForAnimate pauseOnHover slidesToShow={3} slidesToScroll={1}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>;
```
