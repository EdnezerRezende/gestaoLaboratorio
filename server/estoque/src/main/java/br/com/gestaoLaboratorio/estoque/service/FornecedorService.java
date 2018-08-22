package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Fornecedor;
import br.com.gestaoLaboratorio.estoque.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    public List<Fornecedor> listaFornecedor() {

        List<Fornecedor> fornecedores = fornecedorRepository.findAllByAtivoIsTrue();

        return fornecedores;
    }

    public void salvarAtualizar(Fornecedor fornecedor) {
        fornecedor.setAtivo(true);
        fornecedorRepository.save(fornecedor);
    }

    public void excluirFornecedor(Long idFornecedor) {
        Fornecedor fornecedor = fornecedorRepository.findById(idFornecedor);
        fornecedor.setAtivo(false);
        fornecedorRepository.save(fornecedor);
    }
}
