import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";

export class Rook extends Piece
{
    constructor(team:string, position: string, index: any)
    {
        // console.log("ROOK",team,position,index)
        super(PieceType.rook, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let potentialMoves = this.checkStandardMoves(board,piece);             
        potentialMoves = potentialMoves.concat(this.checkCastleMoves(board));
        return potentialMoves;
    }

    checkStandardMoves(board :Board, piece :Piece)
    {
        let tile = board.locateTile(piece.position);
        // console.log("rook piece: ", piece)
        // console.log("rook tile", tile);
        const row = tile?.index.row;
        const col = tile?.index.col;
        let potentialMoves = [];         

        //forwards check
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0)
            {                
                if(board.isOccupied(row - i,col) && board.tiles[row - i][col].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row - i, col, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col});
                    if(board.isOccupied(row - i,col))
                        break;
                }                 
            }else
                break;            
        }
        //backward check
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7)
            {                
                if(board.isOccupied(row + i,col) && board.tiles[row + i][col].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row + i, col, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col});
                    if(board.isOccupied(row + i,col))
                        break;
                }                 
            }else
                break;            
        }
        //left
        for(let i = 1; i <= 8; i++)
        {
            if(col - i >= 0)
            {                
                if(board.isOccupied(row, col - i) && board.tiles[row][col - i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row, col - i, piece))
                {                    
                    potentialMoves.push({row: row, col : col - i});
                    if(board.isOccupied(row,col - i))
                        break;
                }                 
            }else
                break;            
        }
        //right
        for(let i = 1; i <= 8; i++)
        {
            if(col + i <= 7)
            {                
                if(board.isOccupied(row,col + i) && board.tiles[row][col + i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row, col + i, piece))
                {                    
                    potentialMoves.push({row: row, col : col + i});
                    if(board.isOccupied(row,col + i))
                        break;
                }                 
            }else
                break;            
        }

        //last thing in method     
        return potentialMoves;
    }

    checkCastleMoves(board :Board)
    {
        let king = board.lightPieces.filter( p => p.type === PieceType.king )[0];
        
        let potentialMoves = [];        
        if(!this.moved)
        {            
            if(this.team === 'dark')
                king = board.darkPieces.filter( p => p.type === PieceType.king )[0];
            console.log(king);                
            if(!king.moved)
            {
                if(king.index.col > this.index.col)
                {
                    if(!board.isOccupied(this.index.row, this.index.col + 1) 
                    && !board.isOccupied(this.index.row, this.index.col + 2)
                    && !board.isOccupied(this.index.row, this.index.col + 3))
                        potentialMoves.push({row: this.index.row, col: king.index.col});
                }else
                {
                    if(!board.isOccupied(this.index.row, this.index.col - 1) 
                    && !board.isOccupied(this.index.row, this.index.col - 2))                  
                        potentialMoves.push({row: this.index.row, col: king.index.col});
                }
            }            
        }
        console.log(potentialMoves);
        return potentialMoves;        
    }
}