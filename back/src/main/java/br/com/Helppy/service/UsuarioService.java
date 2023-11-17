/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.service;

import br.com.Helppy.dao.UsuarioDao;
import br.com.Helppy.model.Usuario;
import java.util.List;
import java.util.Random;

import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author criad
 */
@Service
public class UsuarioService {
    private final UsuarioDao usuarioDao;
    
    public UsuarioService(Jdbi jdbi){
        this.usuarioDao = jdbi.onDemand(UsuarioDao.class);
    }
    
    public Usuario inserir (Usuario usuario){
        int idUsuario = usuarioDao.insert(usuario);
        usuario.setIdUsuario(idUsuario);
        return usuario;
    }
    
    public List<Usuario> consultarTodos(){
        List<Usuario> usuarioList = usuarioDao.getAll();
        return usuarioList;
    }
    
    public Usuario consultarPorId(int id){
        Usuario usuario = usuarioDao.get(id);
        return usuario;
    }
    
    public void alterar(Usuario usuario){
        usuarioDao.update(usuario);
    }
    
    public void excluir(int id){
        usuarioDao.delete(id);
    }

    public Usuario getByEmail(String email) {
        return usuarioDao.getByEmail(email);
    }

    public String gerarSenhaAleatoria(){
        int length = 8;
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder senha = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(caracteres.length());
            senha.append(caracteres.charAt(index));
        }

        return senha.toString();
    } 
}
