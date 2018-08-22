package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Pedidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidosRepository extends JpaRepository<Pedidos, Long> {

    @Async
    @Query(value = "Select distinct new br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO( produto.codigoProduto, produto.nome, count(estoque.id), produto.qtdMinimaEstoque) " +
            "from  Produto produto  " +
            "left join ItemEstoque estoque on estoque.produto = produto " +
            "where produto.qtdMinimaEstoque >= (select count(estoque2.id) " +
            "                                           from ItemEstoque estoque2 " +
            "                                           where estoque2.produto = produto ) " +
            " and produto.solicitado = false " +
            "group by produto.codigoProduto, produto.nome, produto.qtdMinimaEstoque, estoque.id " +
            "order by produto.nome")
    List<EstoqueDTO> totalEstoque();
}
