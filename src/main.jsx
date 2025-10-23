import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { AnimationProvider } from './contexts/AnimationContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import QSolveApp from './AppRefactor.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AnimationProvider>
      <QSolveApp/>
    </AnimationProvider>
  </Provider>
)
