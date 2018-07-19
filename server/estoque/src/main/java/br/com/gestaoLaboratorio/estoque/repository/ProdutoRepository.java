package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, String> {

    List<Produto> findAllByAtivoIsTrue();

    Boolean existsByAtivoIsTrueAndCodigoProdutoAndNome(String codigoProduto, String nome);

}
