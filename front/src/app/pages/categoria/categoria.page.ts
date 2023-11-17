import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: Categoria[];
  formGroup: FormGroup;

  constructor(
    private toastController: ToastController,
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.categorias = [];

    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (UsuarioService.getLogin() === null) {
      this.navController.navigateBack('/login');
    }
  }

  async ionViewWillEnter() {
    this.carregarListagem();
  }

  async carregarListagem() {
    this.showLoader();
    await this.categoriaService.get().then((json) => {
      this.categorias = <Categoria[]>json;
    });
    this.closeLoader();
  }

  showLoader() {
    this.loadingController
      .create({
        message: 'Carregando...',
      })
      .then((res) => {
        res.present();
      });
  }

  closeLoader() {
    setTimeout(() => {
      this.loadingController
        .dismiss()
        .then(() => {})
        .catch((erro) => {
          console.log('Erro: ', erro);
        });
    }, 500);
  }

  async excluir(categoria: Categoria) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: categoria.nome,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.categoriaService
              .delete(categoria.id)
              .then(() => {
                this.carregarListagem();
                this.exibirMensagem('Registro excluído com sucesso!!!');
              })
              .catch(() => {
                this.exibirMensagem('A categoria não pôde ser deletada pois já possui comentários!');
              });
          },
        },
      ],
    });
    await alert.present();
  }
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
    });
    toast.present();
  }

  salvar() {
    let categoria = new Categoria();
    categoria.nome = this.formGroup.value.nome;

    this.categoriaService
      .save(categoria)
      .then((json: any) => {
        categoria = <Categoria>json;
        if (categoria) {
          this.exibirMensagem('Registro salvo com sucesso!!!');
          this.carregarListagem();
          this.formGroup.get('nome')?.setValue("")
        } else {
          this.exibirMensagem('Erro ao salvar o registro!');
        }
      })
      .catch((erro: any) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro:' + erro['mensage']);
      });
  }
}
