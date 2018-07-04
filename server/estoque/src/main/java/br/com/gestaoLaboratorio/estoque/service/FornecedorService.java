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

    public List<Fornecedor> listaFornecedor(){

        List<Fornecedor> fornecedores = fornecedorRepository.findAll();

        return fornecedores;
    }

    public void salvarAtualizar(Fornecedor fornecedor) {
        fornecedorRepository.save(fornecedor);
    }

    public String excluirFornecedor(Long idFornecedor) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setId(idFornecedor);
        fornecedorRepository.delete(fornecedor);
        return "Excluído com sucesso";
    }
}
