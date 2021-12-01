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
        let rook = new Rook("", "", "");
        let potentialMoves = rook.checkStandardMoves(board, piece);   
        let bishop = new Bishop("", "", "");
        return potentialMoves.concat(bishop.checkMoves(board, piece));  
    }
}