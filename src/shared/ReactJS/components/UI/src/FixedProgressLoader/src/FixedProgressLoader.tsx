import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useDeepCompareEffect } from '../../../../../hooks';
import { isBrowser } from '~/shared/Utilities';
import './styles.css';

export interface Props {
  /** Indicates whether loading is complete or not */
  done: boolean;
  /** Duration of the progress bar in milliseconds */
  duration?: number;
  /** Class name for the container element */
  containerClassName?: string;
  /** Class name for the progress bar */
  barClassName?: string;
  /** Indicates whether the progress bar is hidden */
  hidden?: boolean;
  /** Indicates whether the progress bar is placed at the top of the container */
  placementTop?: boolean;
  /** Color for the progress bar */
  color?: string;
}

let progressWrapperElement: HTMLDivElement | undefined;

if (isBrowser()) {
  progressWrapperElement = document.createElement('div');
  progressWrapperElement.id = 'progress-wrapper-element';
  document.body.appendChild(progressWrapperElement);
}

/**
 * A React component for a fixed progress loader.
 * It displays a progress bar at the top of the page to indicate loading status.
 */
export const FixedProgressLoader: FC<Props> = ({
  done = false,
  duration = 300,
  containerClassName = '',
  barClassName = '',
  hidden = false,
  placementTop = true,
  color = '#722ED1',
}) => {
  /** Counter to control the progress animation */
  const [count, setCount] = useState(0);

  /** State to track if loading is done */
  const [doneState, setDoneState] = useState(false);

  /** Reference to the interval used for the progress animation */
  const intervalRef = useRef(0);

  /** Reference to the timeout used for handling loading completion */
  const timeoutRef = useRef(0);

  /** Reference to the progress bar element in the DOM */
  const progressElement = useMemo(() => {
    if (isBrowser()) {
      return document.querySelector('.progress-element');
    }
    return;
  }, []);

  useDeepCompareEffect(() => {
    if (isBrowser()) {
      intervalRef.current = window.setInterval(
        () => {
          if (count < 9) {
            setCount(count => {
              return count + 1;
            });
          } else {
            clearInterval(intervalRef.current);
          }
        },
        Math.min(duration + 200, 500),
      );
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count, duration]);

  useDeepCompareEffect(() => {
    if (isBrowser()) {
      clearTimeout(timeoutRef.current);
      if (done) {
        setCount(10);
        timeoutRef.current = window.setTimeout(() => {
          setDoneState(true);
          clearTimeout(timeoutRef.current);
          progressElement?.remove();
        }, duration);
      } else {
        setCount(0);
        setDoneState(false);
        timeoutRef.current = window.setTimeout(() => {
          setDoneState(false);
          clearTimeout(timeoutRef.current);
          progressElement?.remove();
        }, duration);
      }
    }
    return () => {
      clearTimeout(timeoutRef.current);
      progressElement?.remove();
    };
  }, [done, duration]);

  if (doneState) {
    return null;
  }

  const renderContent = (): ReactNode => {
    return (
      <div
        className={classNames(
          'FixedProgressLoader__container',
          hidden ? 'FixedProgressLoader__container--hidden' : '',
          containerClassName,
        )}
      >
        <div
          className={classNames('FixedProgressLoader__bar', barClassName)}
          style={{
            backgroundColor: color,
            width: `${count * 10}%`,
            transition: `width ${duration}ms`,
          }}
        />
      </div>
    );
  };

  if (placementTop && !!progressElement) {
    return createPortal(renderContent(), progressElement);
  }

  return renderContent();
};
