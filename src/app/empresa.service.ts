import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DialogoExclusaoComponent } from './dialogo-exclusao/dialogo-exclusao.component';

@Injectable()
export class EmpresaService {

  private empresaUrl = 'http://localhost:8080/empresas';

  constructor(private http: HttpClient, private modalService: BsModalService) { }

  adicionar(formulario: FormGroup) {
    this.http.post(this.empresaUrl, formulario.value)
      .subscribe(dados => dados);
  }

  alterar(id: number, formulario: FormGroup) {
    this.http.put(`${this.empresaUrl}/${id}`, formulario.value)
      .subscribe(dados => dados);
  }

  deletar(id: number): Observable<any> {
    const url = `${this.empresaUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  pesquisar(filtro: any): Observable<any> {
    filtro = JSON.parse(JSON.stringify(filtro));

    let params = new HttpParams();

    if (filtro.cnpj) {
      params = params.set('cnpj', filtro.cnpj);
    }

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.empresaUrl, { params }).pipe(
      map(res => res));
  }

  pesquisarPorCodigo(codigo: number): Observable<any> {
    return this.http.get(`${this.empresaUrl}/${codigo}`).pipe(
      map(res => res));
  }

  consultar(): Observable<any> {
    return this.http.get(this.empresaUrl).pipe(
      map(res => res));
  }

  obterTipos(): Observable<any> {
    return this.http.get(`${this.empresaUrl}/tipos`).pipe(
      map(res => res));
  }

  mostrarDialogo() {
    const bsModalRef: BsModalRef = this.modalService.show(DialogoExclusaoComponent, {
      initialState: {
        titulo: 'Confirmação',
        mensagem: 'Deseja mesmo Excluir a empresa selecionada?'
      }
    });

    return (bsModalRef.content as DialogoExclusaoComponent).confirmado;
  }
}

