/* this file is used to store all the pieces valid moves */

function colorize(poses){
    poses.forEach(pos => getCell(pos.cell).style.backgroundColor = "lightgreen");
}

/*
 * ======================== *
 * valid moves goes here    *
 * ======================== *
*/
function RookValid(cell, player, spe = undefined){
    const opp = (player == 'w') ? 'b' : 'w'; // opp stands for opposite

    // Get the possible moves
    let rooks = board.filter(item => {
        return item.code === player + "R";
    });

    rooks = rooks.map(rook => {
        rook.possibles = [];

        // Getting the rank upper cells
        for(let i=parseInt(rook.cell.charAt(1))+1; i<9; i++){
            currentCell = rook.cell.charAt(0) + i.toString();
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the rook
            if(newCell.code.charAt(0) == player){
                break;
            }
            rook.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == 'b'){
                break;
            }
        }

        for(let i=parseInt(rook.cell.charAt(1))-1; i>0; i--){
            currentCell = rook.cell.charAt(0) + i.toString();
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the rook
            if(newCell.code.charAt(0) == player){
                break;
            }
            rook.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == 'b'){
                break;
            }
        }

        for(let i=letters.indexOf(cell.charAt(0)) + 1; i<9; i++){
            currentCell = letters[i-1] + rook.cell.charAt(1);
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the rook
            if(newCell.code.charAt(0) == player){
                break;
            }
            rook.possibles.push(newCell);
            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        for(let i=letters.indexOf(cell.charAt(0)); i>0; i--){
            currentCell = letters[i-1] + rook.cell.charAt(1);
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the rook
            if(newCell.code.charAt(0) == player){
                break;
            }
            rook.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == 'b'){
                break;
            }
        }
        return rook;
    });

    return checkTarget(rooks, cell, spe, player, 'R');
}

/* ========================
 *  Bishop Valid Moves
 *  ======================
 */

function BishopValid(cell, player, spe = undefined){
    const opp = (player == 'w') ? 'b' : 'w'; // opp stands for opposite

    // Get the possible moves
    let bishops = board.filter(item => {
        return item.code === player + "B";
    });

    bishops = bishops.map(bishop => {
        bishop.possibles = [];
        let cellCodes = [];
        const currentFile = letters.indexOf(bishop.cell.charAt(0));
        const currentRank = parseInt(bishop.cell.charAt(1));
        let rank;

        // Get the rts
        rank = currentRank;
        for(let i=currentFile+1; i<letters.length; i++){
            rank++;
            if (rank > 8){
                break;
            }
            let cellCode = board.find(item=>{
                return item.cell === letters[i] + rank;
            });
            if(cellCode.code.charAt(0) == player){
                break;
            }
            cellCodes.push(cellCode);
            if(cellCode.code.charAt(0) == opp){
                break;
            }
        }

        // Get the rbs
        rank = currentRank;
        for(let i=currentFile+1; i<letters.length; i++){
            rank--;
            if (rank < 1){
                break;
            }
            let cellCode = board.find(item=>{
                return item.cell === letters[i] + rank;
            });
            if(cellCode.code.charAt(0) == player){
                break;
            }
            cellCodes.push(cellCode);
            if(cellCode.code.charAt(0) == opp){
                break;
            }
        }

        // Get the lts
        rank = currentRank;
        for(let i=currentFile-1; i>-1; i--){
            rank++;
            if (rank > 8){
                break;
            }
            let cellCode = board.find(item=>{
                return item.cell === letters[i] + rank;
            });
            if(cellCode.code.charAt(0) == player){
                break;
            }
            cellCodes.push(cellCode);
            if(cellCode.code.charAt(0) == opp){
                break;
            }
        }

        // Get the lbs
        rank = currentRank;
        for(let i=currentFile-1; i>-1; i--){
            rank--;
            if (rank < 1){
                break;
            }
            let cellCode = board.find(item=>{
                return item.cell === letters[i] + rank;
            });

            if(cellCode.code.charAt(0) == player){
                break;
            }
            cellCodes.push(cellCode);
            if(cellCode.code.charAt(0) == opp){
                break;
            }
        }
        bishop.possibles = cellCodes;
        return bishop;
    });
    console.log(bishops);
    return checkTarget(bishops, cell, spe, player, 'B');
}

