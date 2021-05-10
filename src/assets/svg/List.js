import React from 'react'
import Svg, {Path, Circle, Rect} from 'react-native-svg';
export default function Back ({color = 'black', size = 32}) {
  return ( 
    <Svg fill={color} fill-opacity=".65"  t="1620612773131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6013" width={size} height={size}><Path d="M832 544a64 64 0 0 1 64 64v224a64 64 0 0 1-64 64h-224a64 64 0 0 1-64-64v-224a64 64 0 0 1 64-64h224z m-416 0a64 64 0 0 1 64 64v224a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64v-224a64 64 0 0 1 64-64h224z m416 64h-224v224h224v-224z m-416 0H192v224h224v-224z m0-480a64 64 0 0 1 64 64v224a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h224z m416 0a64 64 0 0 1 64 64v224a64 64 0 0 1-64 64h-224a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h224zM416 192H192v224h224V192z m416 0h-224v224h224V192z"p-id="6014"></Path></Svg>
  )
}