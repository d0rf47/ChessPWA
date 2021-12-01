import { Piece } from "./piece";

export class Team
{
    team = 'light';
    inCheck = false;    
    inCheckMate = false;
    inStaleMate = false;
    pieces = Piece[16];

    constructor(){};
}