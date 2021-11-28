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

        //last thing in method // concat req cause used for queen        
        return potentialMoves;
    }
}