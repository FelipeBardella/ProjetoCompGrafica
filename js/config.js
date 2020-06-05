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
        text: "1"
    },
    {
        seletor: "input[name='imoveis']:checked",
        condition: (valor) => valor == 'sim',
        text: "2"
    },
    {
        seletor: "input[name='contrato']:checked",
        condition: (valor) => valor == 'sim',
        text: "3"
    },
    {
        seletor: "input[name='operacoes']:checked",
        condition: (valor) => valor == 'sim',
        text: "4"
    },
    {
        seletor: "input[name='atividade']:checked",
        condition: (valor) => valor == 'sim',
        text: "5"
    },
    {
        seletor: "#valorTotalRural",
        condition: (valor) => valor >= 300000,
        text: "6"
    },
    {
        seletor: "#receitaAtividade",
        condition: (valor) => valor >= 142798.50,
        text: "7"
    },
    {
        seletor: "#rendaIsenta",
        condition: (valor) => valor >= 40000,
        text: "8"
    },
    {
        seletor: "#rendaTributavel",
        condition: (valor) => valor >= 28559.70,
        text: "9"
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
const printReasonsToDeclare = motivo => $("#resultados").append(`<li>${motivo}</li>`)
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