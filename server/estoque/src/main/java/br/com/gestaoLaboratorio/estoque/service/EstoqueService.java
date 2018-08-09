package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.repository.ItemEstoqueRepository;
import br.com.gestaoLaboratorio.estoque.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
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
        for (ItemEstoque item : itensEstoque) {
            item.setDataPedido(item.getDataPedido());
        }
        return itensEstoque;
    }

    public void salvarAtualizar(ItemEstoque itemEstoque) {

        if (itemEstoque.getId() == null) {
            itemEstoque.setQtdUtilizado(0L);
            itemEstoque.setAtivo(true);
            itemEstoque.setDataCadastro(LocalDate.now());
        } else {
            itemEstoque.setQtdUtilizado(itemEstoque.getQtdUtilizado() + 1);
            itemEstoque.setDataSaida(LocalDate.now());
            itemEstoque.setAtivo(false);
        }

        itemEstoqueRepository.save(itemEstoque);

    }

    public void excluirItemEstoque(Long idItemEstoque) {
        ItemEstoque itemEstoque = itemEstoqueRepository.findById(idItemEstoque);
        itemEstoque.setAtivo(false);
        itemEstoque.setDataSaida(LocalDate.now());
        itemEstoqueRepository.save(itemEstoque);
    }

    public List<EstoqueDTO> obterTotalEstoque() {
        List<EstoqueDTO> listaEstoque = itemEstoqueRepository.totalEstoque();

        return listaEstoque;
    }

    public List<Produto> obteListaPedidos() {
        List<EstoqueDTO> listaEstoque = itemEstoqueRepository.totalEstoque();

        return getProdutosPedidos(listaEstoque, false);
    }

    public List<Produto> getProdutosPedidos(List<EstoqueDTO> listaEstoque, boolean altera) {
        List<Produto> produtos = new ArrayList<>();

        for (EstoqueDTO p : listaEstoque) {
            if (p.getQtdMinimaEstoque() >= p.getQuantidadeTotal()) {
                Produto produto = produtoRepository.findByCodigoProdutoAndSolicitadoIsFalse(p.getCodigo());
                if (produto != null) {
                    if (altera) {
                        produto.setQtdSolicitado(p.getQtdMinimaEstoque() - p.getQuantidadeTotal());
                        produto.setSolicitado(true);
                    }
                    produtos.add(produto);
                }

            }
        }

        return produtos;
    }

}
