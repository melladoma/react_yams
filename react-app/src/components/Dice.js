import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'reactstrap'

export default function Dice(props) {

    let iconDice = "";
    switch (props.diceNumber) {
        case 1:
            iconDice = faDiceOne
            break;
        case 2:
            iconDice = faDiceTwo
            break;
        case 3:
            iconDice = faDiceThree
            break;
        case 4:
            iconDice = faDiceFour
            break;
        case 5:
            iconDice = faDiceFive
            break;
        case 6:
            iconDice = faDiceSix
            break;
    }
    // console.log(typeof iconDice)
    // fonctionne car iconDice est un objet

    function clickDice() {
        props.clickDiceParent(props.index)
    }

    let styleIcon = {}
    if (props.isSelected) {
        styleIcon = {
            color: '#C06C84',
            opacity: "0.8"
        }
    }

    return (
        <div>
            <div className="mx-3 my-1" >
                <FontAwesomeIcon icon={iconDice} size="5x" style={styleIcon} onClick={() => clickDice()} />
                <Badge color="secondary" className="d-block">{props.diceCount}</Badge>
            </div>
        </div>
    );
}