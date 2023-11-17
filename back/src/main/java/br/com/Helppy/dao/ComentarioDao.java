/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.Helppy.dao;

import br.com.Helppy.model.Comentario;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

/**
 *
 * @author criad
 */
@RegisterBeanMapper(Comentario.class)
public interface ComentarioDao {
    @GetGeneratedKeys
    @SqlUpdate("insert into Comentario (post, data, quantidadeDenuncias, idCategoria, usuario_idUsuario) values (:post, :data, :quantidadeDenuncias, :idCategoria, :usuario_idUsuario)")
    int insert(@BindBean Comentario comentario);
    
    
    @SqlQuery("select * " +
            " from Comentario " +
            " where idComentario = :idComentario;")
    Comentario get(@Bind("idComentario") int id);

    
    @SqlQuery("select * " +
            " from Comentario " +
            " order by data DESC;")
    List<Comentario> getAll();
    
    @SqlQuery("select * " +
            " from Comentario " +
            " where idCategoria like :idCategoria order by data DESC;")
    List<Comentario> getAllByIdCategoria(@Bind("idCategoria") int id);


    @SqlUpdate("update Comentario " +
            " set post = :post," +
            " data = :data," +
            " quantidadeDenuncias = :quantidadeDenuncias," +
            " idCategoria = :idCategoria," +
            " usuario_idUsuario = :usuario_idUsuario" +

            " where idComentario = :idComentario;")
    int update(@BindBean Comentario comentario);

    
    @SqlUpdate("delete " +
            " from Comentario " +
            " where idComentario = :idComentario;")
    int delete(@Bind("idComentario") int idComentario);
}
