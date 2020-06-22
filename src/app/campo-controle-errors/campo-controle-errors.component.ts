import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-controle-errors',
  templateUrl: './campo-controle-errors.component.html',
  styleUrls: ['./campo-controle-errors.component.css']
})
export class CampoControleErrorsComponent implements OnInit {

  @Input() mostrarErro: boolean;
  @Input() msgErro: string;

  constructor() { }

  ngOnInit() {
  }
}
