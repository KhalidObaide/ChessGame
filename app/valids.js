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
        return item.code === player + "R";
    });

    bishops = bishops.map(bishop => {
        bishop.possibles = [];
        rts = [];

        console.log(letters.indexOf(bishop.cell.charAt(0)));
        console.log(bishop.cell.charAt(0));
        for(let char=letters.indexOf(bishop.cell.charAt(0)); char < letters.lenght; char++){
            console.log("in");
            rts.push(letters[char]);
        };
        console.log(rts);




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


