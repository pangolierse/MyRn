import React from 'react'
import Svg, {Path, Circle, Rect} from 'react-native-svg';
export default function  ({color = 'black', size = 32}) {
  return ( 
    <Svg t="1619935260754" fill = {color} class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3439" width={ size } height={ size }><Path d="M726.624149 462.055494c0-157.152203-123.57241-284.307208-276.247648-284.307208S174.128853 304.903292 174.128853 462.055494c0 156.705018 123.57241 283.859 276.247648 283.859S726.624149 618.760512 726.624149 462.055494zM864.523869 943.810656 696.178743 770.987542l-1.343601-1.790786c-66.711378 55.965639-151.779845 89.545432-244.459664 89.545432-213.56605 0-386.389164-177.748287-386.389164-396.686694 0-219.386616 172.823114-397.133879 386.389164-397.133879 213.117842 0 386.389164 177.748287 386.389164 397.133879 0 82.829474-25.073048 159.838382-67.159586 223.416396l5.372358 4.476965 168.345126 172.823114c21.490453 22.385846 21.490453 58.651818 0 81.038688C921.385924 965.749318 886.46253 965.749318 864.523869 943.810656z" p-id="3440"></Path></Svg>
  )
}