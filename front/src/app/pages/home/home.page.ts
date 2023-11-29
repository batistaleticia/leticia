import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { Comentario } from 'src/app/model/comentario';
import { Usuario } from 'src/app/model/usuario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ComentarioService } from 'src/app/service/comentario.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: Usuario;
  comentUsers: Usuario[];
  comentarios: Comentario[];
  categoriaId: number;
  tituloPage: string;
  categoria: Categoria;
  categoriaList: Categoria[];

  constructor(
    private navController: NavController,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private toastController: ToastController
  ) {
    this.usuario = UsuarioService.getLogin();

    this.tituloPage = 'Geral';
    this.comentUsers = [];
    this.comentarios = [];
    this.categoriaId = this.activatedRoute.snapshot.params['categoriaId'] | 0;

    this.categoria = new Categoria();
    this.categoriaService.getById(this.categoriaId).then((json: any) => {
      this.categoria = <Categoria>json;
      if (this.categoria != null) {
        this.tituloPage = this.categoria.nome;
      } else {
        this.navController.navigateBack('/home');
      }
    });

    this.categoriaList = [];
    this.categoriaService.get().then((json: any) => {
      this.categoriaList = <Categoria[]>json;
    });
  }

  ngOnInit() {
    if (UsuarioService.getLogin() === null) {
      alert('A sessão foi encerrada, faça login para continuar usando o APP!');
      window.open('/login', '_self');
    }
  }

  ionViewWillEnter() {
    this.carregarListagem();
  }

  ionViewDidLeave(){
    window.location.reload();
  }

  logout() {
    UsuarioService.logout();
    this.navController.navigateBack('/login');
  }

  getUsuarioNomeById(id: number) {
    let nome = 'random';
    this.comentUsers.forEach((user) => {
      if (user.idUsuario == id) {
        nome = user.nome;
      }
    });

    return nome;
  }

  carregarListagem() {
    if (this.categoriaId > 0) {
      this.comentarioService.getByIdCategoria(this.categoriaId).then((json) => {
        this.comentarios = <Comentario[]>json;
        this.carregarNomes();
      });
    } else {
      this.comentarioService.get().then((json: any) => {
        this.comentarios = <Comentario[]>json;
        this.carregarNomes();
      });
    }

    console.log(this.comentarios);
  }

  carregarNomes() {
    this.comentarios.forEach((coment) => {
      this.usuarioService
        .getById(coment.usuario_idUsuario)
        .then((json: any) => {
          let usuario = <Usuario>json;
          this.comentUsers.push(usuario);
        });
    });
  }

  denunciarComentario(comentarioId: number) {
    if (
      !this.comentarioService.checkHasDenuncia(
        comentarioId,
        this.usuario.idUsuario
      )
    ) {
      this.comentarioService.getById(comentarioId).then((json: any) => {
        let comentario = <Comentario>json;
        comentario.quantidadeDenuncias++;

        this.comentarioService.save(comentario).then((_) => {
          this.comentarioService.saveDenuncia(
            comentario.idComentario,
            this.usuario.idUsuario
          );

          this.showMessage('Reportado com sucesso!');

          if (comentario.quantidadeDenuncias >= 3) {
            console.log(comentario.quantidadeDenuncias);

            this.removerComentario(comentarioId);
          }
          window.location.reload();
        });
      });
    } else {
      this.showMessage('É permitido reportar apenas 1 vez!');
    }
  }

  removerComentario(comentarioId: number) {
    this.comentarioService.delete(comentarioId).then((_) => {
      this.showMessage('Comentário removido!');
    });
  }

  async showMessage(str: string) {
    const toast = await this.toastController.create({
      message: str,
      duration: 1500,
    });
    toast.present();
  }

  getNomeCategoria(id: number) {
    let categoria = this.categoriaList.find((item) => item.id === id);

    return categoria?.nome || '';
  }
}
