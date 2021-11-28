import { Board } from "./board";
import { PieceType } from "./pieceTypeEnum";

export class Piece
{
    type: PieceType;
    team: string;
    position: string;
    index: {row: 0, col: 0};
    icon: HTMLElement;
    moved: boolean = false;
    alive: boolean = true;
    static potentialMoves = [{row: 0, col:0}];

    constructor(type: PieceType, position: string, team: string, index: any)
    {
        // console.log(type,position,team,index);
        this.type = type;
        this.team = team;
        this.position = position;
        this.index = index;
        if(this.position !== "")
            this.icon = this.initPiece();
    };

    initPiece()
    {
        let elem = document.createElement("i");
        let tile = document.getElementById(`${this.position}`);
        // console.log(this);
        // console.log(tile)
        elem.classList.add(this.team, "gamepiece");
        elem.setAttribute("data-position", this.position);
        elem.setAttribute("data-type", this.type);
        elem.setAttribute("data-team", this.team);
        this.icon = elem;
        elem.setAttribute("data-object", window.btoa(JSON.stringify(this)));
        switch (this.type) 
        {
            case PieceType.pawn:
                elem.classList.add("fas", "fa-chess-pawn");
                break;
            case PieceType.bishop:
                    elem.classList.add("fas", "fa-chess-bishop");
                    break;
            case PieceType.rook:
                elem.classList.add("fas", "fa-chess-rook");
                break;
            case PieceType.knight:
                elem.classList.add("fas", "fa-chess-knight");
                break;
            case PieceType.queen:
                elem.classList.add("fas", "fa-chess-queen");
                break;
            case PieceType.king:
                elem.classList.add("fas", "fa-chess-king");
                break;
        }
        this.icon = elem;      
        tile?.append(this.icon);   
        return elem;     
    }

    static displayPotentialMoves(piece :Event, board :Board)
    {
        let pieceClicked = <HTMLElement>piece.target;
        let potentialMoves = [];
        const currPiece = Board.generateDerviedObject(JSON.parse(window.atob(pieceClicked.getAttribute('data-object') ) ) );
        console.log(currPiece)           
        if(!board.validTurn(currPiece))
            return;

        potentialMoves = this.checkPotentialMoves(board,currPiece);
        console.log(potentialMoves)
        //add filter  here to check for moves in cases of king in check
        if(board.currentTeam.inCheck)
        {            
            // console.log("last piece", this.lastPiece);
            // console.log("curr piece", currPiece);
            let oppPotentialMoves = Piece.checkPotentialMoves(board,board.lastPiece);
            // console.log("curr Moves", potentialMoves);
            // console.log("last piece pot moves", oppPotentialMoves);
            if(currPiece.type === PieceType.king)
            {
                oppPotentialMoves.forEach((oPm :any) =>
                {
                    for(let i = 0; i < potentialMoves.length; i++) 
                    {
                        if(oPm.col === potentialMoves[i].col && oPm.row === potentialMoves[i].row)
                        {
                            potentialMoves.splice(i,1);
                            i--;//decrement to protect loop 
                        }
                    }
                })
            }else
            {
                let tempMoves = [];
                let found = false;
                for(let i = 0; i < potentialMoves.length && !found; i++ )
                {
                    for(let oPm of oppPotentialMoves)
                    {                                       
                        if(potentialMoves[i].col === board.lastPiece.index.col && potentialMoves[i].row === board.lastPiece.index.row) 
                        {
                            tempMoves.push(potentialMoves[i]);
                        }
                        if(oPm.col === potentialMoves[i].col && oPm.row === potentialMoves[i].row ) //need to check if is in path of king
                        {
                            if(currPiece.inPathOfKing(potentialMoves[i], currPiece, board))
                            {
                                console.log('found');
                                found = true;                                                                
                                tempMoves.push(potentialMoves[i]);
                            }                                                                             
                        }                    
                        if(found)
                            break;
                    };
                }         
                //need to add 1 more check for if the potential move can capture the piece causing
                //checkmate
                potentialMoves = tempMoves;
            }            
        }
        this.potentialMoves = potentialMoves;
        this.potentialMoves.forEach(m =>
        {            
            board.tiles[m.row][m.col].element.classList.add('overlay-effect');
        });
    }
    
    //event listeners for all pieces

    //sets the current piece being selected to move
    static selectPieceToMove(piece: Event, board :Board)
    {
       
        let pieceClicked = <HTMLElement>piece.target;
        board.pieceToMoveElement = pieceClicked;
        board.pieceToMove = Board.generateDerviedObject(JSON.parse(window.atob(pieceClicked.getAttribute('data-object') ) ) );
        // console.log("piece to move", this.pieceToMove);
        // this.pieceToMove.icon = event.target;
        
        if(!board.validTurn(board.pieceToMove))
            return;      
    }

    //mousedown event checks then displays potential moves for each piece
    //on mouse down, move prediction is removed on mouseup
    static checkPotentialMoves(board:Board, currPiece :Piece) :any
    {
        console.log('checking potential moves', currPiece);                
        switch(currPiece.type)
        {
            case PieceType.pawn:
                return currPiece.checkMoves(board,currPiece);                                
            case PieceType.rook:
                return currPiece.checkMoves(board,currPiece);                
            case PieceType.bishop:
                return currPiece.checkMoves(board, currPiece);                
            case PieceType.knight:
                return currPiece.checkMoves(board, currPiece);                
            case PieceType.queen:
                return currPiece.checkMoves(board, currPiece);
            case PieceType.king:
                return currPiece.checkMoves(board, currPiece);
            default:
                return currPiece.checkMoves(board,currPiece);                                
        }
    }

    checkMoves(board :Board, piece :Piece){};

    inPathOfKing(potentialMove: any, currPiece :Piece, board :Board)
    {
        let tempIdx = potentialMove;
        console.log("last piece", board.lastPiece);
        // console.log("curr piece", currPiece);
        console.log("my move",potentialMove);        
        console.log(board.tiles[potentialMove.row][potentialMove.col]);
        //simulate the move and re check path
        board.tiles[potentialMove.row][potentialMove.col].occupied = true;
        let tempPiece = <HTMLElement>document.getElementById(currPiece.position)?.children[0]?.cloneNode();        
        tempPiece.style.display = 'none';
        let tempDestination = board.tiles[potentialMove.row][potentialMove.col].element;
        tempDestination.appendChild(tempPiece);
        let oppPotentialMoves = Piece.checkPotentialMoves(board, board.lastPiece);
        for(let oPm of oppPotentialMoves)
        {
            console.log(oPm)
            console.log(board.tiles[oPm.row][oPm.col].element)
            if(board.tiles[oPm.row][oPm.col].element.firstChild)
            {
                let elem = board.tiles[oPm.row][oPm.col].element.children[0];
                // console.log(elem)
                if(elem.getAttribute('data-type') === 'k')
                    return false;
            }
        };

        //reset all changes!
        tempDestination.removeChild(tempDestination.childNodes[0]);    
        board.tiles[potentialMove.row][potentialMove.col].occupied = false;

        return true;
    }
    
}