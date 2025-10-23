import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './src/store'
import Example from './src/AppRefactor.jsx'

import ErrorBoundary from '@kombai/react-error-boundary'
import './src/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>

          <Example />

      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
