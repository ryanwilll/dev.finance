const Modal = {
  toogleModal() {
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.classList.toggle("active");
    Form.limparCampos();
  },
};

const ArmazenamentoLocal = {
  pegarInfo() {
    return JSON.parse(localStorage.getItem("dev.finance:transacoes")) || [];
  },
  setarInfo(transacao) {
    localStorage.setItem("dev.finance:transacoes", JSON.stringify(transacao));
  },
};

const transacoes = [
  {
    descricao: "Água",
    valor: -10000,
    data: "30/01/2023",
  },
  {
    descricao: "Energia",
    valor: -10000,
    data: "27/01/2023",
  },
  {
    descricao: "Internet",
    valor: -10000,
    data: "24/01/2023",
  },
];

const transacao = {
  all: ArmazenamentoLocal.pegarInfo(),

  add(Transacao) {
    transacao.all.push(Transacao);
    App.recarregar();
  },

  remove(index) {
    transacao.all.splice(index, 1);
    App.recarregar();
  },
  entradas() {
    //Somar as entradas
    let entrada = 0;
    transacao.all.forEach((transacao) => {
      if (transacao.valor > 0) {
        entrada += transacao.valor;
      }
    });
    return entrada;
  },
  saidas() {
    //Somar as saidas
    let saida = 0;

    transacao.all.forEach((transacao) => {
      if (transacao.valor < 0) {
        saida += transacao.valor;
      }
    });
    return saida;
  },
  total() {
    return transacao.entradas() + transacao.saidas();
  },
};

const DOM = {
  transcaoesContainer: document.querySelector("#tabela-dados tbody"),

  addTransacao(transacoes, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransacao(transacoes, index);
    DOM.transcaoesContainer.appendChild(tr);
    tr.dataset.index = index;
  },

  innerHTMLTransacao(transacoes, index) {
    const CSSclass = transacoes.valor > 0 ? "entrada" : "saida";

    const valor = Utils.formatacaoMoeda(transacoes.valor);

    const html = `
        <tr>
        <td class="descricao">${transacoes.descricao}</td>
        <td class="${CSSclass}">${valor}</td>
        <td class="data">${transacoes.data}</td>
        <td class="remover"><a href="#">
                <img onclick="transacao.remove(${index})" src="./src/images/minus.svg" alt="Imagem para remover transação">
            </a>
        </td>
      </tr>
        `;
    return html;
  },

  atualizaBalanco() {
    (document.getElementById("entradasDisplay").innerHTML =
      Utils.formatacaoMoeda(transacao.entradas())),
      (document.getElementById("saidasDisplay").innerHTML =
        Utils.formatacaoMoeda(transacao.saidas())),
      (document.getElementById("total").innerHTML = Utils.formatacaoMoeda(
        transacao.total()
      ));
  },

  limparTransacoes() {
    DOM.transcaoesContainer.innerHTML = "";
  },
};

const Utils = {
  formatacaoMoeda(valor) {
    const sinal = Number(valor) < 0 ? "-" : "";

    valor = String(valor).replace(/\D/g, "");
    valor = Number(valor) / 100;
    valor = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return sinal + valor;
  },
  formatarValores(valor) {
    valor = Number(valor) * 100;

    return valor;
  },
  formatarData(data) {
    const SepararData = data.split("-");
    return `${SepararData[2]}/${SepararData[1]}/${SepararData[0]}`;
  },
};

const Form = {
  descricao: document.querySelector("input#descricao"),
  valor: document.querySelector("input#valor"),
  data: document.querySelector("input#data"),

  obterValores() {
    return {
      descricao: Form.descricao.value,
      valor: Form.valor.value,
      data: Form.data.value,
    };
  },
  validarCampos() {
    const { descricao, valor, data } = Form.obterValores();
    if (descricao.trim() === "" || valor.trim() === "" || data.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  formatarValores() {
    let { descricao, valor, data } = Form.obterValores();

    valor = Utils.formatarValores(valor);
    data = Utils.formatarData(data);

    return {
      descricao,
      valor,
      data,
    };
  },
  limparCampos() {
    Form.descricao.value = "";
    Form.valor.value = "";
    Form.data.value = "";
  },
  submit(event) {
    event.preventDefault();

    try {
      Form.validarCampos();
      const dadosFormatados = Form.formatarValores(transacao);
      transacao.add(dadosFormatados);
      Form.limparCampos();
      Modal.toogleModal();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  iniciar() {
    transacao.all.forEach((transacao, index) => {
      DOM.addTransacao(transacao, index);
    });

    DOM.atualizaBalanco();
    ArmazenamentoLocal.setarInfo(transacao.all);
  },
  recarregar() {
    DOM.limparTransacoes();
    App.iniciar();
  },
};

App.iniciar();
