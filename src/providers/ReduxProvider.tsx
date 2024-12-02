import { PropsWithChildren } from 'react'
import { store } from '@slices/store'
import { Provider } from 'react-redux'

export function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>
}
