import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  usuario: Usuario;
  formGroup: FormGroup;
  formGroupModal: FormGroup;
  
  constructor(private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder, private alertController: AlertController, private usuarioService: UsuarioService, private loadingController: LoadingController) {
    this.usuario = new Usuario();
    this.formGroup = this.formBuilder.group({
      // 'email': [this.usuario.email, Validators.compose([
      //   Validators.required
      // ])],
      'email': [this.usuario.email,Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'senha': [this.usuario.senha, Validators.compose([
        Validators.required
      ])]
    })
    
    this.formGroupModal = this.formBuilder.group({
      'email': [this.usuario.email,Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
    })
  }

  ngOnInit() {
    if (UsuarioService.getLogin() != null) {
      UsuarioService.logout()
    }
  }

  login() {
    this.mostrarLoader();
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;

    this.usuarioService.login(this.usuario).then((json: any) => {
      let result = <number>(json);
      if (result === 200) {
        this.usuarioService.getByEmail(this.usuario.email).then((json: any) => {
          this.usuario = <Usuario>(json);
          if (this.usuario) {
            this.usuarioService.setLogin(this.usuario);
            this.showMessage('Logado com sucesso');
            this.navController.navigateBack('/home');
          } else {
            this.showMessage("Erro no login");
          }
        }).catch((erro: any) => {
          this.showMessage('Erro no login! Erro:' + erro['mensage']);
        });
      } else {
        this.showMessage('Email ou senha incorretos!')
      }
    }).catch((erro: any) => {
      this.showMessage('Erro no login! Erro:' + erro['mensage']);
    });

    this.fecharLoader();
  }

  recuperarConta(){
    this.mostrarLoader();
    let email = this.formGroupModal.value.email;

    this.usuarioService.recuperarConta(email).then((json: any) => {
      let result = <number>(json);
      if (result === 200) {
        this.showMessage('Enviamos um email com uma senha temporária!!').then(()=>{
            this.modal.dismiss()
            this.fecharLoader()
          }
        )
      } else {
        this.showMessage('O email informado não possui uma conta no aplicativo!').then(()=>{
            this.modal.dismiss()
            this.fecharLoader()
          }
        )
      }
    }).catch((erro: any) => {
      this.showMessage('O email informado não possui uma conta no aplicativo!').then(()=>{
          this.modal.dismiss()
          this.fecharLoader()
        }
      )
      // this.showMessage('Erro:' + erro['mensage']);
    });

  }


  mostrarLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }

  async showMessage(str: string) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1500
    })
    toast.present();
  }

  cancelModal() {
    this.modal.dismiss(null, 'cancel');
  }

}
