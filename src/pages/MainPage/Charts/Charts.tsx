import { LineChart } from '@mui/x-charts'
import { selectCalculations } from '@slices/appSlice'
import { useSelector } from 'react-redux'

export function Charts() {
  const data = useSelector(selectCalculations)

  return (
    <LineChart
      series={[
        {
          data: data.posNoised,
          label: 'Измерения',
          color: 'red',
          showMark: false,
          id: 'fromSensor',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: data.posFiltered,
          label: 'Отфильтрованные',
          id: 'ideal',
          color: '#4C51DB',
          showMark: false,
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: data.posIdeal,
          label: 'Смоделированные',
          color: 'black',
          showMark: false,
          id: 'model',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
      ]}
      height={400}
      disableLineItemHighlight
      skipAnimation
      margin={{ left: 20, bottom: 20, right: 10 }}
      slotProps={{
        legend: {
          padding: 0,
          itemGap: 40,
        },
        popper: {
          sx: {
            '.MuiChartsTooltip-paper': {
              fontFamily: 'monospace',
              backgroundColor: 'white',
            },
          },
        },
      }}
    />
  )
}
