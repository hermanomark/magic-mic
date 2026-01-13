import { useEffect } from 'react'

export const ScrollToTop = ({pathname}: {pathname: string}) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [pathname])

  return null
}