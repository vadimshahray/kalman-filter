import { PropsWithChildren } from 'react'
import { CssBaseline, CssVarsProvider } from '@mui/joy'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { theme } from '@styles'

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MuiThemeProvider theme={createTheme({ shape: { borderRadius: 8 } })}>
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline />

        {children}
      </CssVarsProvider>
    </MuiThemeProvider>
  )
}
