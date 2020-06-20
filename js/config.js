const moneyMask = "000.000.000.000.000,00";
const parseNumber = number => {
    number = number.toString()
    number = number.replace(/[.]/g, "")
    number = number.replace(/[,]/g, ".")
    return Number(number)
};
const formRules = {
    rules: {
        nome: "required",
        idade: {
            required: true,
            min: 1
        },
        rendaTributavel: "required",
        rendaIsenta: "required",
        ganho: "required",
        imoveis: "required",
        contrato: "required",
        operacoes: "required",
        atividade: "required",
        receitaAtividade: "required",
        valorTotalRural: "required",
        posse: "required",
        residente: "required",
    },
    messages: {
        nome: "Preencha este campo",
        idade: "Preencha este campo",
        rendaTributavel: "Preencha este campo",
        rendaIsenta: "Preencha este campo",
        ganho: "Preencha este campo",
        imoveis: "Preencha este campo",
        contrato: "Preencha este campo",
        operacoes: "Preencha este campo",
        atividade: "Preencha este campo",
        receitaAtividade: "Preencha este campo",
        valorTotalRural: "Preencha este campo",
        posse: "Preencha este campo",
        residente: "Preencha este campo",
    },
    errorPlacement: (error, element) => console.log(element[0].value) || error.appendTo(`.error-${element[0].id.split("-")[0]}`),
    submitHandler: calcular,
};
const resultsIds = [
    "ganho",
    "rurais",
    "bensEDireitos",
    "renda",
    "estrangeiro",
]
const inputs = [
    {
        seletor: "#nome",
        condition: () => false,
        text: "",
        questionInfo: "Nome",
    },
    {
        seletor: "#idade",
        condition: () => false,
        text: "",
        mask: "000",
        questionInfo: "Idade",
    },
    {
        seletor: "input[name='ganho']:checked",
        condition: (valor) => valor == 'sim',
        text: "<p>Teve ganho de capital e recebeu através de bens ou direitos.</p>",
        resultId: "ganho",
        questionInfo: "Ganho de Capital",
    },
    {
        seletor: "input[name='imoveis']:checked",
        condition: (valor) => valor == 'sim',
        text: false,
        questionInfo: "Vendeu Imoveis",
    },
    {
        seletor: "input[name='contrato']:checked",
        condition: (valor) => valor == 'sim',
        text: "<p>Ao vender imóveis residenciais, optou pela isenção do imposto de renda sobre o ganho de capital.</p>",
        resultId: "ganho",
        questionInfo: "Isenção de imposto no imovel",
    },
    {
        seletor: "input[name='operacoes']:checked",
        condition: (valor) => valor == 'sim',
        text: "<p>Fez operações na bolsa.</p>",
        resultId: "ganho",
        questionInfo: "Operações na bolsa",
    },
    {
        seletor: "input[name='atividade']:checked",
        condition: (valor) => valor == 'sim',
        text: false,
        questionInfo: "Atividade Rural",
    },
    {
        seletor: "#receitaAtividade",
        condition: (valor) => parseNumber(valor) >= 142798.50,
        text: "<p>Receita bruta no ano-calendário de 2019 em atividade rurais foi superior ou igual a R$ 142.798,50.</p>",
        mask: moneyMask,
        resultId: "rurais",
        questionInfo: "Receita bruta de atividade rurais",
    },
    {
        seletor: "#valorTotalRural",
        condition: (valor) => parseNumber(valor) >= 300000,
        text: "<p>Total de seus bens ou direitos são superiores ou iguais a R$ 300.000.</p>",
        mask: moneyMask,
        resultId: "bensEDireitos",
        questionInfo: "Bens ou Direitos",
    },
    {
        seletor: "#rendaIsenta",
        condition: (valor) => parseNumber(valor) >= 40000,
        text: "<p>A soma de rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte são superiores a R$ 40.000.</p>",
        mask: moneyMask,
        resultId: "renda",
        questionInfo: "Rendimentos Isentos",
    },
    {
        seletor: "#rendaTributavel",
        condition: (valor) => parseNumber(valor) >= 28559.70,
        text: "<p>A soma do seu rendimento tributável é superior ou igual a R$ 28.559,70.</p>",
        mask: moneyMask,
        resultId: "renda",
        questionInfo: "Rendimentos Tributável",
    },
    {
        seletor: "input[name='residente']:checked",
        condition: (valor) => valor == 'sim',
        text: "<p>Passou à condição de residente no Brasil em qualquer mês e nessa condição no ano calendário.</p>",
        resultId: "estrangeiro",
        questionInfo: "Estrangeiro residente no Brasil",
    },
];
const events = [
    {
        seletor: "#btn-calcular",
        event: "click",
        eventFunction: () => $("#form-imposto").validate(formRules),
        isRadio: false
    },
    {
        seletor: "input[name='atividade']",
        event: "click",
        onTrue: () => show(".receitaAtividade"),
        onFalse: () => hide(".receitaAtividade"),
        isRadio: true
    },
    {
        seletor: "input[name='imoveis']",
        event: "click",
        onTrue: () => show(".contrato"),
        onFalse: () => hide(".contrato"),
        isRadio: true
    },
    {
        seletor: ".print",
        event: "click",
        eventFunction: () => {
            [
                ".print",
                ".reload",
                "#title",
            ].map(selector => hide(selector));
            window.print();
            [
                ".print",
                ".reload",
                "#title",
            ].map(selector => show(selector));
        },
    },
    {
        seletor: ".reload",
        event: "click",
        eventFunction: () => {
            window.location.reload();
        },
    },
];
const hide = selector => $(selector).hide();
const show = selector => $(selector).show();
const showName = () => {
    const name = $("#nome")[0].value;
    Array.from(document.querySelectorAll(".name")).map(element => element.textContent = name);
}
const printReasonsToDeclare = reason => reason?.text && $("#" + reason.resultId).append(`${reason.text}`);
const removeUnusedReasonsTopics = topicId => ($("#" + topicId)[0].children.length <= 1) && hide("#" + topicId);
const showUserData = () => {
    const dadosTabela = $(".dados-tabela");
    inputs
        .map(input => {
            const value = $(input.seletor)?.[0]?.value;
            if (!value) return;
            dadosTabela.append(`
                <div>
                    <div>
                        <p>${input.questionInfo}</p>
                    </div>
                    <div>
                        <p>${value}</p>
                    </div>
                </div>
            `)
        })
        .filter(input => input);
}
const setEvents = () => events
    .map(event => $(event.seletor)
        .on(event.event,
            e => {
                if (!event.isRadio) return event.eventFunction(e);
                if (e.target.id.match("sim")) return event.onTrue(e)
                event.onFalse(e)
            })
    )
const setMasks = () => inputs
    .filter(input => input.mask)
    .map(input => {
        $(input.seletor)
            .mask(input.mask, {
                reverse: true,
            })
    })
const setDate = () => {
    const [, , year] = new Intl.DateTimeFormat("pt-br").format(new Date()).split("/");
    $("#date")[0].textContent = year;
}

const getReasonsToDeclare = () => inputs
    .map(input => {
        const value = $(input.seletor)?.[0]?.value
        if (input.condition(value)) return input
    })
    .filter(input => input);