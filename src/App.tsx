import './App.css'
import Navigation from './components/Navigation'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => {

  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  )
}

export default App
