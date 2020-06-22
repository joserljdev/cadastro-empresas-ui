import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { ToastOptions, ToastaService } from 'ngx-toasta';

import { EmpresaService } from '../empresa.service';
import { FormValidation } from '../../shared/form-validations';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  formulario: FormGroup;

  tipos = [];

  options: ToastOptions;

  buscaCEPUrl = 'http://localhost:8080/empresas/endereco';

  constructor(
    private empresaService: EmpresaService,
    private toast: ToastaService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  codigoEmpresa: number;

  ngOnInit() {
    this.codigoEmpresa = this.route.snapshot.params.codigo;

    if (this.codigoEmpresa) {
      this.carregarEmpresa(this.codigoEmpresa);
    }

    this.configurarFormulario();
    this.carregarTipos();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      cnpj: [null, [Validators.required, FormValidation.cnpjValidator]],
      tipo: [null, Validators.required],
      nome: [null, [Validators.required, Validators.maxLength(40)]],
      razaoSocial: [null, [Validators.required, Validators.maxLength(40)]],
      contato: [null, [Validators.required, Validators.maxLength(40)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80)]],
      cep: [null, [Validators.required, FormValidation.cepValidator]],
      estado: [null, [Validators.required, Validators.maxLength(40)]],
      bairro: [null, [Validators.required, Validators.maxLength(40)]],
      cidade: [null, [Validators.required, Validators.maxLength(40)]],
      logradouro: [null, [Validators.required, Validators.maxLength(40)]],
      complemento: [null, Validators.maxLength(40)]
    });
  }

  compararEmpresas(e1, e2) {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  adicionar() {
    this.empresaService.adicionar(this.formulario);

    this.options = {
      title: 'Aviso',
      msg: 'Registro Gravado com sucesso!',
      timeout: 4000
    };

    this.toast.success(this.options);

    this.formulario.reset();
  }

  atualizar() {
    this.empresaService.alterar(this.codigoEmpresa, this.formulario);

    this.options = {
      title: 'Aviso',
      msg: 'Registro Alterado com sucesso!',
      timeout: 4000
    };

    this.toast.success(this.options);

  }

  salvar() {
    if (this.editando()) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  carregarTipos() {
    this.empresaService.obterTipos()
      .subscribe(dados => this.tipos = dados);
  }

  carregarEmpresa(codigo: number) {
    this.empresaService.pesquisarPorCodigo(codigo)
      .subscribe(dados => this.populaFormDadosEmpresaAtualizacao(dados));
  }

  editando() {
    return this.codigoEmpresa ? true : false;
  }

  verificaCNPJInvalido() {
    const campoCNPJ = this.formulario.get('cnpj');

    if (campoCNPJ.errors) {
      return campoCNPJ.errors.cnpjInvalido && campoCNPJ.dirty;
    }
  }

  verificaRequired(campo) {
    return (
      this.formulario.get(campo).hasError('required') && !this.formulario.get(campo).hasError('maxlength') &&
      (this.formulario.get(campo).touched || this.formulario.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');

    if (campoEmail.errors) {
      return !this.formulario.get('email').hasError('maxlength')
        && campoEmail.errors.email && campoEmail.touched;
    }
  }

  consultarCEP() {

    let cep = this.formulario.get('cep').value;

    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validaCEP = /^[0-9]{8}$/;

      if (validaCEP.test(cep)) {
        this.http.get(`${this.buscaCEPUrl}/${cep}`)
          .subscribe(dados => this.populaFormDadosEndereco(dados));
      }
    }
  }

  populaFormDadosEndereco(dados) {
    this.formulario.patchValue({
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  populaFormDadosEmpresaAtualizacao(dados) {
    this.formulario.patchValue({
      id: dados.id,
      cnpj: dados.cnpj,
      tipo: dados.tipo,
      nome: dados.nome,
      razaoSocial: dados.razaoSocial,
      contato: dados.contato,
      email: dados.email,
      cep: dados.cep,
      logradouro: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado
    });
  }
}
