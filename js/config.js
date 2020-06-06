const formRules = {
    rules: {
        idade: "required",
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
    errorPlacement: (error, element) => error.appendTo(`.error-${element[0].id.split("-")[0]}`),
    submitHandler: calcular,
}
const inputs = [
    {
        seletor: "input[name='ganho']:checked",
        condition: (valor) => valor == 'sim',
        text: "Teve ganho de capital e recebeu através de bens ou direitos"
    },
    {
        seletor: "input[name='imoveis']:checked",
        condition: (valor) => valor == 'sim',
        text: false
    },
    {
        seletor: "input[name='contrato']:checked",
        condition: (valor) => valor == 'sim',
        text: "Ao vender imóveis residenciais, optou pela isenção do imposto de renda sobre o ganho de capital"
    },
    {
        seletor: "input[name='operacoes']:checked",
        condition: (valor) => valor == 'sim',
        text: "Fez operações na bolsa"
    },
    {
        seletor: "input[name='atividade']:checked",
        condition: (valor) => valor == 'sim',
        text: false
    },
    {
        seletor: "#receitaAtividade",
        condition: (valor) => valor >= 142798.50,
        text: "Receita bruta no ano-calendário de 2019 em atividade rurais foi superior ou igual a 142.798,50 reais"
    },
    {
        seletor: "#valorTotalRural",
        condition: (valor) => valor >= 300000,
        text: "Total de seus bens ou direitos são superiores ou iguais a 300.000"
    },
    {
        seletor: "#rendaIsenta",
        condition: (valor) => valor >= 40000,
        text: "A soma de rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte são superiores a 40.000 reais"
    },
    {
        seletor: "#rendaTributavel",
        condition: (valor) => valor >= 28559.70,
        text: "A soma do seu rendimento tributável é superior ou igual a 28.559,70 "
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
]
const hide = selector => $(selector).hide();
const show = selector => $(selector).show();
const printReasonsToDeclare = motivo => motivo && $("#resultados").append(`<li>${motivo}</li>`)
const setEvents = () => events
    .map(event => $(event.seletor)
        .on(event.event,
            e => {
                if (!event.isRadio) return event.eventFunction(e);
                if (e.target.id.match("sim")) return event.onTrue(e)
                event.onFalse(e)
            })
    )

const getReasonsToDeclare = () => inputs
    .map(input => {
        const value = $(input.seletor)?.[0]?.value
        if (input.condition(value)) return input.text
    })
    .filter(input => input);