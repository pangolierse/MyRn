import React from 'react'
import Svg, {Path, Circle, Rect} from 'react-native-svg';
export default function Back ({color = 'black', size = 32}) {
  return ( 
    <Svg t="1620549738521" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1910" width={size} height={size}>
      <Path d="M512 32C246.4 32 32 249.6 32 512s217.6 480 480 480 480-217.6 480-480S774.4 32 512 32z m268.8 380.8L496 697.6c-25.6 25.6-60.8 25.6-83.2 0L243.2 528c-25.6-25.6-25.6-60.8 0-83.2s60.8-25.6 83.2 0l128 128 240-240c25.6-25.6 60.8-25.6 83.2 0 25.6 19.2 25.6 54.4 3.2 80z" p-id="1911" fill="#52c41a">
      </Path>
    </Svg>
  )
}