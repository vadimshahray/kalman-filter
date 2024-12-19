import { QField } from './QField'
import { RField } from './RField'
import { CountField } from '../CountField'
import { CField, InitPosField, InitVelField, MassField, SpringField } from './fields'
import { Stack } from '@mui/joy'

const rowGap = 0

export function MassSpringDamper() {
  return (
    <Stack direction="row" spacing={6}>
      <Stack spacing={rowGap} flex={1}>
        <Stack direction="row" gap={2}>
          <MassField />

          <SpringField />

          <CField />
        </Stack>

        <Stack direction="row" gap={2}>
          <InitPosField />

          <InitVelField />
        </Stack>
      </Stack>

      <Stack spacing={rowGap} flex={1}>
        <CountField />

        <QField />

        <RField />
      </Stack>
    </Stack>
  )
}
