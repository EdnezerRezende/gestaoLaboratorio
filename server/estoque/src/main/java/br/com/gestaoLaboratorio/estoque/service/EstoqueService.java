package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.repository.ItemEstoqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class EstoqueService {


    @Autowired
    private ItemEstoqueRepository itemEstoqueRepository;

    public List<ItemEstoque> obterEstoqueGeral() {

        List<ItemEstoque> itensEstoque = itemEstoqueRepository.findAllByDataSaidaNull();

        return itensEstoque;
    }

    public void salvarAtualizar(ItemEstoque itemEstoque) {
        Boolean itemEstoqueAtingido = itemEstoqueRepository.queryByQtdUtilizadoEqualsAndProdutoQtdMaximoUtilizacao(itemEstoque);
        if (itemEstoqueAtingido) {
            itemEstoque.setDataSaida(LocalDate.now());
        }
        
        itemEstoqueRepository.save(itemEstoque);
    }

    public String excluirItemEstoque(Long idItemEstoque) {
        ItemEstoque itemEstoque = new ItemEstoque();
        itemEstoque.setId(idItemEstoque);
        itemEstoqueRepository.delete(itemEstoque);
        return "Excluído com sucesso";
    }

}
