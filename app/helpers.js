/*
 * ============================= *
 *  Start filling up the board   *
 * ============================= *
*/

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let board = [];
// Start with white pieces.
board.push(
    {code : "oo", cell : "a1"},
    {code : "oo", cell : "b1"},
    {code : "oo", cell : "c1"},
    {code : "oo", cell : "d1"},
    {code : "oo", cell : "e1"},
    {code : "oo", cell : "f1"},
    {code : "oo", cell : "g1"},
    {code : "oo", cell : "h1"},
);
letters.forEach(letter => {
    board.push({code : "oo", cell : letter + "2"});
});

// Follow by black pieces.
board.push(
    {code : "oo", cell : "a8"},
    {code : "oo", cell : "b8"},
    {code : "oo", cell : "c8"},
    {code : "oo", cell : "d8"},
    {code : "oo", cell : "e8"},
    {code : "oo", cell : "f8"},
    {code : "oo", cell : "g8"},
    {code : "oo", cell : "h8"},
);
letters.forEach(letter => {
    board.push({code : "oo", cell : letter + "7"});
});

// Finally empty spaces.
letters.forEach(letter => {
    board.push({code : "oo", cell : letter + "3"});
    board.push({code : "oo", cell : letter + "4"});
    board.push({code : "oo", cell : letter + "5"});
    board.push({code : "oo", cell : letter + "6"});
});

placeItem = board.find(cell => {
    return cell.cell == "d4";
});
placeItem.code = "wR";

placeItem = board.find(cell => {
    return cell.cell == "g7";
});
placeItem.code = "wR";

placeItem = board.find(cell => {
    return cell.cell == "e3";
});
placeItem.code = "wB";

placeItem = board.find(cell => {
    return cell.cell == "b4";
});
placeItem.code = "bR";
/*
 * ============================= *
 * Finish filling up the board   *
 * ============================= *
*/

let whiteTurn = true;

/*
 * ================= *
 * Helper Functions  *
 * ================= *
*/

// Used to draw the table at the first step of the program.
function drawTable(){
	const container = document.querySelector('.container');
	let isBlack = true;
	for(let i=0; i<64; i++){
		isBlack = !isBlack;
		isBlack = ([0,8,16,24,32,40,48,56,64].includes(i)) ? !isBlack : isBlack;

		let el = document.createElement('span');
		el.className = (isBlack) ? 'black' : '';
		el.id = "c" + i.toString();
		container.appendChild(el);
	}
}

// getCell function takes a cellText arguments with the type of String like 'c3' and it returns the element for it.
function getCell(cellText){
    const cellsArray = [
        'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
        'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
        'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
        'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
        'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
    ];
    const foundCell = cellsArray.find(cell =>{
        return cell === cellText;
    });
    return document.querySelector('#c' + cellsArray.indexOf(foundCell));
}

// Place image, is used to simply place an image inside a cell
function placeImage(cell, image){
    cell = getCell(cell);
    const staticFiles = './assets/ps';
    cell.style.backgroundImage = `url(${staticFiles}/${image})`;
    cell.style.backgroundSize = '80%';
    cell.style.backgroundPosition = 'center';
    cell.style.backgroundRepeat = 'no-repeat';
}

// setPieces is setting up the board for the first time.
function setGame(){
    board.forEach(item => {
        if(item.code == 'wR'){
            placeImage(item.cell, 'white_rook.svg');
        }else if(item.code == 'bR'){
            placeImage(item.cell, 'black_rook.svg');
        }else if(item.code == 'wP'){
            placeImage(item.cell, 'white_pawn.svg');
        }else if(item.code == 'bP'){
            placeImage(item.cell, 'black_pawn.svg');
        }else if(item.code == 'wN'){
            placeImage(item.cell, 'white_knight.svg');
        }else if(item.code == 'bN'){
            placeImage(item.cell, 'black_knight.svg');
        }else if(item.code == 'wB'){
            placeImage(item.cell, 'white_bishop.svg');
        }else if(item.code == 'bB'){
            placeImage(item.cell, 'black_bishop.svg');
        }else if(item.code == 'wK'){
            placeImage(item.cell, 'white_king.svg');
        }else if(item.code == 'bK'){
            placeImage(item.cell, 'black_king.svg');
        }else if(item.code == 'wQ'){
            placeImage(item.cell, 'white_queen.svg');
        }else if(item.code == 'bQ'){
            placeImage(item.cell, 'black_queen.svg');
        }
    });
}

// changeImage function is as same as placeImage but instead it takes a piec and move it to target position.
function changeImage(from, to){
    from=getCell(from); to=getCell(to);
    to.style.backgroundImage = from.style.backgroundImage;
    from.style.backgroundImage = 'none';
    to.style.backgroundSize = "80%";
    to.style.backgroundRepeat = "no-repeat";
    to.style.backgroundPosition = "center";
}

// Check if the target is in the possible moves
function checkTarget(pies, cell, spe, player, pCode){
    // pies means the pieces, for example : Rooks, or bishops, or ...
    // check if the target is in the possible moves
    pies.forEach(pie =>{
        pie.isAble = pie.possibles.some(pos => {
            return pos.cell === cell;
        });
    });

    pies = pies.filter(pie => {
        return pie.isAble == true;
    });

    // Going to submit the results
    if(pies.length < 1){
        return false;
    }else if(pies.length > 1){
        if(spe == undefined){
            return false;
        }
        if(letters.includes(spe)){
            // Means we are in the ranks
            pies = pies.filter(pie => {
                return pie.cell.charAt(0) === spe;
            });
        }else{
            // And now on the files
            pies = pies.filter(pie => {
                return pie.cell.charAt(1) === spe;
            });
        }
        if(pies.length > 1){
            return false;
        }

        changeImage(pies[0].cell, cell);
        itemInBoard = board.find(item => {
            return item == pies[0];
        });
        itemInBoard.code = 'oo';
        targetInBoard = board.find(item => {
            return item.cell == cell;
        });
        targetInBoard.code = player + pCode;
        return true;
    }else{
        changeImage(pies[0].cell, cell);
        itemInBoard = board.find(item => {
            return item == pies[0];
        });
        itemInBoard.code = 'oo';
        targetInBoard = board.find(item => {
            return item.cell == cell;
        });
        targetInBoard.code = player + pCode;
        return true;
    }
}

// The main function and the most important function for moving pieces.
function move(code){
    // removing the x if there is any
    chars = "";
    for(let i=0; i<code.length; i++){
        if(code.charAt(i) != 'x'){
            chars += code.charAt(i);
        }
    }
    code = chars;

    // First layer of checking.
    const isSpe = ['1', '2', '3', '4', '5', '6', '7', '8', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].includes(code.charAt(0));
    const validChar = (isSpe)
        ? ['R', 'N', 'B', 'Q', 'K', 'P'].includes(code.charAt(1))
        : ['R', 'N', 'B', 'Q', 'K', 'P'].includes(code.charAt(0));

    if(!validChar){
        alert("Illegal Move");
        return;
    }
    let isLegal = false;

    // Rook Move
    if((isSpe && code.charAt(1) == 'R') || (!isSpe && code.charAt(0) == 'R') ){
        isLegal = RookValid(
            (isSpe) ? code.substr(2) : code.substr(1),
            (whiteTurn) ? 'w':'b',
            (isSpe) ? code.charAt(0) : undefined
        );

    }

    // Bishop Move
    if((isSpe && code.charAt(1) == 'B') || (!isSpe && code.charAt(0) == 'B') ){
        isLegal = BishopValid(
            (isSpe) ? code.substr(2) : code.substr(1),
            (whiteTurn) ? 'w':'b',
            (isSpe) ? code.charAt(0) : undefined
        );

    }

    if(!isLegal){
        alert("Illegal Move");
        return;
    }else{
        whiteTurn = !whiteTurn;
    }

}

/*
 * =========================== *
 * End of Helper Functions     *
 * =========================== *
*/
