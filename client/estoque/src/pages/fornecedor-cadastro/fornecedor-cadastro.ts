import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Fornecedor } from '../../modelos/fornecedor';
import { FornecedorServiceProvider } from '../../providers/fornecedor-service/fornecedor-service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BrMaskModel, BrMaskerIonic3, BrMaskerModule } from 'brmasker-ionic-3';
import { ValidatorCnpj } from './../../diretivas/validator-cnpj';

@IonicPage()
@Component({
  selector: 'page-fornecedor-cadastro',
  templateUrl: 'fornecedor-cadastro.html',
})
export class FornecedorCadastroPage {
  
  public fornecedor: Fornecedor;
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _fornecedorService: FornecedorServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _nativePageTransitions: NativePageTransitions,
    private formBuilder: FormBuilder
  ) {
    this.fornecedor = new Fornecedor();
    this.formulario = this.formBuilder.group({
      nomeFornecedor: ['', Validators.required],
      email: ['', [Validators.required]],//, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      cnpj: ['', [Validators.required, ValidatorCnpj] ],
      contrato: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      nomeContato: ['', Validators.required],
      telefoneContato: ['', Validators.required]
    });
  }
 

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarfornecedor(){
    let loading = this.obterLoading();
    loading.present();
    let telefone = this.fornecedor.telefoneContato.toString();
    let telefonenovo = telefone.trim().replace("(", "").replace(")", "").replace("-","").valueOf();
    this.fornecedor.telefoneContato = parseInt(telefonenovo);
    this._fornecedorService.salvar(this.fornecedor)
    .subscribe(
      () => {
        loading.dismiss();
        // this._loading.finalizar();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Fornecedor inserido! Deseja inserir mais produtos ? ',
          buttons: [
            {
              text: 'Sim', 
              handler: ()=> {
                this.limparCamposFormulario();
              }
            },
            { text: 'Não', 
              handler: ()=>{
                let options: NativeTransitionOptions={
                  direction: 'left',
                  duration: 400,
                  slowdownfactor: -1,
                  iosdelay: 50
            
                };
                this._nativePageTransitions.slide(options);
                this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      },
    (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: err.message,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }
 
  limparCamposFormulario(){
    this.fornecedor.nomeFornecedor = "";
    this.fornecedor.nomeContato = "";
    this.fornecedor.cep = "";
    this.fornecedor.cidade = "";
    this.fornecedor.cnpj = "";
    this.fornecedor.contrato = "";
    this.fornecedor.endereco = "";
    this.fornecedor.telefoneContato = undefined;
    this.fornecedor.uf = "";

  }
  
  // protected createForm(): FormGroup {
  //   return new FormGroup({
  //     cnpj: new FormControl(this.createcnpj())
  //   });
  // }
   
  // private createcnpj(): string {
  //   const config: BrMaskModel = new BrMaskModel();
  //   config.person = true;
  //   return this.brMaskerIonic3.writeCreateValue('99999999999', config);
  // }

}
