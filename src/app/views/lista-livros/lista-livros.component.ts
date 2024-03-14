import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import {  catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, throwError } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/interface/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent  {

  campoBusca = new FormControl();
  mensagemErro = '';
  livroResultado: LivrosResultado;

  constructor(private service:LivroService) { }


  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado)=> valorDigitado.length >= 3 ),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map( resultado => this.livroResultado = resultado),
    map(resultado => resultado.items ?? []),
    map(items => this.converterRetornoBuscadoParaLivro(items)),
    catchError( (erro) => {
     /*  this.mensagemErro ='Ops, problemas na conexão! Recarregue a aplicação';
      return EMPTY; */
      console.log(erro);
      return throwError(() => new Error(this.mensagemErro ='Ops, problemas na conexão! Recarregue a aplicação'));
    } ),

  );



  private converterRetornoBuscadoParaLivro(itens:Item[]):LivroVolumeInfo[]{
      return itens.map((item) =>{
      return new LivroVolumeInfo(item);
      });
  }

}



