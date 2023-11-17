/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.service;

import br.com.Helppy.dao.ComentarioDao;
import br.com.Helppy.model.Comentario;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author criad
 */
@Service
public class ComentarioService {
    private final ComentarioDao comentarioDao;
    
    public ComentarioService(Jdbi jdbi){
        this.comentarioDao = jdbi.onDemand(ComentarioDao.class);
    }
    
    public Comentario inserir (Comentario comentario){
        int idComentario = comentarioDao.insert(comentario);
        comentario.setIdComentario(idComentario);
        return comentario;
    }
    
    public List<Comentario> consultarTodos(){
        List<Comentario> comentarioList = comentarioDao.getAll();
        return comentarioList;
    }
    
    public Comentario consultarPorId(int id){
        Comentario comentario = comentarioDao.get(id);
        return comentario;
    }
    
    public List<Comentario> consultarTodosPorIdCategoria(int id){
        List<Comentario> comentarioList = comentarioDao.getAllByIdCategoria(id);
        return comentarioList;
    }
    
    public void alterar(Comentario comentario){
        comentarioDao.update(comentario);
    }
    
    public void excluir(int id){
        comentarioDao.delete(id);
    }
}
