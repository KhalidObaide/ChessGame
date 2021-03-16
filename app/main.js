/*
 * Role : Main Javascript program for chess game
 * Author : Khalid Obaide
 * Version : 1.0.0
*/
/* The main function is the main function :) */
const codeInput = document.querySelector('#code');
function main(){
	drawTable();
    setGame();

    codeInput.addEventListener('keydown', e=>{
        if(e.key == 'Enter'){
            move(codeInput.value);
        }
    });
}
main();
