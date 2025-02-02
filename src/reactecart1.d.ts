declare module 'echarts-for-react' {
  import { Component } from 'react';
  import EChartsOption from 'echarts-for-react';
  import { CSSProperties } from 'react';

  interface ReactEChartsProps {
    option: EChartsOption;
    style?: CSSProperties;
    className?: string;
    theme?: string | object;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    showLoading?: boolean;
    loadingOption?: object;
    onChartReady?: (echart: any) => void;
    onEvents?: { [key: string]: (params?: any, echart?: any) => void };
  }

  export default class ReactECharts extends Component<ReactEChartsProps> {}
}
