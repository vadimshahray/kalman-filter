import { Container, Stack } from '@mui/joy'
import { Chart } from './Chart'
import { Experiment } from './Experiment'

export function MainPage() {
  return (
    <Container maxWidth={false} sx={{ display: 'flex', gap: 2.5, py: 4, px: '48px !important' }}>
      <Stack spacing={5} width="100%">
        <Chart />

        <Experiment />
      </Stack>
    </Container>
  )
}
