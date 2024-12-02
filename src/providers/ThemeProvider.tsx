import { PropsWithChildren } from 'react'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider defaultMode="light">
      <CssBaseline />

      {children}
    </CssVarsProvider>
  )
}
