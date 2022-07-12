import React, { useState } from 'react';

export default function Score(props) {

    var clickCase = (indexPlayer) => {
        props.calcScoreParent(indexPlayer, props.name)
    }

    let playerGrid = []
    for (let i = 0; i < props.players.length; i++) {
        if (props.name === "Joueurs") {
            playerGrid.push(<div className="border" style={{ width: "8em", height: "30px" }}>{props.players[i].player}</div>)
        } else {
            playerGrid.push(<div className="border" onClick={() => clickCase(i)} style={{ width: "8em", height: "30px" }}>{props.players[i].score[props.index]}</div>)
        }
    }

    return (
        <div className='d-flex'>
            <div className="border" style={{ width: "8em", height: "30px" }}>{props.name}</div>
            {playerGrid}
        </div>

    )

}