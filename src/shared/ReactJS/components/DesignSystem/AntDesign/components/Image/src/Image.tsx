import { EyeOutlined } from '@ant-design/icons';
import { Image as AntImage, ImageProps as AntImageProps } from 'antd';
import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<
    AntImageProps,
    'className' | 'src' | 'srcSet' | 'width' | 'height' | 'loading' | 'placeholder' | 'alt' | 'fallback'
  > {
  /** Indicates whether the image can be previewed. */
  preview?: boolean;
  /** Thumbnail mask. */
  mask?: ReactNode;
}

/**
 * Image component extends the functionality of the Ant Design Image component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Image component.
 *
 * @param {Props} props - The properties for the Image component.
 * @param {string} [props.className] - Custom CSS class for styling the image.
 * @param {number | string} [props.height] - The height of the image.
 * @param {string} [props.src] - The source URL of the image.
 * @param {string} [props.srcSet] - A set of source sizes for the image.
 * @param {number | string} [props.width] - The width of the image.
 * @param {string} [props.loading='lazy'] - Indicates how the image should be loaded. Can be 'lazy' or 'eager'.
 * @param {ReactNode} [props.placeholder] - Placeholder content to show while the image is loading.
 * @param {string} [props.alt] - Alternate text description of the image.
 * @param {string} [props.fallback] - URL of the fallback image in case the primary image fails to load.
 * @param {boolean} [props.preview=true] - Indicates whether the image can be previewed.
 * @param {ReactNode} [props.mask] - Thumbnail mask.
 * @returns {ReactNode} The rendered Image component.
 */
export const Image: FC<Props> = ({
  className,
  height,
  src,
  srcSet,
  width,
  loading = 'lazy',
  placeholder,
  alt,
  fallback,
  preview = true,
  mask = <EyeOutlined />,
}) => {
  useInitializeContext();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AntImage
      wrapperClassName={classNames('AntImage__container', className)}
      height={height}
      src={src}
      srcSet={srcSet}
      width={width}
      loading={loading}
      placeholder={placeholder}
      alt={alt}
      fallback={fallback}
      preview={isError || isLoading || !preview ? false : { mask }}
      onError={() => {
        return setIsError(true);
      }}
      onLoad={event => {
        const $imageEl = event.target as HTMLImageElement;
        if ($imageEl.getAttribute('src') === src) {
          setIsLoading(false);
        }
      }}
    />
  );
};
