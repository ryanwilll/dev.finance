const modalOverlay = document.querySelector('.modal-overlay');

const Modal = {
    
    toogleModal(){
        modalOverlay.classList.toggle("active");
    }
}

const transacoes = [
    {
        id: 1,
        descricao: "Água",
        valor: -10000,
        data: '30/01/2023',
    },
    {
        id: 2,
        descricao: "Energia",
        valor: -10000,
        data: '27/01/2023',
    },
    {
        id: 3,
        descricao: "Internet",
        valor: -10000,
        data: '24/01/2023',
    },
    {
        id: 4,
        descricao: "Alimentação",
        valor: -100000,
        data: '24/01/2023',
    },
    {
        id: 5,
        descricao: "Salario",
        valor: 145000,
        data: '23/01/2023',
    },
    {
        id: 6,
        descricao: "Aplicativo",
        valor: 1000000,
        data: '31/01/2023',
    }
]

const transacao = { 
    entradas() {
        //Somar as entradas
        let entrada = 0;

        transacoes.forEach(transacao => {
            if (transacao.valor > 0) {
                entrada += transacao.valor
            }
        })
        return entrada

    },
    saidas() {
        //Somar as saidas
        let saida = 0;

        transacoes.forEach(transacao => {
            if (transacao.valor < 0) {
                saida += transacao.valor
            }
        })
        return saida

    },
    total() {
        return transacao.entradas() + transacao.saidas();
    }
}

const DOM = {
    transcaoesContainer: document.querySelector('#tabela-dados tbody'),

    addTransacao(transacoes, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransacao(transacoes) 
        DOM.transcaoesContainer.appendChild(tr)
    },

    innerHTMLTransacao(transacoes){

        const CSSclass = transacoes.valor > 0 ? "entrada" : "saida"

        const valor = Utils.formatacaoMoeda(transacoes.valor)

        const html = `
        <tr>
        <td class="descricao">${transacoes.descricao}</td>
        <td class="${CSSclass}">${valor}</td>
        <td class="data">${transacoes.data}</td>
        <td class="remover"><a href="#">
                <img src="./src/images/minus.svg" alt="Imagem para remover transação">
            </a>
        </td>
      </tr>
        `
        return html
    },

    atualizaBalanco() {
        document.getElementById("entradasDisplay").innerHTML = Utils.formatacaoMoeda(transacao.entradas()),
        document.getElementById("saidasDisplay").innerHTML = Utils.formatacaoMoeda(transacao.saidas()),
        document.getElementById("total").innerHTML = Utils.formatacaoMoeda(transacao.total())
    }
}

const Utils = {
     formatacaoMoeda(valor){
        const sinal = Number(valor) < 0 ? "-" : ""

        valor = String(valor).replace(/\D/g, "")
        valor = Number(valor) / 100
        valor = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return sinal + valor
     }
}

transacoes.forEach((transacao) => {
    DOM.addTransacao(transacao)
});

DOM.atualizaBalanco()