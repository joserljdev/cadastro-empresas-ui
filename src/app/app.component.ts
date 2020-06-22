import { Component, OnInit } from '@angular/core';

import { ToastaConfig } from 'ngx-toasta';

import { EmpresaService } from './empresa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cadastro-empresas-ui';

  constructor(private empresaService: EmpresaService, private toastaConfig: ToastaConfig) {
    this.toastaConfig.theme = 'bootstrap';
  }

  ngOnInit() {
    this.empresaService.consultar();
  }
}
