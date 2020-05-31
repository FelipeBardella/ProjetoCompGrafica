

$(function () {

    function main() {
        const motivosIR = []
        if (rendaTributavel()) {
            motivosIR.push("textoIR");
        }
        console.log(motivosIR);
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
        return $("receitaAtividade").value >= 142798, 50;
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
        return $("input[name='imoveis2']:checked)")[0].value == 'sim';
    }
    function operacoesBolsa() {
        return $("input[name='operacoes']:checked")[0].value == 'sim';
    }
    function atividade1() {
        return $("input[name='atividade']:checked")[0].value == 'sim';
    }

    //Verificando se os Radios Buttons foram selecionados
    function verificandoGanhoCapital() {
        if ($("input[name='ganho']").html($input.attr("checked")) == false){
            console.log("Preencha sim ou não");
        }
    }
  /*  function verificandoImovel() {
        return $("input[name='imoveis']").prop ('checked', true);
    }
    function verificandoImovel2() {
        return $("input[name='imoveis2']").prop ('checked', true);
    }
    function verficandoOperacoesBolsa() {
        return $("input[name='operacoes']").prop ('checked', true);
    }
    function atividade1() {
        return $("input[name='atividade']").prop ('checked', true);
    }
    */
});