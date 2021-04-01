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
            if(newCell.code.charAt(0) == opp){
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
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        for(let i=letters.indexOf(rook.cell.charAt(0)) + 1; i<8; i++){
            currentCell = letters[i] + rook.cell.charAt(1);
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

        for(let i=letters.indexOf(rook.cell.charAt(0)); i>0; i--){

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
    return checkTarget(bishops, cell, spe, player, 'B');
}

/***************************
 * Knight Movement
 * *************************/

function KnightValid(cell, player, spe = undefined){
    const opp = (player == 'w') ? 'b' : 'w'; // opp stands for opposite

    // Get the possible moves
    let knights = board.filter(item => {
        return item.code === player + "N";
    });

    knights = knights.map(knight => {
        knight.possibles = [];
        const f = letters.indexOf(knight.cell.charAt(0));
        const r = parseInt(knight.cell.charAt(1));

        cellCodes = [
            letters[f+1] + (r+2).toString(), // m1
            letters[f+1] + (r-2).toString(), // m2
            letters[f-1] + (r+2).toString(), // m3
            letters[f-1] + (r-2).toString(), // m4
            letters[f-2] + (r+1).toString(), // m5
            letters[f-2] + (r-1).toString(), // m6
            letters[f+2] + (r+1).toString(), // m6
            letters[f+2] + (r-1).toString(), // m6
        ];


        // Check if the cell is not founded
        // And check if there is a friend
        cellCodes.forEach(item =>{
            rankCheck = parseInt(item.charAt(1)) < 9
                        && parseInt(item.charAt(1)) > 0

            // item.length > 2 happens when the letter is not founded -> undefined3
            if(!(item.length > 2) &&  rankCheck){
                const fr = board.find(ce =>{
                    return ce.cell == item;
                });
                if(!(fr.code.charAt(0) == player)){
                    knight.possibles.push(item);
                }
            }
        });


        // Converting the codes into cells
        knight.possibles = knight.possibles.map(item => {
            item = board.find(ce => {
                return ce.cell === item;
            });
            return item
        });
        return knight;

    });
    return checkTarget(knights, cell, spe, player, 'N');
}

/* **********************
 * The Queen Movement
 * *********************/

function QueenValid(cell, player, spe = undefined){
    const opp = (player == 'w') ? 'b' : 'w'; // opp stands for opposite

    // Get the possible moves
    let queens = board.filter(item => {
        return item.code === player + "Q";
    });

    queens = queens.map(queen => {
        queen.possibles = [];

        // Getting the rank upper cells
        for(let i=parseInt(queen.cell.charAt(1))+1; i<9; i++){
            currentCell = queen.cell.charAt(0) + i.toString();
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the queen
            if(newCell.code.charAt(0) == player){
                break;
            }
            queen.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        for(let i=parseInt(queen.cell.charAt(1))-1; i>0; i--){
            currentCell = queen.cell.charAt(0) + i.toString();
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the queen
            if(newCell.code.charAt(0) == player){
                break;
            }
            queen.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        for(let i=letters.indexOf(queen.cell.charAt(0)) + 1; i<8; i++){
            currentCell = letters[i] + queen.cell.charAt(1);
            newCell = board.find(item => {
                return item.cell === currentCell;
            });
            // If Our Own piece blocks the queen
            if(newCell.code.charAt(0) == player){
                break;
            }
            queen.possibles.push(newCell);
            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        for(let i=letters.indexOf(queen.cell.charAt(0)); i>0; i--){

            currentCell = letters[i-1] + queen.cell.charAt(1);
            newCell = board.find(item => {
                return item.cell === currentCell;
            });

            // If Our Own piece blocks the queen
            if(newCell.code.charAt(0) == player){
                break;
            }
            queen.possibles.push(newCell);

            // If The enemy piece blocks the way out.
            if(newCell.code.charAt(0) == opp){
                break;
            }
        }

        // Going diagnols
        let cellCodes = [];
        const currentFile = letters.indexOf(queen.cell.charAt(0));
        const currentRank = parseInt(queen.cell.charAt(1));
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

        cellCodes.forEach(cellCode =>{
            queen.possibles.push(cellCode);
        });

        return queen;
    });

    return checkTarget(queens, cell, spe, player, 'Q');
}
