import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  usuario: Usuario;
  formGroup: FormGroup;

  tituloPage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController
  ) {
    this.tituloPage = 'Cadastrar';

    this.usuario = new Usuario();
    let id = this.activatedRoute.snapshot.params['id'] | 0;

    if (Number(id) > 0) {
      this.usuarioService.getById(id).then((json: any) => {
        this.usuario = <Usuario>json;
        if (this.usuario != null) {
          this.tituloPage = 'Perfil';

          this.formGroup.get('nome')?.setValue(this.usuario.nome);
          this.formGroup.get('email')?.setValue(this.usuario.email);
          this.formGroup.get('senha')?.setValue(this.usuario.senha);
          this.formGroup
            .get('acesso')
            ?.setValue(this.usuario.acesso === 0 ? true : false);
        } else {
          this.navController.navigateBack('/home');
        }
      });
    }

    this.formGroup = this.formBuilder.group({
      nome: [this.usuario.nome, Validators.compose([Validators.required])],
      email: [
        this.usuario.email,
        Validators.compose([
          Validators.maxLength(70),
          Validators.pattern(
            '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
          ),
          Validators.required,
        ]),
      ],
      senha: [this.usuario.senha, Validators.compose([Validators.required])],
      acesso: ['', Validators.compose([])],
    });
  }

  ngOnInit() {}

  salvar() {
    this.mostrarLoader();
    this.usuario.nome = this.formGroup.value.nome;
    this.usuario.email = this.formGroup.value.email;
    this.usuario.senha = this.formGroup.value.senha;
    this.usuario.acesso = this.formGroup.value.acesso === false ? 1 : 0;

    this.usuarioService.conferirEmail(this.usuario.email).then((json) => {
      let usuario = <Usuario>json;
      console.log(usuario);

      if (usuario === null) {
        this.usuarioService
          .save(this.usuario)
          .then((json: any) => {
            let usuario = <Usuario>json;
            if (usuario) {
              this.exibirMensagem('Registro salvo com sucesso!!!');
              if (usuario.idUsuario > 0) {
                this.navController.navigateBack('/login');
              } else {
                this.navController.navigateBack('/login');
              }
            } else {
              this.exibirMensagem('Erro ao salvar o registro!');
            }
          })
          .catch((erro: any) => {
            this.exibirMensagem('Erro:' + erro['mensage']);
          });
      } else {
        this.exibirMensagem(
          'Erro ao salvar o registro! O email já possui uma conta no sistema!'
        );
      }
    });

    this.fecharLoader();
  }

  mostrarLoader() {
    this.loadingController
      .create({
        message: 'Carregando...',
      })
      .then((res) => {
        res.present();
      });
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController
        .dismiss()
        .then(() => {})
        .catch((erro) => {
          console.log('Erro: ', erro);
        });
    }, 500);
  }

  async exibirMensagem(str: string) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1500,
    });
    toast.present();
  }
}
