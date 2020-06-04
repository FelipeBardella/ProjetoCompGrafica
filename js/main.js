$(() => {
    [
        "#deveDeclarar",
        "#naoDeveDeclarar",
        ".receitaAtividade",
        ".contrato"
    ].map(id => hide(id))
    setEvents()
});

const calcular = () => {
    const reasonsToDeclare = getReasonsToDeclare();
    hide("#form-imposto");
    const hasToDeclare = reasonsToDeclare.length > 0;
    if (!hasToDeclare) return show("#naoDeveDeclarar")
    show("#deveDeclarar")
    reasonsToDeclare.map(printReasonsToDeclare)
}