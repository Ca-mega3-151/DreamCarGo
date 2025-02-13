import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineElement, PointElement } from 'chart.js';
import gradient from 'chartjs-plugin-gradient';
import classNames from 'classnames';
import { ComponentProps, ReactNode, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { ClientSideOnly } from '../../../../../../Features';
import './styles.css';
import { DataSet } from './types/DataSet';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, gradient);
type RawChartJSProps = ComponentProps<typeof Line>;

export interface Props<Label extends string, DataSetRawData, PointRawData> {
  /**
   * An array of labels representing each point of the line chart.
   * These labels correspond to specific points within the datasets.
   */
  labels: Label[];
  /**
   * An array of datasets to be visualized in the line chart.
   * Each dataset contains multiple points that together form the entire chart.
   */
  datasets: DataSet<Label, DataSetRawData, PointRawData>[];
  /** An optional CSS class name to apply custom styles to the chart container. */
  className?: string;
}

/**
 * A TrendlineChart component that renders data as a line chart, where each point
 * represents a proportion of the whole based on numerical values.
 *
 * @param labels - The labels for the points in the line chart.
 * @param datasets - The datasets containing points to be displayed in the chart.
 * @param className - An optional CSS class for custom styling of the chart.
 *
 * @returns A ReactNode representing the rendered line chart.
 */
export const TrendlineChart = <Label extends string, DataSetRawData, PointRawData>({
  labels,
  datasets,
  className,
}: Props<Label, DataSetRawData, PointRawData>): ReactNode => {
  const data: RawChartJSProps['data'] = useMemo(() => {
    return {
      labels,
      datasets: datasets.map<RawChartJSProps['data']['datasets'][number]>(dataset => {
        return {
          tension: 0.4,
          data: labels.map(label => {
            return dataset.points[label].data;
          }),
          borderWidth: dataset.style.lineWidth ?? 2,
          borderColor: dataset.style.lineColor,
          pointBorderColor: 'transparent',
          pointRadius: 0,
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

  return (
    <ClientSideOnly>
      <div className={classNames('AntTrendlineChart__container', className)}>
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
            scales: {
              x: {
                display: false,
                grid: { display: false },
              },
              y: {
                display: false,
                grid: { display: false },
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      </div>
    </ClientSideOnly>
  );
};
