import { useState } from "react"

export const useAsync = (initState, dataPath ) => {
  const [ data, setData ] = useState(initState)
  const [ isLoading, setIsLoading ] = useState(false)
  const dataPathArray = dataPath?.split('.')
  const run = ( promise ) => {
    setIsLoading(true)
    return promise.then( res => {
      let resourceData = res
      dataPathArray?.map( path => {
        resourceData = resourceData[path]
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