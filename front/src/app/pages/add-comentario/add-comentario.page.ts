import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Comentario } from 'src/app/model/comentario';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ComentarioService } from 'src/app/service/comentario.service';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-add-comentario',
  templateUrl: './add-comentario.page.html',
  styleUrls: ['./add-comentario.page.scss'],
})
export class AddComentarioPage implements OnInit {
  usuario: Usuario;
  categorias: Categoria[];
  // comentario: Comentario;
  formGroup: FormGroup;
  categoriaId: number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private navController: NavController,
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService,
    private categoriaService: CategoriaService
  ) {

    this.usuario = UsuarioService.getLogin();
    
    this.categorias = [];

    this.categoriaId = this.activatedRoute.snapshot.params['id'] | 0;

    if (this.categoriaId > 0) {
      this.formGroup = this.formBuilder.group({
        post: ['',Validators.compose([Validators.required])],
      });
    } else {
      this.categoriaService.get()
      .then((json: any) => {
          this.categorias = <Categoria[]>json;
  
          if (this.categorias.length < 0) {
            this.navController.navigateBack('/home');
            console.log("Erro ao carregar categorias");
            
          }
        });
        
        this.formGroup = this.formBuilder.group({
          post: ['',Validators.compose([Validators.required])],
          categoria: ['', Validators.compose([Validators.required])],
        });
    }


  }

  ngOnInit() {}

  salvar() {
    let comentario = new Comentario();
    comentario.post = this.formGroup.value.post;
    comentario.idCategoria = (this.categoriaId > 0 ? this.categoriaId : this.formGroup.value.categoria);
    comentario.usuario_idUsuario = this.usuario.idUsuario;

    this.comentarioService
      .save(comentario)
      .then((json: any) => {
        let coment = <Comentario>json;

        if (coment) {
          this.exibirMensagem('Registro salvo com sucesso!!!');
          this.navController.navigateBack((this.categoriaId > 0 ? '/home/' + this.categoriaId: '/home'));
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
