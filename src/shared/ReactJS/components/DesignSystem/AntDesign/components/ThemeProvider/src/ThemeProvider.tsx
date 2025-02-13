import { App, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { Locale } from 'antd/es/locale';
import { SeedToken } from 'antd/es/theme/interface';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { InitializeProvider } from '../../../base/InitializeContext';

export interface ThemeConfig {
  /** Control height in pixels (Button, Input, DatePicker, ...) */
  controlHeight: number;
  /** Base font size in pixels (Button, Input, DatePicker, ...) */
  fontSize: number;
  /** Base font family */
  fontFamily: string;
  /** Border radius in pixels (Button, Input, DatePicker, ...) */
  borderRadius: number;
  /** Blue color value */
  blue: string;
  /** Purple color value */
  purple: string;
  /** Cyan color value */
  cyan: string;
  /** Green color value */
  green: string;
  /** Magenta color value */
  magenta: string;
  /** Pink color value */
  pink: string;
  /** Red color value */
  red: string;
  /** Orange color value */
  orange: string;
  /** Yellow color value */
  yellow: string;
  /** Volcano color value */
  volcano: string;
  /** Geekblue color value */
  geekblue: string;
  /** Gold color value */
  gold: string;
  /** Lime color value */
  lime: string;
  /** Primary color value */
  colorPrimary: string;
}

export interface Props extends PropsWithChildren {
  /** Theme config */
  config?: Partial<ThemeConfig>;
  /** Locale settings for the component. */
  locale?: Locale;
  /** Custom render empty for all component list like Table, Select, AutoComplete, ...*/
  renderEmpty?: () => ReactNode;
  /** Flag to indicate if the app is the server-side (SSR). */
  isSSR: boolean;
}

const defaultConfig: SeedToken = {
  blue: '#1677ff',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
  colorPrimary: '#722ED1',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',
  colorLink: '',
  colorTextBase: '',
  colorBgBase: '',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,\n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n'Noto Color Emoji'",
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontSize: 14,
  lineWidth: 1,
  lineType: 'solid',
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
  motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  borderRadius: 12,
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  controlHeight: 42,
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  opacityImage: 1,
  wireframe: false,
  motion: true,
};
const prefix = 'yy';

/**
 * ThemeProvider component extends the functionality of the Ant Design ThemeProvider component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design ThemeProvider component.
 *
 * @param props - The props for the ThemeProvider component.
 * @param props.config - Theme configuration object for customizing the theme.
 * @param props.locale - Locale settings for the component.
 * @param props.renderEmpty - Custom render function for empty states.
 * @param props.isSSR - Flag to indicate if the app is the server-side (SSR).
 * @param props.children - Child components to be rendered inside the ThemeProvider.
 *
 * @returns The ThemeProvider component with applied theme and settings.
 */
export const ThemeProvider: FC<Props> = ({ children, config = {}, renderEmpty, isSSR, locale }) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
  };

  return (
    <ConfigProvider
      popupMatchSelectWidth
      virtual
      popupOverflow="viewport"
      prefixCls={prefix}
      locale={locale}
      warning={{ strict: true }}
      renderEmpty={renderEmpty}
      theme={{
        cssVar: { prefix },
        hashed: false,
        inherit: false,
        components: {
          Menu: { itemHeight: mergedConfig.controlHeight },
          Pagination: { controlHeight: (mergedConfig.controlHeight * 5) / 6 },
          Table: { headerBg: '#F9FAFB' },
          Layout: { bodyBg: '#F4F5F6' },
          Select: { zIndexPopup: 100 },
          DatePicker: { zIndexPopup: 100 },
          Dropdown: { zIndexPopup: 100 },
          Modal: { zIndexPopupBase: 200 },
          Alert: { zIndexBase: 300 },
          Checkbox: { controlInteractiveSize: mergedConfig.controlHeight / 2 },
          Radio: { radioSize: mergedConfig.controlHeight / 2 },
          Tabs: { cardHeight: config.controlHeight },
        },
        token: mergedConfig,
      }}
    >
      <App>
        <InitializeProvider isSSR={isSSR}>{children}</InitializeProvider>
      </App>
    </ConfigProvider>
  );
};
