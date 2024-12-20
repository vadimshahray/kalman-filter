import { Button, Radio, Stack } from '@mui/joy'
import { LineChart } from '@mui/x-charts'
import { selectCalculations, selectExperiment } from '@slices/appSlice'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function Chart() {
  const [chart, setChart] = useState<'position' | 'velocity'>('position')
  const [expand, setExpand] = useState(false)

  const experiment = useSelector(selectExperiment)

  return (
    <Stack spacing={2}>
      {experiment === 'MSD' && <MsdChart chart={chart} expand={expand} />}

      {experiment === 'UAV' && <SimpleChart chart={chart} expand={expand} />}

      <Stack direction="row" spacing={2} alignItems="center">
        {/* <Radio
          label="Позиция"
          checked={chart === 'position'}
          onChange={() => setChart('position')}
        />

        <Radio
          label="Скорость"
          checked={chart === 'velocity'}
          onChange={() => setChart('velocity')}
        /> */}

        <Button
          variant="plain"
          color="neutral"
          onClick={() => setExpand(!expand)}
          sx={{ alignSelf: 'flex-start' }}
        >
          {expand ? 'Свернуть' : 'Развернуть'}
        </Button>
      </Stack>
    </Stack>
  )
}

type ChartProps = {
  chart: 'position' | 'velocity'
  expand: boolean
}

function MsdChart({ chart, expand }: ChartProps) {
  const data = useSelector(selectCalculations) as MsdCalculations

  return (
    <LineChart
      series={[
        {
          data: chart === 'position' ? data.posNoised : data.velNoised,
          label: 'Измерения',
          color: '#EB7F78',
          showMark: false,
          id: 'fromSensor',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: chart === 'position' ? data.posFiltered : data.velFiltered,
          label: 'Отфильтрованные',
          id: 'ideal',
          color: '#4C51DB',
          showMark: false,
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: chart === 'position' ? data.posIdeal : data.velIdeal,
          label: 'Смоделированные',
          color: 'black',
          showMark: false,
          id: 'model',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
      ]}
      height={expand ? window.innerHeight - 120 : 400}
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

function SimpleChart({ expand }: ChartProps) {
  const data = useSelector(selectCalculations) as SimpleCalculations

  return (
    <LineChart
      series={[
        {
          data: data.noised,
          label: 'Измерения',
          color: '#EB7F78',
          showMark: false,
          id: 'fromSensor',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: data.filtered,
          label: 'Отфильтрованные',
          id: 'ideal',
          color: '#4C51DB',
          showMark: false,
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
        {
          data: data.ideal,
          label: 'Смоделированные',
          color: 'black',
          showMark: false,
          id: 'model',
          valueFormatter: (value) => `${value?.toFixed(3)}`,
        },
      ]}
      height={expand ? window.innerHeight - 120 : 400}
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
