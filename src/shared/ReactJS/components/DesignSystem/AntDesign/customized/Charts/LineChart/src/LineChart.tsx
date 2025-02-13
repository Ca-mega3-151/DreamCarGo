import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import gradient from 'chartjs-plugin-gradient';
import classNames from 'classnames';
import { nth } from 'ramda';
import { ComponentProps, ReactNode, useCallback, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { v4 } from 'uuid';
import { ClientSideOnly } from '../../../../../../Features';
import { Tooltip as AntTooltip } from '../../../../components';
import './styles.css';
import { CallbackParams } from './types/CallbackParams';
import { DataSet } from './types/DataSet';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, ChartDataLabels, gradient);
type RawChartJSProps = ComponentProps<typeof Line>;

export interface Props<Label extends string, DataSetRawData, PointRawData> {
  /**
   * An array of labels representing each point of the line chart.
   * These labels correspond to specific points within the datasets.
   */
  labels: Label[];
  /**
   * A callback function triggered when a data point is clicked.
   * The function receives detailed information about the clicked point, including its dataset and label.
   */
  onClickPoint?: (params: CallbackParams<Label, DataSetRawData, PointRawData>) => void;
  /**
   * A callback function triggered when a data point is hovered over.
   * The function receives detailed information about the hovered point, including its dataset and label.
   */
  onHoverPoint?: (params: CallbackParams<Label, DataSetRawData, PointRawData>) => void;
  /**
   * An array of datasets to be visualized in the line chart.
   * Each dataset contains multiple points that together form the entire chart.
   */
  datasets: DataSet<Label, DataSetRawData, PointRawData>[];
  /**
   * An object to customize the tooltip displayed when hovering over a point.
   * This object can include properties to enable the tooltip and to render custom content
   * based on the point's data and other properties.
   */
  tooltip?: {
    render?: (props: CallbackParams<Label, DataSetRawData, PointRawData>) => ReactNode;
    enabled?: boolean;
  };
  /** An optional CSS class name to apply custom styles to the chart container. */
  className?: string;
}

/**
 * A LineChart component that renders data as a line chart, where each point
 * represents a proportion of the whole based on numerical values.
 *
 * @param labels - The labels for the points in the line chart.
 * @param datasets - The datasets containing points to be displayed in the chart.
 * @param onClickPoint - A callback function triggered when a point is clicked.
 * @param onHoverPoint - A callback function triggered when a point is hovered over.
 * @param className - An optional CSS class for custom styling of the chart.
 * @param tooltip - An object to customize the tooltip displayed when hovering over a point.
 *
 * @returns A ReactNode representing the rendered line chart.
 */
export const LineChart = <Label extends string, DataSetRawData, PointRawData>({
  labels,
  datasets,
  onClickPoint,
  onHoverPoint,
  className,
  tooltip,
}: Props<Label, DataSetRawData, PointRawData>): ReactNode => {
  const [tooltipState, setTooltipState] = useState<{
    open: boolean;
    x: number;
    y: number;
    data: CallbackParams<Label, DataSetRawData, PointRawData>;
    key: string;
  } | null>(null);

  const data: RawChartJSProps['data'] = useMemo(() => {
    return {
      labels,
      datasets: datasets.map<RawChartJSProps['data']['datasets'][number]>(dataset => {
        const pointSize = dataset.style.pointSize ?? 5;
        return {
          tension: 0.4,
          data: labels.map(label => {
            return dataset.points[label].data;
          }),
          borderWidth: dataset.style.lineWidth ?? 4,
          borderColor: dataset.style.lineColor,
          pointBorderColor: 'transparent',
          pointBackgroundColor: dataset.style.pointColor ?? dataset.style.lineColor,
          pointRadius: pointSize,
          pointHoverRadius: pointSize + 2,
          backgroundColor: typeof dataset.style.areaColor === 'string' ? dataset.style.areaColor : 'transparent',
          fill: dataset.style.areaVariant ?? 'start',
          gradient:
            typeof dataset.style.areaColor === 'object'
              ? { backgroundColor: { axis: 'y', colors: dataset.style.areaColor } }
              : undefined,
        };
      }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, datasets]);

  interface HandleGetTargetDatasetNDataPoint {
    pointIndex: number | undefined;
    datasetIndex: number | undefined;
  }
  const handleGetTargetDatasetNDataPoint = useCallback(
    ({ datasetIndex, pointIndex }: HandleGetTargetDatasetNDataPoint) => {
      const targetLabel = pointIndex !== undefined ? nth(pointIndex, labels) : undefined;
      const targetDataset = datasetIndex !== undefined ? nth(datasetIndex, datasets) : undefined;
      const targetDataPoint = targetLabel ? targetDataset?.points[targetLabel] : undefined;
      return {
        targetDataPoint,
        targetDataset,
        targetLabel,
      };
    },
    [datasets, labels],
  );

  const renderTooltipContent = (): ReactNode => {
    if (!tooltipState || tooltip?.enabled === false) {
      return null;
    }
    if (tooltip?.render) {
      return tooltip.render?.(tooltipState.data);
    }
    return `${tooltipState.data.label}: ${tooltipState.data.dataPoint.data}`;
  };

  return (
    <ClientSideOnly>
      <div
        className={classNames('AntLineChart__container', className)}
        onMouseLeave={event => {
          event.stopPropagation();
          setTooltipState(null);
        }}
      >
        <AntTooltip
          placement="right"
          getPopupContainer={container => {
            return container.parentElement ?? document.body;
          }}
          key={tooltipState?.key}
          content={renderTooltipContent}
          open={tooltipState?.open}
          openVariant="controlled-state"
        >
          <div
            className="AntLineChart__tooltipPlaceholder"
            style={{
              left: tooltipState?.x,
              top: tooltipState?.y,
            }}
          />
        </AntTooltip>
        <Line
          data={data}
          options={{
            animation: false,
            normalized: true,
            spanGaps: true,
            responsive: true,
            maintainAspectRatio: false,
            onResize: (chart, size) => {
              chart.canvas.style.width = size.width + 'px';
              chart.canvas.style.height = size.width * 0.5 + 'px';
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },

            plugins: {
              datalabels: {
                display: false,
              },
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

                        const { targetDataPoint, targetDataset, targetLabel } = handleGetTargetDatasetNDataPoint({
                          datasetIndex: element.datasetIndex,
                          pointIndex: element.dataIndex,
                        });
                        if (targetDataPoint && targetDataset && targetLabel) {
                          setTooltipState({
                            key: v4(),
                            open: true,
                            x: tooltip.caretX,
                            y: tooltip.caretY,
                            data: {
                              dataset: targetDataset,
                              dataPoint: targetDataPoint,
                              label: targetLabel,
                            },
                          });
                        }
                      },
              },
            },
            onClick: (_, elements) => {
              const element = nth(0, elements);
              const { targetDataPoint, targetDataset, targetLabel } = handleGetTargetDatasetNDataPoint({
                datasetIndex: element?.datasetIndex,
                pointIndex: element?.index,
              });
              if (targetDataPoint && targetDataset && targetLabel) {
                onClickPoint?.({
                  dataset: targetDataset,
                  dataPoint: targetDataPoint,
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

              const { targetDataPoint, targetDataset, targetLabel } = handleGetTargetDatasetNDataPoint({
                datasetIndex: element?.datasetIndex,
                pointIndex: element?.index,
              });
              if (targetDataPoint && targetDataset && targetLabel) {
                onHoverPoint?.({
                  dataset: targetDataset,
                  dataPoint: targetDataPoint,
                  label: targetLabel,
                });
              }
            },
          }}
        />
      </div>
    </ClientSideOnly>
  );
};
