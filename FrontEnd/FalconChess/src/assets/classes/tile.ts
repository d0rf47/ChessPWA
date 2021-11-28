import { Board } from "./board";
import { Piece } from "./piece";

export class Tile
{
    location: string;
    occupied: boolean = false;
    element: HTMLDivElement;

    constructor(location: string, occupied: boolean, element: HTMLDivElement)
    {
        this.location = location;
        this.occupied = occupied;
        this.element = element;
    }

    static locateTile(position: string, tiles :Array<Tile>)
    {
        let j = 0;
        let x = 0;
        for (let i = 0; i < 64; i++) 
        {      
            if(tiles[j][x].location === position)
                return {tile:tiles[j][x], index: {row:j, col:x}};
            //counter for array traversal
            x++;    
            if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
                j++;
                x = 0;
            }                  
        }

        return -1;
    }

    static initMove(tile :Event, board: Board)
    {
        // console.log("init move", event.target);
        let tileClicked = <HTMLElement>tile.target
        let targetIndex = 
        {
            row: parseInt(tileClicked.getAttribute('data-index').toString()[0]),
            col: parseInt(tileClicked.getAttribute('data-index').toString().substring(2))
        };
        // console.log(targetIndex);
        
        const currPiece = board.pieceToMove;
        if(!board.validTurn(currPiece))
            return;
        if(Piece.potentialMoves.filter(pm => pm.row === targetIndex.row && pm.col === targetIndex.col).length < 1)
            return;        
        //update positions
        board.updatePositions(tileClicked,currPiece)
        //move the pawn icon from its curr html elem to selected
        tileClicked.appendChild(board.pieceToMoveElement);
        board.isOpponentCheck(currPiece);       
        board.swapCurrentTeam();   
    }
}