import { FormControl } from '@angular/forms';

export class FormValidation {
  static cepValidator(control: FormControl) {

    const cep = control.value;

    if (cep && cep !== '') {
      const validaCEP = /^[0-9]{8}$/;

      return validaCEP.test(cep) ? null : { cepInvalido: true };
    }
  }

  static cnpjValidator(control: FormControl) {
    const cnpj = control.value;

    const valoresInvalidosConhecidos = [
      '00000000000000', '11111111111111', '22222222222222', '33333333333333',
      '44444444444444', '55555555555555', '66666666666666', '77777777777777',
      '88888888888888', '99999999999999'
    ];

    if (cnpj && cnpj != '') {
      if (cnpj.length < 14) { return { cnpjInvalido: true }; }

      if (valoresInvalidosConhecidos.includes(cnpj)) { return { cnpjInvalido: true }; }

      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2) { pos = 9; }
      }

      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

      if (resultado != digitos.charAt(0)) { return { cnpjInvalido: true }; }

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;

        if (pos < 2) { pos = 9; }
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

      if (resultado != digitos.charAt(1)) { return { cnpjInvalido: true }; }

      return null;
    }
  }
}
