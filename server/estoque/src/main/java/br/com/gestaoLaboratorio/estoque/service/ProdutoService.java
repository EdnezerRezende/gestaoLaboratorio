package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.repository.ItemEstoqueRepository;
import br.com.gestaoLaboratorio.estoque.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public void salvar(Produto produto){
        Boolean existeProduto = produtoRepository.existsByCodigoProdutoAndCategoria(produto);
        if ( existeProduto ){
            throw new RuntimeException("Já existe o produto informado!");
        }else{
            produtoRepository.save(produto);
        }

    }
}
