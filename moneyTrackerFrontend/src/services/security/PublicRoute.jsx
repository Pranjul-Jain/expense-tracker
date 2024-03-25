import React,{Suspense} from 'react'
import LoadingPage from '../../pages/LoadingPage/LoadingPage'

const PublicRoute = ({children}) => {

  return (
    <Suspense fallback={<LoadingPage/>}>
        {children}
    </Suspense>
  )
}

export default PublicRoute