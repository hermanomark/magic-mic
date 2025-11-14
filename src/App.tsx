import './App.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { appRoutes } from './routes'
import { Spinner } from './components/ui/Spinner'
import MainLayout from './layouts/MainLayout'

const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}>
        <Routes>
          <Route element={<MainLayout />}>
          {appRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
