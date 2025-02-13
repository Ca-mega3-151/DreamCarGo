import { useTranslation } from 'react-i18next';
import { BoxFields } from '~/components/BoxFields';
import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { BarChart, LineChart, PieChart } from '~/shared/ReactJS';

export const Page = () => {
  const { t } = useTranslation(['dashboard']);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 xl:col-span-2">
          <BoxFields className="h-full" title={t('dashboard:revenue')}>
            <LineChart
              labels={['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
              datasets={[
                {
                  rawData: undefined,
                  key: 'Product 1',
                  points: {
                    Sep: { data: 23, key: '1', rawData: undefined },
                    Oct: { data: 11, key: '2', rawData: undefined },
                    Nov: { data: 22, key: '3', rawData: undefined },
                    Dec: { data: 27, key: '4', rawData: undefined },
                    Jan: { data: 13, key: '5', rawData: undefined },
                    Feb: { data: 22, key: '6', rawData: undefined },
                    Mar: { data: 37, key: '7', rawData: undefined },
                    Apr: { data: 21, key: '8', rawData: undefined },
                    May: { data: 44, key: '9', rawData: undefined },
                    Jun: { data: 22, key: '10', rawData: undefined },
                    Jul: { data: 30, key: '11', rawData: undefined },
                    Aug: { data: 45, key: '12', rawData: undefined },
                  },
                  style: {
                    lineColor: 'rgba(255, 71, 87, 1)',
                    areaColor: {
                      0: 'rgba(255, 71, 87, 0.2)',
                      100: 'rgba(255, 71, 87, 0.05)',
                    },
                  },
                },
              ]}
            />
          </BoxFields>
        </div>
        <div className="col-span-3 xl:col-span-1">
          <BoxFields className="h-full" title={t('dashboard:source')}>
            <div className="grid grid-cols-1 gap-3">
              <PieChart
                labels={['Direct', 'Organic search', 'Referrals']}
                datasets={[
                  {
                    key: '1',
                    rawData: undefined,
                    slices: {
                      'Organic search': {
                        data: 52.8,
                        key: '1',
                        rawData: undefined,
                        style: { backgroundColor: 'rgba(255, 71, 87, 1)', color: '#fff' },
                      },
                      Direct: {
                        data: 26.8,
                        key: '2',
                        rawData: undefined,
                        style: { backgroundColor: '#ff7f50', color: '#fff' },
                      },
                      Referrals: {
                        data: 20.4,
                        key: '3',
                        rawData: undefined,
                        style: { backgroundColor: '#2ed573', color: '#fff' },
                      },
                    },
                  },
                ]}
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-sm" style={{ background: '#ff7f50' }} /> Direct
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-sm" style={{ background: 'rgba(255, 71, 87, 1)' }} /> Organic search
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-sm" style={{ background: '#2ed573' }} /> Referrals
                </div>
              </div>
            </div>
          </BoxFields>
        </div>
        <div className="col-span-3">
          <BoxFields title={t('dashboard:PNL')}>
            <div className="grid grid-cols-1 gap-3">
              <BarChart
                labels={[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ]}
                datasets={[
                  {
                    key: 'Profit',
                    rawData: undefined,
                    style: { backgroundColor: '#2ed573' },
                    columns: {
                      January: { data: 5000, key: '1', rawData: undefined, style: { color: '#fff' } },
                      February: { data: 3000, key: '2', rawData: undefined, style: { color: '#fff' } },
                      March: { data: 7500, key: '3', rawData: undefined, style: { color: '#fff' } },
                      April: { data: 2000, key: '4', rawData: undefined, style: { color: '#fff' } },
                      May: { data: 6000, key: '5', rawData: undefined, style: { color: '#fff' } },
                      June: { data: 5500, key: '6', rawData: undefined, style: { color: '#fff' } },
                      July: { data: 8000, key: '7', rawData: undefined, style: { color: '#fff' } },
                      August: { data: 7000, key: '8', rawData: undefined, style: { color: '#fff' } },
                      September: { data: 9000, key: '9', rawData: undefined, style: { color: '#fff' } },
                      October: { data: 6500, key: '10', rawData: undefined, style: { color: '#fff' } },
                      November: { data: 4000, key: '11', rawData: undefined, style: { color: '#fff' } },
                      December: { data: 10000, key: '12', rawData: undefined, style: { color: '#fff' } },
                    },
                  },
                  {
                    key: 'Loss',
                    rawData: undefined,
                    style: { backgroundColor: '#ff6348' },
                    columns: {
                      January: { data: 4500, key: '1', rawData: undefined, style: { color: '#fff' } },
                      February: { data: 6200, key: '2', rawData: undefined, style: { color: '#fff' } },
                      March: { data: 7800, key: '3', rawData: undefined, style: { color: '#fff' } },
                      April: { data: 3300, key: '4', rawData: undefined, style: { color: '#fff' } },
                      May: { data: 9100, key: '5', rawData: undefined, style: { color: '#fff' } },
                      June: { data: 4700, key: '6', rawData: undefined, style: { color: '#fff' } },
                      July: { data: 4700, key: '7', rawData: undefined, style: { color: '#fff' } },
                      August: { data: 7100, key: '8', rawData: undefined, style: { color: '#fff' } },
                      September: { data: 9500, key: '9', rawData: undefined, style: { color: '#fff' } },
                      October: { data: 5400, key: '10', rawData: undefined, style: { color: '#fff' } },
                      November: { data: 8000, key: '11', rawData: undefined, style: { color: '#fff' } },
                      December: { data: 12000, key: '12', rawData: undefined, style: { color: '#fff' } },
                    },
                  },
                ]}
              />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-sm" style={{ background: '#2ed573' }} />
                  Profit
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-2 rounded-sm" style={{ background: '#ff6348' }} />
                  Loss
                </div>
              </div>
            </div>
          </BoxFields>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
