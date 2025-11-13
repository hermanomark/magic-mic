import './App.css'
import Navigation from './components/Navigation'
import { ThemeProvider } from './components/ThemeProvider'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { appRoutes } from './routes'

const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {appRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
