package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Pedidos;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.repository.PedidosRepository;
import br.com.gestaoLaboratorio.estoque.util.Datas;
import com.lowagie.text.pdf.PdfWriter;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PedidosService {

    @Autowired
    private PedidosRepository pedidosRepository;

    @Autowired
    private EstoqueService estoqueService;

    public void gerarRelatorioPedidos() throws JRException, FileNotFoundException {
        JasperCompileManager.compileReportToFile("src//main//java//br//com//gestaoLaboratorio//estoque//relatorios//pedidos//Pedidos_A_Solicitar.jrxml");

        LocalDate hoje = Datas.obterDataAtualyyyyMMdd();

        List<Produto> listaProdutos = obterProdutosASerPedidos(hoje, true, true);

        Map<String, Object> params = new HashMap<>();

        File reportFile = new File("src//main//java//br//com//gestaoLaboratorio//estoque//relatorios//pedidos//Pedidos_A_Solicitar.jasper");
        FileInputStream fin = new FileInputStream(reportFile);
        JRDataSource ds = new JRBeanCollectionDataSource(listaProdutos);

        JasperPrint print = JasperFillManager.fillReport(fin, params, ds);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setExporterInput(new SimpleExporterInput(print));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput("src//main//java//br//com//gestaoLaboratorio//estoque//relatorios//pedidos_" + hoje + ".pdf"));

        SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
        configuration.setPermissions(PdfWriter.ALLOW_COPY | PdfWriter.ALLOW_PRINTING);
        exporter.setConfiguration(configuration);
        exporter.exportReport();

    }

    public List<Produto> obterProdutosASerPedidos(LocalDate hoje, boolean salvar, boolean alteraProduto) {
        List<EstoqueDTO> listaEstoque = pedidosRepository.totalEstoque();
        List<Produto> listaProdutos = estoqueService.getProdutosPedidos(listaEstoque, alteraProduto);
        if (salvar) {
            Pedidos pedido = new Pedidos();
            pedido.setProduto(listaProdutos);
            pedido.setDataPedido(hoje);
            pedidosRepository.save(pedido);
        }
        return listaProdutos;
    }

}
