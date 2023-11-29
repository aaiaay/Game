import React from 'react'
import "../assets/styles.css"

function Row({val1, val2, val3}) {
    return (
        <div>
            <Square value = {val1}/>
            <Square value = {val2}/>
            <Square value = {val3}/>
        </div>
    )
}

export default Row