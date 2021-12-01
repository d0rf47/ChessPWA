import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";
import { Rook } from "./rook";

export class King extends Piece
{
    constructor(team:string, position: string, index: any)
    {        
        super(PieceType.king, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let tile = board.locateTile(piece.position);
        // console.log("king piece: ", piece)
        // console.log("king tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = this.checkCastleMoves(board);
        
        //forward
        if(board.isInBound(row - 1) && board.canMove(row - 1, col, piece))
            potentialMoves.push({row: row - 1, col : col});                   
        //backward
        if(board.isInBound(row + 1) && board.canMove(row + 1, col, piece))
            potentialMoves.push({row: row + 1, col : col});                   
        //left
        if(board.isInBound(col - 1) && board.canMove(row, col - 1, piece))
            potentialMoves.push({row: row, col : col - 1});
        //right
        if(board.isInBound(col + 1) && board.canMove(row, col + 1, piece))
            potentialMoves.push({row: row, col : col + 1});                   
        //front left
        if(board.isInBound(row - 1) && board.isInBound(col - 1) && board.canMove(row - 1, col - 1, piece))
            potentialMoves.push({row: row - 1, col : col - 1});
        //front right
        if(board.isInBound(row - 1) && board.isInBound(col + 1) && board.canMove(row - 1, col + 1, piece))
            potentialMoves.push({row: row - 1, col : col + 1});
        //back left
        if(board.isInBound(row + 1) && board.isInBound(col - 1) && board.canMove(row + 1, col - 1, piece))
            potentialMoves.push({row: row + 1, col : col - 1});
        //back right
        if(board.isInBound(row + 1) && board.isInBound(col + 1) && board.canMove(row + 1, col + 1, piece))
            potentialMoves.push({row: row + 1, col : col + 1});

        
        //last thing in method                
        return potentialMoves; 
    }

    checkCastleMoves(board :Board)
    {
        let rooks = [];
        let potentialMoves = [];        
        if(!this.moved)
        {
            if(this.team === 'light')        
                rooks = board.lightPieces.filter( p => p.type === PieceType.rook );
            else
                rooks = board.darkPieces.filter( p => p.type === PieceType.rook );
        
            rooks.forEach((r :Rook) =>
            {
                if(!r.moved)
                {
                    if(r.index.col > this.index.col)
                    {
                        
                        if(!board.isOccupied(this.index.row, this.index.col + 1) 
                        && !board.isOccupied(this.index.row, this.index.col + 2))
                            potentialMoves.push({row: this.index.row, col: r.index.col});
                    }else
                    {
                        if(!board.isOccupied(this.index.row, this.index.col - 1) 
                        && !board.isOccupied(this.index.row, this.index.col - 2)
                        && !board.isOccupied(this.index.row, this.index.col - 3))
                            potentialMoves.push({row: this.index.row, col: r.index.col});
                    }
                }
            });
        }
        return potentialMoves;        
    }
}