import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";

export class Bishop extends Piece
{
    constructor(team:string, position: string, index: any)
    {
        // console.log("ROOK",team,position,index)
        super(PieceType.bishop, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let tile = board.locateTile(piece.position);
        // console.log("bishop piece: ", piece)
        // console.log("bishop tile", tile);
        const row = tile.index.row;
        const col = tile.index.col;
        let potentialMoves = [];         

        //forwards left check
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0 && col - i >= 0)
            {                
                if(board.isOccupied(row - i, col - i) && board.tiles[row - i][col - i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row - i, col - i, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col - i});
                    if(board.isOccupied(row - i,col - i))
                        break;
                }                 
            }else
                break;      
        }
        //forward right
        for(let i = 1; i <= 8; i++)
        {
            if(row - i >= 0 && col + i <= 7)
            {                
                if(board.isOccupied(row - i, col + i) && board.tiles[row - i][col + i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row - i, col + i, piece))
                {                    
                    potentialMoves.push({row: row - i, col : col + i});
                    if(board.isOccupied(row - i,col + i))
                        break;
                }                 
            }else
                break;            
        }
        // backwards left
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7 && col - i >=0)
            {                
                if(board.isOccupied(row + i, col - i) && board.tiles[row + i][col - i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row + i, col - i, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col - i});
                    if(board.isOccupied(row + i,col - i))
                        break;
                }                 
            }else
                break;                            
        }

        //backwards right
        for(let i = 1; i <= 8; i++)
        {
            if(row + i <= 7 && col + i <= 7)
            {                
                if(board.isOccupied(row + i, col + i) && board.tiles[row + i][col + i].element.children[0].getAttribute('data-team') === piece.team)
                    break;
                                
                if(board.canMove(row + i, col + i, piece))
                {                    
                    potentialMoves.push({row: row + i, col : col + i});
                    if(board.isOccupied(row + i,col + i))
                        break;
                }                 
            }else
                break;
        }
        //last thing in method        
        return potentialMoves;
    }
}