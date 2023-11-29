
import React, {forwardRef} from 'react'
import "../assets/styles.css"


const Square = forwardRef(({color, value, onClick}, ref) => (    
  <button id = {value} color = {color} onClick = {onClick} className="square" ref = {ref}></button>
));

export default Square