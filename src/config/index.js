const defaultFnName = 'getNth';

const config = {
  formulas: {
    // JavaScript implementation of n⋅ln(n) + n⋅(ln(ln(n)) − 1)
    // NOTE: valid for n > 6
    primeLowerBound: n => n * Math.log(n) + n * (Math.log(Math.log(n))),
    // JavaScript implementation of n⋅ln(n) + n⋅ln(ln(n)
    // NOTE: valid for n > 6
    primeUpperBound: n => n * Math.log(n) + n * (Math.log(Math.log(n)) - 1),
  },

  urls: {
    monaco_loader: '/monaco-editor/vs/loader.js',
    monaco_base: '/monaco-editor/vs',
  },

  graphics: {
    lineChartProps: {
      margin: { top: 10, right: 10, bottom: 30, left: 30 },
      xScale: { type: 'point' },
      yScale: { type: 'linear', stacked: false, min: 'auto', max: 'auto' },
      axisTop: null,
      axisRight: null,
      colors: { scheme: 'category10' },
      pointSize: 8,
      curve: 'cardinal',
      pointColor: { theme: 'background' },
      pointBorderWidth: 0.5,
      pointBorderColor: { from: 'serieColor' },
      pointLabel: 'y',
      pointLabelYOffset: -12,
      useMesh: true,
      enableGridX: false,
      enableGridY: false,
      lineWidth: 1,
      legends: [{
        anchor: 'bottom-right',
        direction: 'column',
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        translateX: -70,
        translateY: -20,
        itemOpacity: 0.5,
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      }],
    },
  },

  range: {
    min: 1,
    max: 100,
  },

  custom: `
    // write you formula here as a function named "${defaultFnName}".
    // It should be a function based on "n"
    // and sould try to return the nth prime number
    // something like this:

    const { ceil, log2 } = Math;

    function ${defaultFnName}(n) {
      const res = 2**(1.5 * log2(n)) + log2(n) + 1 - 2**log2(n);
      return ceil(res);
    }

    // note that it can be other function too, not only something related
    // to prime, just name it "${defaultFnName}". (and you can remove all comments and everything else here :))
  `.trim().replace(/^ {4}/gm, ''),

  editor: {
    language: 'javascript',
    value: '',
  },

  defaultFnName,
};

export default config;
