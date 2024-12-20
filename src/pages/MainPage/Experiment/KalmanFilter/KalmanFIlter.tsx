import { Stack } from '@mui/joy'
import { PField } from './PField'
import { QField } from './QField'
import { RField } from './RField'
import { HField } from './HField'
import { CountField } from './CountField'

export function KalmanFilter() {
  return (
    <Stack spacing={2}>
      <CountField />

      <Stack direction="row" gap={4}>
        <PField />

        <QField />

        <RField />

        <HField />
      </Stack>
    </Stack>
  )
}
