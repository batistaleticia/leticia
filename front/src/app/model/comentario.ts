export class Comentario {
    idComentario: number;
    post: string;
    data: Date;
    quantidadeDenuncias: number;
    idCategoria: number;
    usuario_idUsuario: number;


    constructor(){
        this.idComentario = 0;
        this.post = "";
        this.data = new Date();
        this.quantidadeDenuncias = 0;
        this.idCategoria = 0;
        this.usuario_idUsuario = 0;
    }






}
