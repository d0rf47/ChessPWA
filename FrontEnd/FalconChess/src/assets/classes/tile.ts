import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";

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
    // need to add special case for moving rook
    static initMove(tile :Event, board: Board)
    {
        console.log("init move", tile.target);
        let tileClicked = <HTMLElement>tile.target
        let targetIndex = 
        {
            row: parseInt(tileClicked.getAttribute('data-index').toString()[0]),
            col: parseInt(tileClicked.getAttribute('data-index').toString().substring(2))
        };
        // console.log(targetIndex);
        
        const currPiece = board.pieceToMove;
        const currPieceTile = board.pieceToMoveElement.parentElement;
        if(!board.validTurn(currPiece))
            return;
        if(Piece.potentialMoves.filter(pm => pm.row === targetIndex.row && pm.col === targetIndex.col).length < 1)
            return;       
            
        if( (currPiece.type === PieceType.king || currPiece.type === PieceType.rook) && tileClicked.children[0] 
            && tileClicked.children[0].getAttribute('data-team') === currPiece.team)
        {
            
            let castleIcon = tileClicked.children[0];       
            if(castleIcon !== undefined)
            {
                if( (castleIcon.getAttribute("data-type") === "k" && currPiece.type === PieceType.rook ) ||
                    ( castleIcon.getAttribute("data-type") === "r" && currPiece.type === PieceType.king)
                    )   
                {
                    board.updatePositions(tileClicked,currPiece, true, castleIcon)
                    currPieceTile.appendChild(castleIcon);
                }         
            }
        }else
            board.updatePositions(tileClicked,currPiece, false, null)
        
        
        //move the piece icon from its curr html elem to selected
        tileClicked.appendChild(board.pieceToMoveElement);
        board.isOpponentCheck(currPiece);       
        board.swapCurrentTeam();   
    }
}