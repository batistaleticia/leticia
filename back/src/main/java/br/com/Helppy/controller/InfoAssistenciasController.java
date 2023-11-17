/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.controller;

import br.com.Helppy.model.InfoAssistenciais;
import br.com.Helppy.service.InfoAssistenciaisService;
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
@RequestMapping("/api/v1/infoassist")
@CrossOrigin("*")
public class InfoAssistenciasController {
    private final InfoAssistenciaisService infoService;
    
    public InfoAssistenciasController(InfoAssistenciaisService infoService){
        this.infoService = infoService;
    }
    
    @GetMapping({"/", ""})
    public List<InfoAssistenciais> consultarTodos(){
        List<InfoAssistenciais> infoAssistList = infoService.consultarTodos();
        return infoAssistList;
    }
    
    @GetMapping("/{id}")
    public InfoAssistenciais consultarInfo(@PathVariable("id") int id){
        InfoAssistenciais ret = infoService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public InfoAssistenciais inserir(@RequestBody InfoAssistenciais infoAssist){
        InfoAssistenciais ret = infoService.inserir(infoAssist);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public InfoAssistenciais alterar(@RequestBody InfoAssistenciais infoAssist){
        infoService.alterar(infoAssist);
        return infoAssist;
    }
    
    @DeleteMapping("/{id}")
    public InfoAssistenciais deletar(@PathVariable("id") int id){
        InfoAssistenciais infoAssist = infoService.consultarPorId(id);
        if (infoAssist == null){
            throw new RuntimeException("Nao existe informação com este id para ser excluido....");
        }
        infoService.excluir(id);
        return infoAssist;
    }
}
