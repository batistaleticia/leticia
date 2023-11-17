export class Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  senha: string;
  acesso: number;

  constructor() {
    this.idUsuario = 0;
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.acesso = 0;
  }
}
