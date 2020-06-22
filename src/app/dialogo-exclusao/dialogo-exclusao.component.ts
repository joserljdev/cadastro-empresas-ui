import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialogo-exclusao',
  templateUrl: './dialogo-exclusao.component.html',
  styleUrls: ['./dialogo-exclusao.component.css']
})
export class DialogoExclusaoComponent implements OnInit {

  confirmado: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmado = new Subject();
  }

  confirmar() {
    this.confirmarECancelar(true);
  }

  cancelar() {
    this.confirmarECancelar(false);
  }

  private confirmarECancelar(value: boolean) {
    this.confirmado.next(value);
    this.bsModalRef.hide();
  }
}
