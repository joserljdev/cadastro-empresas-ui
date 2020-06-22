import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { take, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { ToastOptions, ToastaService } from 'ngx-toasta';

import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-form-pesquisa',
  templateUrl: './form-pesquisa.component.html',
  styleUrls: ['./form-pesquisa.component.css']
})
export class FormPesquisaComponent implements OnInit {

  formPesquisa: FormGroup;
  empresas = [];
  options: ToastOptions;

  constructor(
    private empresaService: EmpresaService,
    private toast: ToastaService, private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.pesquisar();
  }

  configurarFormulario() {
    this.formPesquisa = this.formBuilder.group({
      cnpj: [''],
      nome: ['']
    });
  }

  pesquisar() {
    this.empresaService.pesquisar(this.formPesquisa.value)
      .subscribe(dados => this.empresas = dados);
  }

  recarregar() {
    const cnpj = this.formPesquisa.get('cnpj').value;
    const nome = this.formPesquisa.get('nome').value;

    if (!cnpj && !nome) {
      this.pesquisar();
    }
  }

  excluir(id: number) {
    const result$ = this.empresaService.mostrarDialogo();
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(res => res ? this.empresaService.deletar(id) : EMPTY)
      )
      .subscribe(
        success => {
          this.options = {
            title: 'Aviso',
            msg: 'Registro Excluído com sucesso!',
            timeout: 4000
          };
          this.toast.success(this.options);
          this.pesquisar();
        },
        res => {
          this.options = {
            title: 'Alerta',
            msg: res.error.mensagem,
            timeout: 3000
          };
          this.toast.error(this.options);
        }
      );
  }

  confirmarExclusao(id: number) {
    this.excluir(id);
  }
}
