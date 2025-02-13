import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Font } from 'chartjs-plugin-datalabels/types/options';
import classNames from 'classnames';
import { nth } from 'ramda';
import { ComponentProps, ReactNode, useCallback, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { v4 } from 'uuid';
import { ClientSideOnly } from '../../../../../../Features';
import { Tooltip as AntTooltip } from '../../../../components';
import './styles.css';
import { CallbackParams } from './types/CallbackParams';
import { DataSet } from './types/DataSet';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);
type RawChartJSProps = ComponentProps<typeof Bar>;

export interface Props<Label extends string, DataSetRawData, ColumnRawData> {
  /**
   * An array of labels representing each column of the bar chart.
   * These labels correspond to specific columns within the datasets.
   */
  labels: Label[];
  /** A function to format the data column displayed on each column. */
  formatter?: (params: CallbackParams<Label, DataSetRawData, ColumnRawData>) => string;
  /**
   * A callback function triggered when a data column is clicked.
   * The function receives detailed information about the clicked column, including its dataset and label.
   */
  onClickColumn?: (params: CallbackParams<Label, DataSetRawData, ColumnRawData>) => void;
  /**
   * A callback function triggered when a data column is hovered over.
   * The function receives detailed information about the hovered column, including its dataset and label.
   */
  onHoverColumn?: (params: CallbackParams<Label, DataSetRawData, ColumnRawData>) => void;
  /**
   * An array of datasets to be visualized in the bar chart.
   * Each dataset contains multiple columns that together form the entire chart.
   */
  datasets: DataSet<Label, DataSetRawData, ColumnRawData>[];
  /**
   * An object to customize the tooltip displayed when hovering over a column.
   * This object can include properties to enable the tooltip and to render custom content
   * based on the column's data and other properties.
   */
  tooltip?: {
    render?: (props: CallbackParams<Label, DataSetRawData, ColumnRawData>) => ReactNode;
    enabled?: boolean;
  };
  /** An optional CSS class name to apply custom styles to the chart container. */
  className?: string;
  /**
   * If `true`, the bars in the chart will be stacked on top of each other.
   * This is useful for comparing parts of a whole across different categories.
   */
  stacked?: boolean;
  /**
   * Determines the orientation of the bars in the chart.
   * Can be 'vertical' (default) or 'horizontal'.
   */
  variant?: 'vertical' | 'horizontal';
}

/**
 * The BarChart component renders a customizable bar chart, which can be configured to display data vertically or horizontally.
 * The chart can optionally stack bars on top of each other and supports interactive features such as click and hover events.
 *
 * @param stacked - If `true`, the bars will be stacked on top of each other.
 * @param variant - The orientation of the bars ('vertical' or 'horizontal').
 * @param labels - The labels for each bar or group of bars in the chart.
 * @param datasets - The datasets containing bars to be displayed in the chart.
 * @param className - An optional CSS class name for custom styling of the chart.
 * @param formatter - A function to format the numerical values displayed on the bars.
 * @param onClickColumn - A callback function triggered when a bar is clicked.
 * @param onHoverColumn - A callback function triggered when a bar is hovered over.
 * @param tooltip - An object to customize the tooltip displayed when hovering over a column.
 *
 * @returns A ReactNode representing the rendered bar chart.
 */
export const BarChart = <Label extends string, DataSetRawData, ColumnRawData>({
  stacked = false,
  variant = 'vertical',
  labels = [],
  datasets,
  className,
  formatter,
  onClickColumn,
  onHoverColumn,
  tooltip,
}: Props<Label, DataSetRawData, ColumnRawData>): ReactNode => {
  const [tooltipState, setTooltipState] = useState<{
    open: boolean;
    x: number;
    y: number;
    data: CallbackParams<Label, DataSetRawData, ColumnRawData>;
    key: string;
  } | null>(null);

  interface HandleGetTargetDatasetNDataColumn {
    columnIndex: number | undefined;
    datasetIndex: number | undefined;
  }
  const handleGetTargetDatasetNDataColumn = useCallback(
    ({ datasetIndex, columnIndex }: HandleGetTargetDatasetNDataColumn) => {
      const targetLabel = columnIndex !== undefined ? nth(columnIndex, labels) : undefined;
      const targetDataset = datasetIndex !== undefined ? nth(datasetIndex, datasets) : undefined;
      const targetDataColumn = targetLabel ? targetDataset?.columns[targetLabel] : undefined;
      return {
        targetDataColumn,
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
        const { data, colors, fonts } = labels.reduce<{
          data: number[];
          colors: string[];
          fonts: Font[];
        }>(
          (result, label) => {
            const column = dataset.columns[label];
            return {
              data: result.data.concat(column.data),
              colors: result.colors.concat(column.style.color),
              fonts: result.fonts.concat({
                family: column.style.fontFamily,
                weight: column.style.fontWeight,
                size: column.style.fontSize,
              }),
            };
          },
          { data: [], colors: [], fonts: [] },
        );
        return {
          data,
          backgroundColor: dataset.style.backgroundColor,
          datalabels: {
            color: colors,
            font: fonts,
            anchor: 'end',
            align: 'start',
            formatter: (_, context): string => {
              const { targetDataColumn, targetDataset, targetLabel } = handleGetTargetDatasetNDataColumn({
                datasetIndex: context.datasetIndex,
                columnIndex: context.dataIndex,
              });
              if (targetDataColumn && targetDataset && targetLabel) {
                if (formatter) {
                  return formatter?.({ dataset, dataColumn: targetDataColumn, label: targetLabel });
                }
                return targetDataColumn.data.toString();
              }
              return 'ERR!!';
            },
          },
        };
      }),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, datasets]);

  const isVertical = useMemo(() => {
    return variant === 'vertical';
  }, [variant]);
  const isHoriztonal = useMemo(() => {
    return variant === 'horizontal';
  }, [variant]);

  const renderTooltipContent = (): ReactNode => {
    if (!tooltipState || tooltip?.enabled === false) {
      return null;
    }
    if (tooltip?.render) {
      return tooltip.render?.(tooltipState.data);
    }
    return `${tooltipState.data.label}: ${tooltipState.data.dataColumn.data}`;
  };

  return (
    <ClientSideOnly>
      <div
        className={classNames('AntBarChart__container', className)}
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
            className="AntBarChart__tooltipPlaceholder"
            style={{
              left: tooltipState?.x,
              top: tooltipState?.y,
            }}
          />
        </AntTooltip>
        <Bar
          data={data}
          options={{
            animation: false,
            normalized: true,
            responsive: true,
            maintainAspectRatio: false,
            onResize: (chart, size) => {
              chart.canvas.style.width = size.width + 'px';
              chart.canvas.style.height = size.width * 0.5 + 'px';
            },
            indexAxis: isVertical ? 'x' : 'y',
            scales: stacked
              ? {
                  xAxes: isVertical ? { stacked: true, display: false, beginAtZero: true } : undefined,
                  yAxes: isHoriztonal ? { stacked: true, display: false, beginAtZero: true } : undefined,
                }
              : undefined,
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

                        const { targetDataColumn, targetDataset, targetLabel } = handleGetTargetDatasetNDataColumn({
                          datasetIndex: element.datasetIndex,
                          columnIndex: element.dataIndex,
                        });
                        if (targetDataColumn && targetDataset && targetLabel) {
                          setTooltipState({
                            key: v4(),
                            open: true,
                            x: tooltip.caretX,
                            y: tooltip.caretY,
                            data: {
                              dataset: targetDataset,
                              dataColumn: targetDataColumn,
                              label: targetLabel,
                            },
                          });
                        }
                      },
              },
            },
            onClick: (_, elements) => {
              const element = nth(0, elements);
              const { targetDataColumn, targetDataset, targetLabel } = handleGetTargetDatasetNDataColumn({
                datasetIndex: element?.datasetIndex,
                columnIndex: element?.index,
              });
              if (targetDataColumn && targetDataset && targetLabel) {
                onClickColumn?.({
                  dataset: targetDataset,
                  dataColumn: targetDataColumn,
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

              const { targetDataColumn, targetDataset, targetLabel } = handleGetTargetDatasetNDataColumn({
                datasetIndex: element?.datasetIndex,
                columnIndex: element?.index,
              });
              if (targetDataColumn && targetDataset && targetLabel) {
                onHoverColumn?.({
                  dataset: targetDataset,
                  dataColumn: targetDataColumn,
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
