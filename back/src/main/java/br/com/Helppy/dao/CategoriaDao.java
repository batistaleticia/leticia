/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.Helppy.dao;

import br.com.Helppy.model.Categoria;
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
@RegisterBeanMapper(Categoria.class)
public interface CategoriaDao {
    @GetGeneratedKeys
    @SqlUpdate("insert into categoria (nome) values (:nome)")
    int insert(@BindBean Categoria categoria);
    
    
    @SqlQuery("select * " +
            " from categoria " +
            " where id = :id;")
    Categoria get(@Bind("id") int id);

    
    @SqlQuery("select * " +
            " from categoria " +
            " order by nome;")
    List<Categoria> getAll();

    
    @SqlQuery("select * " +
            " from categoria " +
            " where nome like :nome " +
            " order by nome;")
    List<Categoria> getAllByName(@Bind("nome") String nome);


    @SqlUpdate("update categoria " +
            " set nome = :nome " +
            " where id = :id;")
    int update(@BindBean Categoria categoria);

    
    @SqlUpdate("delete " +
            " from categoria " +
            " where id = :id;")
    int delete(@Bind("id") int id);
}
