import './App.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { appRoutes } from './routes'
import { Spinner } from './components/ui/Spinner'
import MainLayout from './layouts/MainLayout'
import { ScrollToTop } from './components/ScrollToTop'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  const location = useLocation()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollToTop pathname={location.pathname}/>
      <Suspense fallback={<Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}>
        <AnimatePresence mode="wait" >
          <Routes key={location.pathname} location={location}>
            <Route element={<MainLayout />}>
              {appRoutes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
