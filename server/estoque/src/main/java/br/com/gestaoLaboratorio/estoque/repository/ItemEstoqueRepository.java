package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemEstoqueRepository extends JpaRepository<ItemEstoque, String> {

    @Override
    List<ItemEstoque> findAll();

    List<ItemEstoque> findAllByDataSaidaNull();

    Boolean queryByQtdUtilizadoEqualsAndProdutoQtdMaximoUtilizacao(ItemEstoque itemEstoque);
}
