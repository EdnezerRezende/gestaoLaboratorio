package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProdutoService {


    @Autowired
    private ProdutoRepository produtoRepository;

    public void salvar(Produto produto) {
        Boolean existeProduto = produtoRepository.existsByAtivoIsTrueAndCodigoProdutoAndNome(produto.getCodigoProduto(), produto.getNome());
        if (existeProduto) {
            throw new RuntimeException("Já existe o produto informado!");
        } else {
            produto.setAtivo(true);
            produtoRepository.save(produto);
        }
    }

    public List<Produto> listaProdutos() {

        List<Produto> produtos = produtoRepository.findAllByAtivoIsTrue();

        return produtos;
    }

    public String excluirProduto(Long idProduto) {
        Produto produto = new Produto();
        produto.setId(idProduto);
        produto.setAtivo(false);
        produtoRepository.save(produto);
        return "Excluído com sucesso";
    }
}
