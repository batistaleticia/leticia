import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { InfoAssistenciais } from 'src/app/model/info-assistenciais';
import { ComentarioService } from 'src/app/service/comentario.service';
import { InfoAssistenciaisService } from 'src/app/service/info-assistenciais.service';

@Component({
  selector: 'app-add-info-assistenciais',
  templateUrl: './add-info-assistenciais.page.html',
  styleUrls: ['./add-info-assistenciais.page.scss'],
})
export class AddInfoAssistenciaisPage implements OnInit {
  formGroup: FormGroup;
  infoAssistencial: InfoAssistenciais;

  constructor(private formBuilder: FormBuilder,    
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private navController: NavController,

    private infoAssistenciaisService: InfoAssistenciaisService,) { 

      this.infoAssistencial = new InfoAssistenciais();
      this.formGroup = this.formBuilder.group({
        info: [this.infoAssistencial.info, Validators.compose([Validators.required])],
      });
    
      let id = this.activatedRoute.snapshot.params['id'] | 0;

      if (id > 0) {
        this.infoAssistenciaisService.getById(id).then((json: any) => {
          this.infoAssistencial = <InfoAssistenciais>json;
          this.formGroup.get('info')?.setValue(this.infoAssistencial.info);
        });        
      }

  }

  ngOnInit() {
  }

  salvar() {
    let infoAssistencial = new InfoAssistenciais();
    infoAssistencial.info = this.formGroup.value.info;

    this.infoAssistenciaisService
      .save(infoAssistencial)
      .then((json: any) => {
        let coment = <InfoAssistenciais>json;

        if (coment) {
          this.exibirMensagem('Registro salvo com sucesso!!!');
          this.navController.navigateBack('/info-assistenciais');
        } else {
          this.exibirMensagem('Houve um erro.');
        }
      })
      .catch((erro: any) => {
        this.exibirMensagem(
          'Erro ao salvar o registro! Erro:' + erro['mensage']
        );
      });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
    });
    toast.present();
  }

}
