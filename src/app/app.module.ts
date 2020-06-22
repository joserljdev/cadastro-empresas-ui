import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastaModule } from 'ngx-toasta';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppComponent } from './app.component';
import { EmpresaService } from './empresa.service';
import { FormPesquisaComponent } from './form-pesquisa/form-pesquisa.component';
import { DialogoExclusaoComponent } from './dialogo-exclusao/dialogo-exclusao.component';
import { FormCadastroComponent } from './form-cadastro/form-cadastro.component';
import { CampoControleErrorsComponent } from './campo-controle-errors/campo-controle-errors.component';
import { CnpjPipe } from './cnpj.pipe';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
  { path: 'empresas', component: FormPesquisaComponent },
  { path: 'empresas/novo', component: FormCadastroComponent },
  { path: 'empresas/:codigo', component: FormCadastroComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FormPesquisaComponent,
    DialogoExclusaoComponent,
    FormCadastroComponent,
    CampoControleErrorsComponent,
    CnpjPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    NgxPaginationModule,
    ToastaModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxMaskModule.forRoot(),

  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent],
  entryComponents: [DialogoExclusaoComponent]
})
export class AppModule { }
