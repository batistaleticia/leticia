import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { InfoAssistenciais } from 'src/app/model/info-assistenciais';
import { Usuario } from 'src/app/model/usuario';
import { InfoAssistenciaisService } from 'src/app/service/info-assistenciais.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-info-assistenciais',
  templateUrl: './info-assistenciais.page.html',
  styleUrls: ['./info-assistenciais.page.scss'],
})
export class InfoAssistenciaisPage implements OnInit {
  infoAssistenciais: InfoAssistenciais[];
  usuario: Usuario;


  constructor(private toastController: ToastController,
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,    
    private usuarioService: UsuarioService,

    private infoAssistenciaisService: InfoAssistenciaisService) { 
    this.infoAssistenciais = [];
    this.usuario = UsuarioService.getLogin();


  }

  ngOnInit() {
  }
  
  async ionViewWillEnter() {
    this.carregarListagem();
  }

  async carregarListagem() {
    this.showLoader();
    await this.infoAssistenciaisService.get().then((json) => {
      this.infoAssistenciais = <InfoAssistenciais[]>json;
    });
    console.log(this.infoAssistenciais);
    
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

  async excluir(infoAssistencial: InfoAssistenciais) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: infoAssistencial.info,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.infoAssistenciaisService
              .delete(infoAssistencial.id)
              .then(() => {
                this.carregarListagem();
                this.exibirMensagem('Registro excluído com sucesso!!!');
              })
              .catch(() => {
                this.exibirMensagem('Erro ao excluir o registro.');
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


}
