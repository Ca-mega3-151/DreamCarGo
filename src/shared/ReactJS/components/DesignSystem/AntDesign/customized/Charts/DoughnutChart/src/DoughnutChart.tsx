import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Font } from 'chartjs-plugin-datalabels/types/options';
import classNames from 'classnames';
import { nth } from 'ramda';
import { ComponentProps, ReactNode, useCallback, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { v4 } from 'uuid';
import { ClientSideOnly } from '../../../../../../Features';
import { Tooltip as AntTooltip } from '../../../../components';
import './styles.css';
import { CallbackParams } from './types/CallbackParams';
import { DataSet } from './types/DataSet';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);
type RawChartJSProps = ComponentProps<typeof Doughnut>;

export interface Props<Label extends string, DataSetRawData, SliceRawData> {
  /**
   * An array of labels representing each slice of the doughnut chart.
   * These labels correspond to specific slices within the datasets.
   */
  labels: Label[];
  /** A function to format the data slice displayed on each slice. */
  formatter?: (params: CallbackParams<Label, DataSetRawData, SliceRawData>) => string;
  /**
   * A callback function triggered when a data slice is clicked.
   * The function receives detailed information about the clicked slice, including its dataset and label.
   */
  onClickSlice?: (params: CallbackParams<Label, DataSetRawData, SliceRawData>) => void;
  /**
   * A callback function triggered when a data slice is hovered over.
   * The function receives detailed information about the hovered slice, including its dataset and label.
   */
  onHoverSlice?: (params: CallbackParams<Label, DataSetRawData, SliceRawData>) => void;
  /**
   * An array of datasets to be visualized in the doughnut chart.
   * Each dataset contains multiple slices that together form the entire chart.
   */
  datasets: DataSet<Label, DataSetRawData, SliceRawData>[];
  /**
   * An object to customize the tooltip displayed when hovering over a slice.
   * This object can include properties to enable the tooltip and to render custom content
   * based on the slice's data and other properties.
   */
  tooltip?: {
    render?: (props: CallbackParams<Label, DataSetRawData, SliceRawData>) => ReactNode;
    enabled?: boolean;
  };
  /** An optional CSS class name to apply custom styles to the chart container. */
  className?: string;
  /** The content to be displayed inside the doughnut chart. */
  content?: ReactNode | (() => ReactNode);
}

/**
 * A DoughnutChart component that renders data as a doughnut chart, where each slice
 * represents a proportion of the whole based on numerical values.
 *
 * @param {Object} props - The properties for the DoughnutChart component.
 * @param {Label[]} props.labels - An array of labels representing each slice of the doughnut chart. These labels correspond to specific slices within the datasets.
 * @param {DataSet<Label, DataSetRawData, SliceRawData>[]} props.datasets - An array of datasets to be visualized in the doughnut chart. Each dataset contains multiple slices that together form the entire chart.
 * @param {function} [props.formatter] - A function to format the data slice displayed on each slice.
 * @param {function} [props.onClickSlice] - A callback function triggered when a data slice is clicked. Receives detailed information about the clicked slice, including its dataset and label.
 * @param {function} [props.onHoverSlice] - A callback function triggered when a data slice is hovered over. Receives detailed information about the hovered slice, including its dataset and label.
 * @param {string} [props.className] - An optional CSS class name to apply custom styles to the chart container.
 * @param {Object} tooltip - An object to customize the tooltip displayed when hovering over a slice.
 * @param {ReactNode|function} [props.content] - The content to be displayed inside the doughnut chart.
 *
 * @returns {ReactNode} A ReactNode representing the rendered doughnut chart.
 */

export const DoughnutChart = <Label extends string, DataSetRawData, SliceRawData>({
  labels,
  datasets,
  formatter,
  onClickSlice,
  onHoverSlice,
  className,
  tooltip,
  content,
}: Props<Label, DataSetRawData, SliceRawData>): ReactNode => {
  const [tooltipState, setTooltipState] = useState<{
    open: boolean;
    x: number;
    y: number;
    data: CallbackParams<Label, DataSetRawData, SliceRawData>;
    key: string;
  } | null>(null);

  interface HandleGetTargetDatasetNDataSlice {
    sliceIndex: number | undefined;
    datasetIndex: number | undefined;
  }
  const handleGetTargetDatasetNDataSlice = useCallback(
    ({ datasetIndex, sliceIndex }: HandleGetTargetDatasetNDataSlice) => {
      const targetLabel = sliceIndex !== undefined ? nth(sliceIndex, labels) : undefined;
      const targetDataset = datasetIndex !== undefined ? nth(datasetIndex, datasets) : undefined;
      const targetDataSlice = targetLabel ? targetDataset?.slices[targetLabel] : undefined;
      return {
        targetDataSlice,
        targetDataset,
        targetLabel,
      };
    },
    [datasets, labels],
  );

  const data: RawChartJSProps['data'] = useMemo(() => {
    return {
      labels,
      datasets: datasets.map<RawChartJSProps['data']['datasets'][number]>(dataset => {
        const { data, backgroundColors, colors, fonts } = labels.reduce<{
          data: number[];
          backgroundColors: string[];
          colors: string[];
          fonts: Font[];
        }>(
          (result, label) => {
            const slice = dataset.slices[label];
            return {
              data: result.data.concat(slice.data),
              backgroundColors: result.backgroundColors.concat(slice.style.backgroundColor),
              colors: result.colors.concat(slice.style.color),
              fonts: result.fonts.concat({
                family: slice.style.fontFamily,
                weight: slice.style.fontWeight,
                size: slice.style.fontSize,
              }),
            };
          },
          { backgroundColors: [], data: [], colors: [], fonts: [] },
        );
        return {
          data,
          borderWidth: 4,
          backgroundColor: backgroundColors,
          datalabels: {
            color: colors,
            font: fonts,
            formatter: (_, context): string => {
              const { targetDataSlice, targetDataset, targetLabel } = handleGetTargetDatasetNDataSlice({
                datasetIndex: context.datasetIndex,
                sliceIndex: context.dataIndex,
              });
              if (targetDataSlice && targetDataset && targetLabel) {
                if (formatter) {
                  return formatter?.({ dataset, dataSlice: targetDataSlice, label: targetLabel });
                }
                return targetDataSlice.data.toString();
              }
              return 'ERR!!';
            },
          },
        };
      }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, datasets]);

  const renderTooltipContent = (): ReactNode => {
    if (!tooltipState || tooltip?.enabled === false) {
      return null;
    }
    if (tooltip?.render) {
      return tooltip.render?.(tooltipState.data);
    }
    return `${tooltipState.data.label}: ${tooltipState.data.dataSlice.data}`;
  };

  return (
    <ClientSideOnly>
      <div
        className={classNames('AntDoughnutChart__container', className)}
        onMouseLeave={event => {
          event.stopPropagation();
          setTooltipState(null);
        }}
      >
        <AntTooltip
          getPopupContainer={container => {
            return container.parentElement ?? document.body;
          }}
          key={tooltipState?.key}
          content={renderTooltipContent}
          open={tooltipState?.open}
          openVariant="controlled-state"
        >
          <div
            className="AntDoughnutChart__tooltipPlaceholder"
            style={{
              left: tooltipState?.x,
              top: tooltipState?.y,
            }}
          />
        </AntTooltip>
        <Doughnut
          data={data}
          options={{
            animation: false,
            normalized: true,
            responsive: true,
            maintainAspectRatio: false,
            onResize: (chart, size) => {
              chart.canvas.style.width = size.width + 'px';
              chart.canvas.style.height = size.width + 'px';
            },
            plugins: {
              tooltip: {
                enabled: false,
                external:
                  tooltip?.enabled === false
                    ? undefined
                    : ({ tooltip }): void => {
                        const element = nth(0, tooltip.dataPoints ?? []);
                        if (
                          !element ||
                          tooltip.opacity === 0 ||
                          (tooltipState?.x === tooltip.caretX && tooltipState.y === tooltip.caretY)
                        ) {
                          return;
                        }

                        const { targetDataSlice, targetDataset, targetLabel } = handleGetTargetDatasetNDataSlice({
                          datasetIndex: element.datasetIndex,
                          sliceIndex: element.dataIndex,
                        });
                        if (targetDataSlice && targetDataset && targetLabel) {
                          setTooltipState({
                            key: v4(),
                            open: true,
                            x: tooltip.caretX,
                            y: tooltip.caretY,
                            data: {
                              dataset: targetDataset,
                              dataSlice: targetDataSlice,
                              label: targetLabel,
                            },
                          });
                        }
                      },
              },
            },
            onClick: (_, elements) => {
              const element = nth(0, elements);
              const { targetDataSlice, targetDataset, targetLabel } = handleGetTargetDatasetNDataSlice({
                datasetIndex: element?.datasetIndex,
                sliceIndex: element?.index,
              });
              if (targetDataSlice && targetDataset && targetLabel) {
                onClickSlice?.({
                  dataset: targetDataset,
                  dataSlice: targetDataSlice,
                  label: targetLabel,
                });
              }
            },
            onHover: (event, elements) => {
              const element = nth(0, elements);
              if (!element && event.type === 'mousemove') {
                setTooltipState(null);
                return;
              }

              const { targetDataSlice, targetDataset, targetLabel } = handleGetTargetDatasetNDataSlice({
                datasetIndex: element?.datasetIndex,
                sliceIndex: element?.index,
              });
              if (targetDataSlice && targetDataset && targetLabel) {
                onHoverSlice?.({
                  dataset: targetDataset,
                  dataSlice: targetDataSlice,
                  label: targetLabel,
                });
              }
            },
          }}
        />
        <div className="AntDoughnutChart__cutout">{typeof content === 'function' ? content() : content}</div>
      </div>
    </ClientSideOnly>
  );
};
