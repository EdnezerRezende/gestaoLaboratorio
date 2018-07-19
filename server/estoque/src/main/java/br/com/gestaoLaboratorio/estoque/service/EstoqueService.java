package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.repository.ItemEstoqueRepository;
import br.com.gestaoLaboratorio.estoque.repository.ProdutoRepository;
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

    @Autowired
    private ProdutoRepository produtoRepository;


    public List<ItemEstoque> obterEstoqueGeral() {

        List<ItemEstoque> itensEstoque = itemEstoqueRepository.findAllByDataSaidaNullAndAtivoIsTrue();

        return itensEstoque;
    }

    public void salvarAtualizar(ItemEstoque itemEstoque) {
        Boolean itemEstoqueAtingido = false;

        if (itemEstoque.getId() == null) {
            itemEstoque.setQtdUtilizado(0L);
            itemEstoque.setAtivo(true);
            itemEstoque.setDataCadastro(LocalDate.now());
        } else {
            if (itemEstoque.getQtdUtilizado() >= itemEstoque.getProduto().getQtdMaximoUtilizacao()) {
                itemEstoqueAtingido = true;
            }
        }

        if (itemEstoqueAtingido) {
            itemEstoque.setDataSaida(LocalDate.now());
            itemEstoque.setAtivo(false);
        }

        itemEstoqueRepository.save(itemEstoque);
    }

    public String excluirItemEstoque(Long idItemEstoque) {
        ItemEstoque itemEstoque = new ItemEstoque();
        itemEstoque.setId(idItemEstoque);
        itemEstoque.setAtivo(false);
        itemEstoque.setDataSaida(LocalDate.now());
        itemEstoqueRepository.save(itemEstoque);
        return "Excluído com sucesso";
    }

    public List<EstoqueDTO> obterTotalEstoque() {
        List<EstoqueDTO> listaEstoque = itemEstoqueRepository.totalEstoque();

        return listaEstoque;
    }

}
