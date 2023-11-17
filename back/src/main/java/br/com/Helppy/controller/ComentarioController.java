/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.controller;

import br.com.Helppy.model.Comentario;
import br.com.Helppy.service.ComentarioService;
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
@RequestMapping("/api/v1/comentario")
@CrossOrigin("*")
public class ComentarioController {
    private final ComentarioService comentarioService;
    
    public ComentarioController(ComentarioService comentarioService){
        this.comentarioService = comentarioService;
    }
    
    @GetMapping({"/{id}/categoria"})
    public List<Comentario> consultarTodosPorIdCategoria(@PathVariable("id") int id){
        List<Comentario> comentarios = comentarioService.consultarTodosPorIdCategoria(id);
        return comentarios;
    }
    @GetMapping({"/", ""})
    public List<Comentario> consultarTodos(){
        List<Comentario> comentarios = comentarioService.consultarTodos();
        return comentarios;
    }
    
    @GetMapping("/{id}")
    public Comentario consultarInfo(@PathVariable("id") int id){
        Comentario ret = comentarioService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Comentario inserir(@RequestBody Comentario comentario){
        Comentario ret = comentarioService.inserir(comentario);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Comentario alterar(@RequestBody Comentario comentario){
        comentarioService.alterar(comentario);
        return comentario;
    }
    
    @DeleteMapping("/{id}")
    public Comentario deletar(@PathVariable("id") int id){
        Comentario comentario = comentarioService.consultarPorId(id);
        if (comentario == null){
            throw new RuntimeException("Nao existe informação com este id para ser excluido....");
        }
        comentarioService.excluir(id);
        return comentario;
    }
}
