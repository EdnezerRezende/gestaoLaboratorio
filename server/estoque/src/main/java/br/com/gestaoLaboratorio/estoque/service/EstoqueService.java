package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.repository.ItemEstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class EstoqueService {


    @Autowired
    private ItemEstoqueRepository itemEstoqueRepository;

    public List<ItemEstoque> obterEstoqueGeral(){

        List<ItemEstoque> itensEstoque = itemEstoqueRepository.findAll();

        return itensEstoque;
    }

    public void salvarAtualizar(ItemEstoque itemEstoque) {
        itemEstoqueRepository.save(itemEstoque);
    }

    public String excluirItemEstoque(Long idItemEstoque) {
        ItemEstoque itemEstoque = new ItemEstoque();
        itemEstoque.setId(idItemEstoque);
        itemEstoqueRepository.delete(itemEstoque);
        return "Excluído com sucesso";
    }

}
