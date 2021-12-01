import { Bishop } from "./bishop";
import { King } from "./king";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Piece } from "./piece";
import { PieceType } from "./pieceTypeEnum";
import { Queen } from "./queen";
import { Rook } from "./rook";
import { Team } from "./team";
import { Tile } from "./tile";

export class Board
{
    tiles :Tile[][];
    lightPieces :Piece[];
    darkPieces  :Piece[];
    currentTeam = new Team();
    lastPiece = new Piece(PieceType.pawn,"","","");
    pieceToMove :Piece;
    pieceToMoveElement :HTMLElement;

    constructor()
    {        
        this.lightPieces = [];
        this.darkPieces = [];
        this.tiles = [...Array(8)].map(x=>Array(8).fill(undefined));        
    }

    initBoard() :void
    {
        let tiles = document.getElementsByClassName("tile");
        let j = 0;
        let x = 0;    
        for (let i = 0; i < 64; i++) 
        {          
            tiles[i].setAttribute('data-index', `${j},${x}`);
            //chance to =  new tile(...)
            this.tiles[j][x] = new Tile(tiles[i].getAttribute("id")?.toString() ?? "", false, <HTMLDivElement>tiles[i])                  
            //counter for array traversal
            x++;    
            if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
                j++;
                x = 0;
            }
        }
        console.log(this.tiles);
    }

    initLightPieces() :void
    {
        console.log("init pieces")
        //place pawns first
        let ascii = 97;
        for(let i = 1; i <= 8; i++) 
        {
            let pos = 2 + String.fromCharCode(ascii);
            let piece = new Pawn("light", pos, {row: 6, col: i -1});
            this.lightPieces.push(piece);
            this.tiles[1][i-1].occupied = true;
            ascii++;
        }
        this.lightPieces.push(new Piece(PieceType.rook, "1a" ,"light" , {row: 7, col: 0}));
        this.tiles[0][0].occupied = true;
        this.lightPieces.push(new Piece(PieceType.rook, "1h" ,"light" , {row: 7, col: 7}));
        this.tiles[0][7].occupied = true;
        this.lightPieces.push(new Piece(PieceType.knight, "1b" ,"light" , {row: 7, col: 1}));
        this.tiles[0][1].occupied = true;
        this.lightPieces.push(new Piece(PieceType.knight, "1g" ,"light" , {row: 7, col: 6}));
        this.tiles[0][6].occupied = true;
        this.lightPieces.push(new Piece(PieceType.bishop, "1c" ,"light" , {row: 7, col: 2}));
        this.tiles[0][2].occupied = true;
        this.lightPieces.push(new Piece(PieceType.bishop, "1f" ,"light" , {row: 7, col: 5}));
        this.tiles[0][5].occupied = true;
        this.lightPieces.push(new Piece(PieceType.queen, "1d" ,"light" , {row: 7, col: 3}));
        this.tiles[0][3].occupied = true;
        this.lightPieces.push(new Piece(PieceType.king, "1e" ,"light" , {row: 7, col: 4}));     
        this.tiles[0][4].occupied = true;

        this.currentTeam.pieces = this.lightPieces;
    }

    initdarkPieces()
    {
        //place pawns first
        let ascii = 97;
        for(let i = 1; i <= 8; i++) 
        {
            let pos = 7 + String.fromCharCode(ascii);
            let piece = new Piece(PieceType.pawn, pos, "dark", {row: 1, col: i -1});
            this.darkPieces.push(piece);
            this.tiles[6][i-1].occupied = true;
            ascii++;
        }
        this.darkPieces.push(new Piece(PieceType.rook, "8a" ,"dark", {row: 0, col: 0} ));
        this.tiles[7][0].occupied = true;
        this.darkPieces.push(new Piece(PieceType.rook, "8h" ,"dark", {row: 0, col: 7} ));
        this.tiles[7][7].occupied = true;
        this.darkPieces.push(new Piece(PieceType.knight, "8b" ,"dark", {row: 0, col: 1} ));
        this.tiles[7][1].occupied = true;
        this.darkPieces.push(new Piece(PieceType.knight, "8g" ,"dark", {row: 0, col: 6} ));
        this.tiles[7][6].occupied = true;
        this.darkPieces.push(new Piece(PieceType.bishop, "8c" ,"dark", {row: 0, col: 2} ));
        this.tiles[7][2].occupied = true;
        this.darkPieces.push(new Piece(PieceType.bishop, "8f" ,"dark", {row: 0, col: 5} ));
        this.tiles[7][5].occupied = true;
        this.darkPieces.push(new Piece(PieceType.queen, "8d" ,"dark", {row: 0, col: 3} ));
        this.tiles[7][3].occupied = true;
        this.darkPieces.push(new Piece(PieceType.king, "8e" ,"dark", {row: 0, col: 4} ));     
        this.tiles[7][4].occupied = true;
    }

    locateTile(position :Object)
    {
        let j = 0;
        let x = 0;
        for (let i = 0; i < 64; i++) 
        {      
            if(this.tiles[j][x].location === position)
                return {tile:this.tiles[j][x], index: {row:j, col:x}};
            //counter for array traversal
            x++;    
            if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) 
            {
                j++;
                x = 0;
            }                  
        }   
        return null;
    }

    isOccupied(row: number,col :number)
    {        
        return this.tiles[row][col].occupied;
    };

    canMove(row :number, col :number, piece :Piece)
    {
        if(!this.isOccupied(row,col) || (this.isOccupied(row,col) && 
            this.tiles[row][col].element.children[0].getAttribute('data-team') !== piece.team))
            return true;
        return false;
    };

    validTurn(currPiece :Piece)
    {
        // console.log(currPiece, this.currentTeam)
        return this.currentTeam.team === currPiece.team;
    }

    updatePositions(targetElement, piece, castleMove, castleIcon)
    {

        //add method to check all peiece per team
        //will need check for king stalemate

        //move board check to own method
        console.log('updating pos');
        console.log(targetElement, piece);
        let j = 0;
        let x = 0;    
        for (let i = 0; i < 64; i++) 
        {      
            if(this.tiles[j][x].location === piece.position && !castleMove)
            {
                this.tiles[j][x].occupied = false;
            }
            if(this.tiles[j][x].location === targetElement.id)
            {
                this.tiles[j][x].occupied = true;
                if(targetElement.firstChild && !castleMove)
                {                    
                    let pieceToRemove = JSON.parse(window.atob(targetElement.firstChild.getAttribute('data-object')));
                    console.log("peice to REMOVE",pieceToRemove);
                    targetElement.removeChild(targetElement.childNodes[0]);                                        
                }
            }                                    
            //counter for array traversal
            x++;    
            if(i === 7 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55 ) {
                j++;
                x = 0;
            }                  
        }        
        //need to update pieces [] casues issue with checking for Check
        if(castleMove)
        {
            let castlePiece = JSON.parse(window.atob(castleIcon.getAttribute('data-object')));
            console.log(this.currentTeam);
            for(let p of this.currentTeam.pieces)
            {
                if(p.index === castlePiece.index)
                {
                    p.index = piece.index;
                    p.moved = true;
                    p.position = piece.position
                }
            }
            castlePiece.moved = true;
            castlePiece.index = piece.index;
            castlePiece.position = piece.position;
            castleIcon.setAttribute("data-object", window.btoa(JSON.stringify(castlePiece)));
        }
        for(let p of this.currentTeam.pieces)
        {
            if(p.index === piece.index)
            {
                p.index = piece.index;
                p.moved = true;
                p.position = piece.position
            }
        }
        piece.moved = true;
        const dataIndex = targetElement.getAttribute('data-index');
        piece.index = {row : parseInt(dataIndex[0]), col : parseInt(dataIndex[2]) };
        piece.position = targetElement.id;
        this.pieceToMoveElement.setAttribute("data-object", window.btoa(JSON.stringify(piece)));
        this.lastPiece = piece;            

        if(this.currentTeam.inCheck)
        {
            this.removeCheck();
        }
    }

    inCurrCheck()
    {        
        //need to used last piece position to predict possible moves, only moves that block 
        // last pieces potential moves where index has a king can be a valid move, 
        //king can only move to a spot that is not in the possible moves of the last piece
        let stillInCheck = false;
        let currKing = this.lightPieces.filter((p) => p.type === PieceType.king)[0];                           
        if(this.currentTeam.team === 'dark')
        {
            currKing = this.darkPieces.filter((p) => p.type === PieceType.king)[0];      
            this.lightPieces.forEach((p)=>
            {
                let potentialMoves = Piece.checkPotentialMoves(this,p);
                for(let pm of potentialMoves)
                {
                    if(pm.row === currKing.index.row && pm.col === currKing.index.col)
                    {
                        this.currentTeam.inCheck = true;
                        break;
                    }                    
                };
            })
        }else
        {            
            this.darkPieces.forEach((p)=>
            {
                let potentialMoves = Piece.checkPotentialMoves(this,p);
                for(let pm of potentialMoves)
                {
                    if(pm.row === currKing.index.row && pm.col === currKing.index.col)
                    {
                        this.currentTeam.inCheck = true;
                        break;
                    }                    
                };
            });
        }             
        
    }    

    isOpponentCheck(currPiece :Piece)
    {
        let potentialMoves = Piece.checkPotentialMoves(this,currPiece);
        let opposingKing = this.lightPieces.filter((p) => p.type === PieceType.king)[0];
        if(currPiece.team === 'light')            
            opposingKing = this.darkPieces.filter((p) => p.type === PieceType.king)[0];
        
        // console.log(this.potentialMoves);
        console.log('opposing king', opposingKing);
        potentialMoves.forEach((pm) =>
        {
            if(pm.row === opposingKing.index.row && pm.col === opposingKing.index.col)
                this.currentTeam.inCheck = true;
        })

        if(this.currentTeam.inCheck)
            opposingKing.icon.classList.add('check', 'checkPulse');
    }

    removeCheck()
    {
        const currKing = this.currentTeam.pieces.filter((p) => p.type === PieceType.king)[0];
        currKing.icon.classList.remove('check', 'checkPulse');
        this.currentTeam.inCheck = false;
    }

    swapCurrentTeam()
    {
        // this.inCurrCheck(this.c);
        if(this.currentTeam.team === 'light')
        {
            this.currentTeam.team = 'dark';
            this.currentTeam.pieces = this.darkPieces;             
        }else
        {
            this.currentTeam.team = 'light';
            this.currentTeam.pieces = this.lightPieces; 
        }
        // this.currentTeam.inCheck = this.inCheck;
        // this. lightTurn = !this.lightTurn;        
    }

    //used to create Piece types pulled from data-attributes and return a derived piece type
    // has to exist outside of piece due to circular dependency
    static generateDerviedObject(piece :Piece)
    {
        // console.log(piece);
        let temp :Piece;
        switch(piece.type)
        {
            case PieceType.pawn:
                temp = new Pawn(piece.team, "" ,piece.index);
                break;
            case PieceType.rook:
                temp = new Rook(piece.team, "", piece.index);
                break;      
            case PieceType.knight:
                temp = new Knight(piece.team, "", piece.index);
                break;
            case PieceType.bishop:
                temp = new Bishop(piece.team, "", piece.index);
                break;
            case PieceType.queen:
                temp = new Queen(piece.team, "", piece.index);
                break;
            case PieceType.king:
                temp = new King(piece.team, "", piece.index);
                break;
        }
        temp.position = piece.position;
        temp.moved = piece.moved;
        return temp;
    }

    isInBound(x)
    {
        if(x <= 7 && x >= 0)
            return true;
        return false;
    };
}