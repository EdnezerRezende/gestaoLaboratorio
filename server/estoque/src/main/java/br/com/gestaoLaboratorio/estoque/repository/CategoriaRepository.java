package br.com.gestaoLaboratorio.estoque.repository;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
