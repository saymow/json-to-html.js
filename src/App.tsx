import './App.css'
import Main from './screens/main/main'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App
