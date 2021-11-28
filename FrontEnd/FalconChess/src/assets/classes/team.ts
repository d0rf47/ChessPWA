import { Piece } from "./piece";

export class Team
{
    team = 'light';
    inCheck = false;    
    inCheckMate = false;
    inStaleMate = false;
    pieces = Array<Piece>();

    constructor(){};
}