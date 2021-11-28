import { Component, OnInit } from '@angular/core';
import { Board } from 'src/assets/classes/board';
import { Piece } from 'src/assets/classes/piece';
import { Tile } from 'src/assets/classes/tile';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  board :Board = new Board();
  constructor() { }

  ngOnInit(): void {
    this.startGame();
  }

  startGame()
  {
    this.board.initBoard();
    this.board.initLightPieces();
    this.board.initdarkPieces();
    this.addEventListeners();
  }

  //add all event listerns
  addEventListeners()
  {
      let pieces = document.getElementsByClassName('gamepiece');
      let tiles = document.getElementsByClassName('tile');

      //tile event listener for onclick to initialize moves
      for(let i = 0; i < tiles.length; i++)
      {
          tiles[i].addEventListener("click", (event) =>
          {                
              Tile.initMove(event, this.board);
          })
      }

      for(let i = 0;i < pieces.length; i++)
      {
          ['mousedown', 'mouseup', 'click'].forEach(type =>
          {
              if(type === 'mousedown')
              {
                  //provides move predictions 
                  pieces[i].addEventListener(type, (event) =>
                  {                        
                      Piece.displayPotentialMoves(event, this.board);
                  }); 
              }else if(type === 'mouseup')
              {                                       
                  //not working 
                  pieces[i].addEventListener(type, (event) =>
                  {                    
                      let elems = document.getElementsByClassName('overlay-effect');  
                      // console.log(elems)                 
                      for (let i = elems.length - 1; i >= 0; i--)
                      {                            
                          elems[i].classList.remove('overlay-effect');                                                        
                      }                        
                  });                                         
              }else if(type === 'click')
              {   //selected the piece to be moved
                  pieces[i].addEventListener(type, (event) =>
                  {
                      Piece.selectPieceToMove(event,this.board);
                  });
              }
          });
      }
  }

}
