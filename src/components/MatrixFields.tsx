import { Box, Stack, Typography } from '@mui/joy'

const gap = 1

type Props = { label: string; children: any }

export function MatrixFields({ label, children }: Props) {
  return (
    <Box>
      <Typography fontSize={14} mb={1.2}>
        {label}
      </Typography>

      <Stack gap={gap}>
        <Stack direction="row" gap={gap}>
          {children[0]}

          {children[1]}
        </Stack>

        <Stack direction="row" gap={gap}>
          {children[2]}

          {children[3]}
        </Stack>
      </Stack>
    </Box>
  )
}
