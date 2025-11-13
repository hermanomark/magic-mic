import './App.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { appRoutes } from './routes'
import MainLayout from './layouts/MainLayout'
const App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<div>Loading...</div>}>
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
