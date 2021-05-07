import { useEffect } from "react"

export const nameFromType = (type) => {
  return {}
}

export const paddingSize = (
  top,
  bottom,
  left,
  right,
) => {
  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right,
  }
}
export const marginSize = (
  top,
  bottom,
  left,
  right,
) => {
  return {
    marginTop: top,
    marginBottom: bottom,
    marginLeft: left,
    marginRight: right,
  }
}
export const isVoid = (val) => {
  return (
    val === undefined ||
    val === null ||
    val === "" ||
    (val instanceof Array && cleanArray(val).length === 0)
  )
}
function cleanArray (arr) {
  return arr.filter( item => {
    if(item) return item
  })
}
export const useMount = (fn) => {
  useEffect(
    fn, []
  )
}
export const avatarUrl = (name) => {
  const path = 'http://3q8891y512.zicp.vip/avatar/'
  return path + name
}