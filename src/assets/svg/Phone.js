import Svg, {Path, Circle, Rect} from 'react-native-svg';
import React from 'react'
export default function settled({color = 'black', size = 32}) {
  return ( 
    <Svg t="1619692259081" fill={color} class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2150" width={size} height={size}>
      <Path d="M832 896a64 64 0 0 1-64 64H256a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h512a64 64 0 0 1 64 64v768z m-64-192H256v192h512v-192z m-192 64v64H448v-64h128z m192-640H256v512h512V128z" p-id="2151">
      </Path>
    </Svg>
  )
}