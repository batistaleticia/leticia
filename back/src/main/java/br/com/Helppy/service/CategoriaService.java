/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.service;

import br.com.Helppy.dao.CategoriaDao;
import br.com.Helppy.model.Categoria;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author criad
 */
@Service
public class CategoriaService {
    private final CategoriaDao categoriaDao; 
    
    public CategoriaService(Jdbi jdbi){
        this.categoriaDao = jdbi.onDemand(CategoriaDao.class);
    }
    
    public Categoria inserir (Categoria categoria){
        int idCategoria = categoriaDao.insert(categoria);
        categoria.setId(idCategoria);
        return categoria;
    }
    
    public List<Categoria> consultarTodos(){
        List<Categoria> categoriaList = categoriaDao.getAll();
        
        return categoriaList;
    }
    
    public Categoria consultarPorId(int id){
        Categoria categoria = categoriaDao.get(id);
        return categoria;
    }
    
    public void alterar(Categoria aluno){
        categoriaDao.update(aluno);
    }
    
    public void excluir(int id){
        categoriaDao.delete(id);
    }
}
