/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.Helppy.dao;

import br.com.Helppy.model.InfoAssistenciais;
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
@RegisterBeanMapper(InfoAssistenciais.class)
public interface InfoAssistenciaisDao {
    @GetGeneratedKeys
    @SqlUpdate("insert into infoassistenciais (info) values (:info)")
    int insert(@BindBean InfoAssistenciais infoassistenciais);
    
    
    @SqlQuery("select * " +
            " from infoassistenciais " +
            " where id = :id;")
    InfoAssistenciais get(@Bind("id") int id);

    
    @SqlQuery("select * " +
            " from infoassistenciais " +
            " order by info;")
    List<InfoAssistenciais> getAll();

    
    @SqlQuery("select * " +
            " from infoassistenciais " +
            " where info like :info " +
            " order by info;")
    List<InfoAssistenciais> getAllByName(@Bind("info") String info);


    @SqlUpdate("update infoassistenciais " +
            " set info = :info " +
            " where id = :id;")
    int update(@BindBean InfoAssistenciais infoassistenciais);

    
    @SqlUpdate("delete " +
            " from infoassistenciais " +
            " where id = :id;")
    int delete(@Bind("id") int id);
}
