package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemEstoqueRepository extends JpaRepository<ItemEstoque, String> {

//    @Async
//    @Query(value = "Select count(estoque.produto) as quantidadeTotal, produto.codigoProduto as codigo, produto.nome as nome from ItemEstoque estoque left join Produto produto on produto = estoque.produto group by produto.codigoProduto, produto.nome order by produto.nome")
//    List<ItemEstoque> totalEstoque();

    @Async
    @Query(value = "Select new br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO( produto.codigoProduto, produto.nome, count(estoque.produto), produto.qtdMinimaEstoque) from  Produto produto  left join ItemEstoque estoque on estoque.produto = produto where estoque.dataSaida = null group by produto.codigoProduto, produto.nome, produto.qtdMinimaEstoque order by produto.nome")
    List<EstoqueDTO> totalEstoque();

    @Override
    List<ItemEstoque> findAll();

    ItemEstoque findById(Long idItemEstoque);

    List<ItemEstoque> findAllByDataSaidaNullAndAtivoIsTrue();

}
