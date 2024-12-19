import '@fontsource/inter'
import { ReduxProvider } from '@providers/ReduxProvider'
import { ThemeProvider } from '@providers/ThemeProvider'
import { MainPage } from '@pages'

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <MainPage />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
