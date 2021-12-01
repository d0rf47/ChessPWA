import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";

export class Knight extends Piece
{
    constructor(team:string, position: string, index: any)
    {
        // console.log("ROOK",team,position,index)
        super(PieceType.knight, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let tile = board.locateTile(piece.position);
        // console.log("knight piece: ", piece)
        // console.log("knight tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];         
        let verTMovement = 2;
        let horzMovment = 1;

        //forward check
        if(row - verTMovement >= 0)
        {
            //left check
            if(col - horzMovment >= 0)
            {                
                if(board.canMove(row - verTMovement, col - horzMovment, piece))                    
                    potentialMoves.push({row: row - verTMovement, col : col - horzMovment});                    
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(board.canMove(row - verTMovement, col + horzMovment, piece))                                
                    potentialMoves.push({row: row - verTMovement, col : col + horzMovment});                    
            }            
        }
        //backward check
        if(row + verTMovement <= 7)
        {
            //left check
            if(col - horzMovment >= 0)
            {
                if(board.canMove(row + verTMovement, col - horzMovment, piece))                    
                    potentialMoves.push({row: row + verTMovement, col : col - horzMovment});                    
            }
            //right check
            if(col + horzMovment <= 7)
            {
                if(board.canMove(row + verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col + horzMovment});                    
            }            
        }
        //swap horz and vert
        verTMovement = 1;
        horzMovment = 2;
        //left check
        if(col - horzMovment >= 0)
        {            
            //back check
            if(row - verTMovement >= 0)
            {                
                if(board.canMove(row - verTMovement, col - horzMovment, piece))                                    
                    potentialMoves.push({row: row - verTMovement, col : col - horzMovment});                    
            }            
            //front check
            if(row + verTMovement <= 7)
            {                
                if(board.canMove(row + verTMovement, col - horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col - horzMovment});                    
            }            
        }
        //right check
        if(col + horzMovment <= 7)
        {
            //back check
            if(row - verTMovement >= 0)
            {
                if(board.canMove(row - verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row - verTMovement, col : col + horzMovment});                    
            }
            //front check
            if(row + verTMovement <= 7)
            {
                if(board.canMove(row + verTMovement, col + horzMovment, piece))                                    
                    potentialMoves.push({row: row + verTMovement, col : col + horzMovment});                    
            }            
        }    
        //last thing in method        
        return potentialMoves;
    }
}