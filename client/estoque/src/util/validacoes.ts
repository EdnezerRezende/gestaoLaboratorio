import { AbstractControl } from "@angular/forms";

export class Validacoes {
    static formatSize(bytes) {
      if (bytes === 0) {
        return '0 B';
      }
      const k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
  
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
  
    static validarCpf(cpf: string) {
      let sum = 0;
      let remainder;
  
      cpf = cpf.replace('.', '')
       .replace('.', '')
       .replace('-', '')
       .trim();
  
      let allEqual: boolean;
      allEqual = true;
      for (let i = 0; i < cpf.length - 1; i++) {
        if (cpf[i] !== cpf[i + 1]) {
              allEqual = false;
          }
        }
  
      if (allEqual) {
         return false;
      }
  
      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i), 0) * (11 - i);
      }
  
      remainder = (sum * 10) % 11;
  
      if ((remainder === 10) || (remainder === 11)) {
       remainder = 0;
      }
  
      if (remainder !== parseInt(cpf.substring(9, 10), 0)) {
              return false;
      }
  
      sum = 0;
      for (let i = 1; i <= 10; i++) {
          sum = sum + parseInt(cpf.substring(i - 1, i), 0) * (12 - i); remainder = (sum * 10) % 11;
      }
  
      if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
      }
  
      if (remainder !== parseInt(cpf.substring(10, 11), 0)) {
        return false;
      }
        return true;
    }
  
    static formatarParaCpf(valor: string) {
      if (valor ) {
        return valor.substr(0, 3) + '.' + valor.substr(3, 3) + '.' + valor.substr(6, 3) + '-' + valor.substr(9, 2);
      } else {
        return '-';
      }
    }

    static formatarParaCnpj(valor: string) {
      if (valor ) {
        return valor.substr(0, 2) + '.' + valor.substr(2, 3) + '.' + valor.substr(5, 3) + '/' + valor.substr(8, 4) + '-'+ valor.substr(12);
      } else {
        return '-';
      }
    }

    static formatarParaPlaca(valor: string) {
      if (valor ) {
          return valor.substr(0, 3) + '-' + valor.substr(3) ;
      } else {
        return '-';
      }
    }

    static formatarCEP(valor: string){
      if ( valor ){
        return valor.substr(0,5) + '-' + valor.substr(5,8);
      }else{
        return '-';
      }
    }

    static formatarNumeroProcesso(valor: string){
      if ( valor ){
        if ( valor.length == 13 ){
          return valor.substr(0,3) + '.' + valor.substr(3,6) + '/' + valor.substr(9);
        } else if ( valor.length == 12 ) {
          return 0 + valor.substr(0,2) + '.' + valor.substr(2,8) + '/' + valor.substr(8);
        }

      }else{
        return '-';
      }
    }


    // Validar CNPJ

    static validate(control: AbstractControl): { [key: string]: boolean } {
      if (this.cnpjValido(control.value)) {
        return null;
      }
      return { cnpj: true };
    }
  
    /**
       * Valida um CNPJ.
       *
       * @param cnpj valor do cnpj a ser validado.
       * @return boolean informando se o cnpj é válido ou não.
       */
    static cnpjValido(cnpj: any): boolean {
      cnpj = !cnpj || cnpj.replace(/\D/g, '');
  
      var cnpjsInvsRegex = /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;
  
      if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)) {
        return false;
      }
  
      var tamanho = cnpj.length - 2;
      var numeros = cnpj.substring(0, tamanho);
      var digitos = cnpj.substring(tamanho);
      var soma = 0;
      var pos = tamanho - 7;
  
      for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
  
      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== parseInt(digitos.charAt(0), 10)) {
        return false;
      }
  
      tamanho += 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
  
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
  
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  
      return resultado === parseInt(digitos.charAt(1), 10);
    }


  }
  
  