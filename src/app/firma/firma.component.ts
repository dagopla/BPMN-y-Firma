import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css'],
})
export class FirmaComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  xAnterior: number = 0;
  yAnterior: number = 0;
  yActual: number = 0;
  xActual: number = 0;
  contexto: any;
  COLOR = 'black';
  GROSOR = 2;

  obtenerXReal: any;
  obtenerYReal: any;
  haComenzadoDibujo = false; // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo
  constructor() {}

  ngOnInit() {
    this.contexto = this.canvas.nativeElement.getContext('2d');
    this.obtenerXReal = (clientX: any) =>
      clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    this.obtenerYReal = (clientY: any) =>
      clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    ['mouseup', 'mouseout','pointerup','pointerout'].forEach((nombreDeEvento) => {
      this.canvas.nativeElement.addEventListener(nombreDeEvento, () => {
        this.haComenzadoDibujo = false;
      });
    });
  }
  touchstart(event: any) {
    event.preventDefault();
    this.xAnterior = this.xActual;
    this.yAnterior = this.xActual;
    this.xActual = this.obtenerXReal(event.touches[0].clientX);
    this.yActual = this.obtenerYReal(event.touches[0].clientY);
    this.contexto.beginPath();
    this.contexto.fillStyle = this.COLOR;
    this.contexto.fillRect(
      this.xActual,
      this.yActual,
      this.GROSOR,
      this.GROSOR
    );
    this.contexto.closePath();
    // Y establecemos la bandera
    this.haComenzadoDibujo = true;
  }
  mousedown(event: any) {
    this.xAnterior = this.xActual;
    this.yAnterior = this.xActual;
    this.xActual = this.obtenerXReal(event.clientX);
    this.yActual = this.obtenerYReal(event.clientY);
    this.contexto.beginPath();
    this.contexto.fillStyle = this.COLOR;
    this.contexto.fillRect(
      this.xActual,
      this.yActual,
      this.GROSOR,
      this.GROSOR
    );
    this.contexto.closePath();
    // Y establecemos la bandera
    this.haComenzadoDibujo = true;
  }
  touchmove(event: any) {
    if (!this.haComenzadoDibujo) {
      return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

    this.xAnterior = this.xActual;
    this.yAnterior = this.yActual;
    this.xActual = this.obtenerXReal(event.touches[0].clientX);
    this.yActual = this.obtenerYReal(event.touches[0].clientY);
    this.contexto.beginPath();
    this.contexto.moveTo(this.xAnterior, this.yAnterior);
    this.contexto.lineTo(this.xActual, this.yActual);
    this.contexto.strokeStyle = this.COLOR;
    this.contexto.lineWidth = this.GROSOR;
    this.contexto.stroke();
    this.contexto.closePath();
  }
  mousemove(event: any) {
    if (!this.haComenzadoDibujo) {
      return;
    }
    // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

    this.xAnterior = this.xActual;
    this.yAnterior = this.yActual;
    this.xActual = this.obtenerXReal(event.clientX);
    this.yActual = this.obtenerYReal(event.clientY);
    this.contexto.beginPath();
    this.contexto.moveTo(this.xAnterior, this.yAnterior);
    this.contexto.lineTo(this.xActual, this.yActual);
    this.contexto.strokeStyle = this.COLOR;
    this.contexto.lineWidth = this.GROSOR;
    this.contexto.stroke();
    this.contexto.closePath();
  }
  onMouseUp() {
    // Lógica para manejar el evento mouseup
    console.log('Se ha soltado el botón del mouse');
  }

  onMouseOut() {
    // Lógica para manejar el evento mouseout
    console.log('El puntero del mouse ha salido del elemento');
  }

  cleanCanvas() {
    this.contexto.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }
}
