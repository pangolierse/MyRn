import { useState } from "react"

export const useAsync = (initState, dataPath ) => {
  const [ data, setData ] = useState(initState)
  const [ isLoading, setIsLoading ] = useState(false)
  const dataPathArray = dataPath?.split('.')
  const run = ( promise ) => {
    setIsLoading(true)
    return promise.then( res => {
      let resourceData = null
      dataPathArray.map( path => {
        resourceData = res[path]
      })
      
      setData(resourceData)
      setIsLoading(false)
    })
  }
  return {
    run,
    data,
    isLoading,
  }
}