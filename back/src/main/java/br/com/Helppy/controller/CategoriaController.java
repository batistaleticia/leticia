/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.controller;

import br.com.Helppy.model.Categoria;
import br.com.Helppy.service.CategoriaService;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author criad
 */
@RestController
@RequestMapping("/api/v1/categoria")
@CrossOrigin("*")
public class CategoriaController {
    private final CategoriaService categoriaService;
    
    public CategoriaController(CategoriaService categoriaService){
        this.categoriaService = categoriaService;
    }
    
    @GetMapping({"/", ""})
    public List<Categoria> consultarTodos(){
        List<Categoria> categoriaList = categoriaService.consultarTodos();
        return categoriaList;
    }
    
    @GetMapping("/{id}")
    public Categoria consultarCategoria(@PathVariable("id") int id){
        Categoria ret = categoriaService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Categoria inserir(@RequestBody Categoria categoria){
        Categoria ret = categoriaService.inserir(categoria);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Categoria alterar(@RequestBody Categoria categoria){
        Categoria ret = categoriaService.consultarPorId(categoria.getId());
        if (ret != null){
            categoriaService.alterar(categoria);
        }
        else{
            throw new RuntimeException("Nao existe categoria com este id para ser alterado....");

        }

        return categoria;
    }
    
    @DeleteMapping("/{id}")
    public Categoria deletar(@PathVariable("id") int id){
        Categoria categoria = categoriaService.consultarPorId(id);
        if (categoria == null){
            throw new RuntimeException("Nao existe categoria com este id para ser excluido....");
        }
        categoriaService.excluir(id);
        return categoria;
    }
}
