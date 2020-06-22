import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CNPJ'
})
export class CnpjPipe implements PipeTransform {

  transform(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3/\$4-\$5');
  }
}
