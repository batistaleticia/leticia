/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.controller;

import br.com.Helppy.model.Usuario;
import br.com.Helppy.service.EmailService;
import br.com.Helppy.service.UsuarioService;
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
@RequestMapping("/api/v1/usuario")
@CrossOrigin("*")

public class UsuarioController {
    private final UsuarioService usuarioService;
    private final EmailService emailService;
    
    public UsuarioController(UsuarioService usuarioService, EmailService emailService){
        this.usuarioService = usuarioService;
        this.emailService = emailService;
    }
    
    @GetMapping({"/", ""})
    public List<Usuario> consultarTodos(){
        List<Usuario> usuarioList = usuarioService.consultarTodos();
        return usuarioList;
    }

    @GetMapping("email/{email}")
    public Usuario getByEmail(@PathVariable("email") String email) {
        Usuario ret = usuarioService.getByEmail(email);
        return ret;
    }
    
    @GetMapping("/{id}")
    public Usuario consultarUsuario(@PathVariable("id") int id){
        Usuario ret = usuarioService.consultarPorId(id);
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Usuario inserir(@RequestBody Usuario usuario){
        Usuario ret = usuarioService.inserir(usuario);
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Usuario alterar(@RequestBody Usuario usuario){
        usuarioService.alterar(usuario);
        return usuario;
    }
    
    @DeleteMapping("/{idUsuario}")
    public Usuario deletar(@PathVariable("idUsuario") int idUsuario){
        Usuario usuario = usuarioService.consultarPorId(idUsuario);
        if (usuario == null){
            throw new RuntimeException("Nao existe usuario com este id para ser excluido....");
        }
        usuarioService.excluir(idUsuario);
        return usuario;
    }

    @GetMapping("/{email}/{senha}/authenticate")
    public int authenticate(@PathVariable("email") String email, @PathVariable("senha") String senha) {
        Usuario usuario = usuarioService.getByEmail(email);
        
        
        if (usuario != null && usuario.getEmail().equals(email) && usuario.getSenha().equals(senha)) {
            return 200;
        } else{
            System.out.println(usuario.getEmail() +" == "+ email + " / "+ usuario.getSenha()+ " == "+ senha);

            return 401;
        }
    }

    @GetMapping("/{email}/recuperar")
    public int recuperar(@PathVariable("email") String email) {
        Usuario usuario = usuarioService.getByEmail(email);
        
        if (usuario != null && usuario.getEmail().equals(email)) {
            usuario.setSenha(usuarioService.gerarSenhaAleatoria()); 
            usuarioService.alterar(usuario);
            //enviar email
            String content = "Helppy \n Sua nova senha é: " + usuario.getSenha() + "\n\n Sugerimos que redefina sua senha no próximo login!"; 

            emailService.sendSimpleMessage(email, "Helppy - Recuperação de conta", content);
            return 200;
        } else{
            System.out.println(usuario.getEmail() +" == "+ email);

            return 401;
        }
    }
}
