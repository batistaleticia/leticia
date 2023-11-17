/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.Helppy.service;

import br.com.Helppy.dao.InfoAssistenciaisDao;
import br.com.Helppy.model.InfoAssistenciais;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author criad
 */
@Service
public class InfoAssistenciaisService {
    private final InfoAssistenciaisDao infoAssistDao;
    
    public InfoAssistenciaisService(Jdbi jdbi){
        this.infoAssistDao = jdbi.onDemand(InfoAssistenciaisDao.class);
    }
    
    public InfoAssistenciais inserir (InfoAssistenciais infoAssist){
        int idInfoAssist = infoAssistDao.insert(infoAssist);
        infoAssist.setId(idInfoAssist);
        return infoAssist;
    }
    
    public List<InfoAssistenciais> consultarTodos(){
        List<InfoAssistenciais> infoAssistList = infoAssistDao.getAll();
        return infoAssistList;
    }
    
    public InfoAssistenciais consultarPorId(int id){
        InfoAssistenciais infoAssist = infoAssistDao.get(id);
        return infoAssist;
    }
    
    public void alterar(InfoAssistenciais infoAssist){
        infoAssistDao.update(infoAssist);
    }
    
    public void excluir(int id){
        infoAssistDao.delete(id);
    }
}
