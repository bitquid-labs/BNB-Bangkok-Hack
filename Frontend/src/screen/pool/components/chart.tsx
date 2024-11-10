import { Browser } from '@syncfusion/ej2-base';
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTheme,
  AccumulationTooltip,
  IAccLoadedEventArgs,
  Inject,
  PieSeries,
} from '@syncfusion/ej2-react-charts';
import * as React from 'react';
import { StakeType } from '@/screen/stake/constants';
import { PieChart } from 'react-minimal-pie-chart';
import { usePoolCovers } from '@/hooks/contracts/pool/usePoolCovers';
import { PoolCoverType } from '@/types/main';
import { useAccount } from 'wagmi';
import { BQBTC } from '@/constant/config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const data1: any[] = [
  { x: 'Somalia', y: 1057022, r: '160', text: 'Somalia' },
  {
    x: 'PWR',
    y: 705370,
    r: Browser.isDevice ? '150' : '150',
    text: 'PWR',
  },
  {
    x: 'Babylon',
    y: 312685,
    r: '140',
    text: 'Babylon',
  },
  {
    x: 'Merlin',
    y: 551500,
    r: Browser.isDevice ? '125' : '125',
    text: 'Merlin',
  },
];

type DetailProps = {
  pool: StakeType | undefined;
  poolCovers: PoolCoverType[] | undefined;
};

const PieRadius = ({ pool, poolCovers }: DetailProps): JSX.Element => {
  const { chain } = useAccount();
  const palettes = [
    '#B09FFF',
    '#007ADF',
    '#00ECBC',
    '#373737',
    '#1f2766',
    '#c3dd80',
    '#85dd80',
  ];
  console.log('poolCovers: ', poolCovers);

  const pieData: { title: string; value: number; color: string }[] = [];
  poolCovers?.map((data, index) => {
    pieData.push({
      title: data.coverName,
      value: Number(data.capacity),
      color: palettes[index],
    });
  });
  console.log('piedata: ', pieData);

  const Data = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 70, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ];

  return (
    <>
      <PieChart data={pieData} />
      <div className='control-pane relative w-full'>
        <div className='absolute inset-2'>
          <div className='mb-[10px] flex flex-col items-center justify-center text-white'>
            <div className='text-3xl font-bold'>
              {pool?.tvl} {BQBTC.symbol}
            </div>
            <div>Total</div>
          </div>
        </div>
      </div>
    </>
    // <div className='control-pane relative'>
    // <div className='absolute left-1/2 top-1/2 z-10 flex h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white'>
    //   <div className='absolute inset-2'>
    //     <div className='h-full w-full rounded-full bg-gradient-to-br from-transparent via-[#00ECBC]/30 to-transparent p-[6px]'>
    //       <div className='flex h-full w-full items-center justify-center rounded-full bg-white'>
    //         <div className='flex flex-col items-center justify-center text-black'>
    //           <div className='text-3xl font-bold'>WBTC</div>
    //           <div className='text-3xl font-bold'>{pool?.tvl} {chain?.nativeCurrency.name}</div>
    //           <div>Total</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //   <div className='control-section'>
    //     <AccumulationChartComponent
    //       id='pie-chart'
    //       legendSettings={{ visible: false, reverse: true }}
    //       enableSmartLabels={false}
    //       enableBorderOnMouseMove={false}
    //       enableAnimation={true}
    //       tooltip={{
    //         enable: false,
    //         format:
    //           '<b>${point.x}</b><br/>Area in square km: <b>${point.y} </b> <br/> Population density per square km: <b>${point.tooltip}</b>',
    //       }}
    //     >
    //       <Inject
    //         services={[
    //           AccumulationLegend,
    //           PieSeries,
    //           AccumulationDataLabel,
    //           AccumulationTooltip,
    //         ]}
    //       />
    //       <AccumulationSeriesCollectionDirective>
    //         <AccumulationSeriesDirective
    //           dataSource={data1}
    //           xName='x'
    //           yName='y'
    //           innerRadius='20%'
    //           tooltipMappingName='r'
    //           dataLabel={{
    //             visible: false,
    //             position: Browser.isDevice ? 'Inside' : 'Outside',
    //             name: 'text',
    //             enableRotation: true,
    //             font: { fontWeight: '600' },
    //             connectorStyle: { length: '20px', type: 'Curve' },
    //           }}
    //           radius='r'
    //           palettes={palettes}
    //         />
    //       </AccumulationSeriesCollectionDirective>
    //     </AccumulationChartComponent>
    //   </div>
    // </div>
  );
};
export default PieRadius;
