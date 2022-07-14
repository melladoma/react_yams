import React from 'react';

export default function Score(props) {

    var clickCase = (indexPlayer) => {
        props.calcScoreParent(indexPlayer, props.name)
    }

    let classRow = "border"
    if (props.name.includes("TOTAL") || props.name.includes("Joueurs")) {
        classRow = "border bg-secondary opacity-75 text-white"
    }

    let playerGrid = []
    for (let i = 0; i < props.players.length; i++) {
        if (props.name === "Joueurs") {
            playerGrid.push(<div className={classRow} style={{ width: "8em", height: "1.5em" }}>{props.players[i].player}</div>)
        } else {
            playerGrid.push(<div className="border opacity-75" onClick={() => clickCase(i)} style={{ width: "8em", height: "1.5em" }}>{props.players[i].score[props.index]}</div>)
        }
    }

    return (
        <div className='d-flex'>
            <div className={classRow} style={{ width: "8em", height: "1.5em" }}>{props.name}</div>
            {playerGrid}
        </div>

    )

}