import { Bishop } from "./bishop";
import { Board } from "./board";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";
import { Rook } from "./rook";

export class Queen extends Piece
{
    constructor(team:string, position: string, index: any)
    {
        // console.log("ROOK",team,position,index)
        super(PieceType.queen, position, team, index);
    }

    
    override checkMoves(board :Board, piece :Piece)
    {
        let temp = new Bishop("", "", "");
        let potentialMoves = temp.checkMoves(board, piece);   
        temp = new Rook("", "", "");
        return potentialMoves.concat(temp.checkMoves(board, piece));  
    }
}