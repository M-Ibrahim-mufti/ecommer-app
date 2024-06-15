import React from "react"
import Adidas from '../../../Assets/Adidas.svg'
import Nike from '../../../Assets/Nike.svg' 
import Puma from '../../../Assets/puma.svg'
import Fila from '../../../Assets/fila.svg'
import Reebok from '../../../Assets/reebok.svg'

const EmblemSections = () => {
    return(
        <div className="container max-w-6xl mx-auto">
            <div className="flex flex-row items-center justify-between">
                <img className="w-32 h-32   " src={Adidas} />
                <img className="w-32 h-32" src={Nike}></img>
                <img className="w-32 h-32" src={Puma}></img>
                <img className="w-32 h-32" src={Fila}></img>
                <img className="w-32 h-32" src={Reebok}></img>
            </div>
        </div>
    )
}

export default EmblemSections