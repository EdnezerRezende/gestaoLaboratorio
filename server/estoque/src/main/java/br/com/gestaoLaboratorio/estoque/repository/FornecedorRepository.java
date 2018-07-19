package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, String> {

    List<Fornecedor> findAllByAtivoIsTrue();

}
