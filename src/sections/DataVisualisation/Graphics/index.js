import React from 'react';

import { transformToChartData } from 'utils';

import LineChart from 'components/LineChart';

const Graphics = ({ data }) => <LineChart data={transformToChartData(data)} />;

export default Graphics;
