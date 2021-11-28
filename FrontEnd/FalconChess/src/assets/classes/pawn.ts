import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";

export class Pawn extends Piece
{
    constructor(team:string, position: string, index: any)
    {
        // console.log("PAWN",team,position,index)
        super(PieceType.pawn, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let tile = board.locateTile(piece.position);
        // console.log("pawn piece: ", piece)
        // console.log("pawn tile", tile);
        const row = tile?.index.row;
        const col = tile?.index.col;
        let potentialMoves = [];
        let verTMovement = 1;
        //check for direction of mvmt
        if(piece.team === 'light')
            verTMovement = -1;            
        
        //special case for first moves 
        if(!board.tiles[row + verTMovement][col].occupied )
        {            
            if(!piece.moved && !board.tiles[row + verTMovement + verTMovement][col].occupied || 
                (!piece.moved && board.tiles[row + verTMovement + verTMovement][col].occupied &&
                board.tiles[row + verTMovement + verTMovement][col].element.children[0].getAttribute('data-team') !== piece.team))       
                potentialMoves.push({row: row + verTMovement + verTMovement, col: col});            

            potentialMoves.push({row: row + verTMovement, col: col});
        }            

        if(col - 1 >= 0 && row + verTMovement < 8 && row + verTMovement >= 0)
        {            
            if(board.canMove(row + verTMovement, col - 1, piece) && board.isOccupied(row + verTMovement, col - 1))
                potentialMoves.push({row: row + verTMovement, col : col - 1});            
        };       

        if(col + 1 < 8 && row + verTMovement < 8 && row + verTMovement >= 0)
        {
            if(board.canMove(row + verTMovement, col + 1, piece ) && board.isOccupied(row + verTMovement, col + 1))                        
                potentialMoves.push({row: row + verTMovement, col : col + 1});            
        };
        
        return potentialMoves;
    }
}