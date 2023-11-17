/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.Helppy.dao;

import br.com.Helppy.model.Usuario;
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
@RegisterBeanMapper(Usuario.class)
public interface UsuarioDao {
        @GetGeneratedKeys
        @SqlUpdate("insert into usuario (nome, email, senha, acesso) values (:nome, :email, :senha, :acesso)")
        int insert(@BindBean Usuario usuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        Usuario get(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " order by nome;")
        List<Usuario> getAll();

        @SqlQuery("select * " +
                        " from usuario " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Usuario> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update usuario " +
                        " set nome = :nome, " +
                        "     email = :email, " +
                        "     senha = :senha, " +
                        "     acesso = :acesso " +
                        " where idUsuario = :idUsuario;")
        int update(@BindBean Usuario usuario);

        @SqlUpdate("delete " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        int delete(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where email like :email;")
        Usuario getByEmail(@Bind("email") String email);
}
