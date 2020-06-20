$(() => {
    [
        "#deveDeclarar",
        "#naoDeveDeclarar",
        ".receitaAtividade",
        ".contrato"
    ].map(id => hide(id))
    setEvents()
    setMasks()
    setDate()
});

const calcular = () => {
    const reasonsToDeclare = getReasonsToDeclare();
    hide("#form-imposto");
    const hasToDeclare = reasonsToDeclare.length > 0;
    showName();
    if (!hasToDeclare) return show("#naoDeveDeclarar");
    show("#deveDeclarar")
    reasonsToDeclare.map(printReasonsToDeclare);
    resultsIds.map(removeUnusedReasonsTopics);
    showUserData();
}