import { Component, OnInit, ViewChildren, QueryList, Input, HostListener } from '@angular/core';
import { PixelFillDirective } from '../pixel/pixel-fill.directive';
import { PixelService } from '../pixel/pixel.service';

@Component({
  selector: 'pixel-board',
  template: `
    <div class="board" [ngStyle]="{'height.px': PIXEL_SIZE*rows, 'width.px': PIXEL_SIZE*cols}">
      <ng-container *ngFor="let pixelRow of pixelBoard">
          <ng-container *ngFor="let pixel of pixelRow">
              <div class="pixel" [ngStyle]="{'height.px': PIXEL_SIZE, 'width.px': PIXEL_SIZE}" pixelFill></div>
          </ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./pixel-board.component.scss']
})

export class PixelBoardComponent implements OnInit{

  readonly PIXEL_SIZE = 15;
  cols = 40;
  rows = 40;
  pixelBoard: Array<Array<any>>;

  @ViewChildren(PixelFillDirective)
  pixelsRef: QueryList<PixelFillDirective>;

  constructor(
    private pixelService: PixelService
  ) { }

  ngOnInit() {
    this.pixelBoard = new Array(this.rows);
    for(let i = 0; i < this.rows; i++){
      this.pixelBoard[i] = new Array(this.cols).fill(0);
    }
  }

  addColumn(){
    this.cols += 1;
    this.pixelBoard.forEach(pixelRow=>{
      pixelRow.push(0);
    });
  }

  addRow(){
    this.rows += 1;
    this.pixelBoard.push(new Array(this.cols).fill(0));
  }

  clearPixels(){
    this.pixelsRef.forEach(pixel=>{
      pixel.clearPixel();
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.pixelService.clicked = false;
  }
}
