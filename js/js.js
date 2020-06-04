

$(function () {
    $("#deveDeclarar").hide();
    $("#naoDeveDeclarar").hide();
    function main() {
        const motivosIR = []
        if (rendaTributavel()) {
            motivosIR.push("1");
        }
        if (rendaIsenta()) {
            motivosIR.push("2");
        }
        if (receitaAtividade()) {
            motivosIR.push("3");
        }
        if (valorTotalRural()) {
            motivosIR.push("4");
        }
        if (ganhoCapital()) {
            motivosIR.push("5");
        }
        if (imovel()) {
            motivosIR.push("6");
        }
        if (imovel2()) {
            motivosIR.push("7");
        }
        if (operacoesBolsa()) {
            motivosIR.push("8");
        }
        if (atividade1()) {
            motivosIR.push("9");
        }

        $("form[id='form-imposto']").hide();
        
        if (motivosIR.length == 0){
            $("#naoDeveDeclarar").show();
            return;
        }
        $("#deveDeclarar").show();
       for(var i = 0;i < motivosIR.length;i++){
           $("#resultados").append(`
           <li>${motivosIR[i]}</li>`);
        }
    }
    // Inputs 
    function rendaTributavel() {
        return (document.getElementById("rendaTributavel").value >= 28559.70);
    }
    function rendaIsenta() {
        return (document.getElementById("rendaIsenta").value >= 40000);
    }
    //
    function receitaAtividade() {
        return $("receitaAtividade").value >= 142798.50;
    }
    function valorTotalRural() {
        return (document.getElementById("valorTotalRural").value >= 300000);
    }
    
    document.querySelector("#btn-calcular").addEventListener("click", main);

    // Inputs Radios Buttons
    function ganhoCapital() {
        return $("input[name='ganho']:checked")[0].value == 'sim';
    }
    function imovel() {
        return $("input[name='imoveis']:checked")[0].value == 'sim';
    }
    function imovel2() {
        return $("input[name='contrato']:checked")[0].value == 'sim';
    }
    function operacoesBolsa() {
        return $("input[name='operacoes']:checked")[0].value == 'sim';
    }
    function atividade1() {
        return $("input[name='atividade']:checked")[0].value == 'sim';
    }

    //Verificando se os Radios Buttons foram selecionados
    function verificandoGanhoCapital() {
        if (ganhoCapital() == false ){
            console.log("Preencha sim ou não");
        }
    }
  /*  function verificandoImovel() {
        return $("input[name='imoveis']").prop ('checked', true);
    }
    function verificandoImovel2() {
        return $("input[name='contrato']").prop ('checked', true);
    }
    function verficandoOperacoesBolsa() {
        return $("input[name='operacoes']").prop ('checked', true);
    }
    function atividade1() {
        return $("input[name='atividade']").prop ('checked', true);
    }
    */
});