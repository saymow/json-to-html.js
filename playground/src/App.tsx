import './App.css'
import Main from './screens/main/main'
import { Provider } from 'react-redux'
import GithubCorner from 'react-github-corner'
import store from './store'
import { env } from './config/env'

function App() {
  return (
    <Provider store={store}>
      <GithubCorner
        href={env.GITHUB_URL}
        bannerColor="var(--bg-color-primary)"
        octoColor="var(--font-color)"
        size={80}
        direction="right"
      />
      <Main />
    </Provider>
  )
}

export default App
