$(function () {

    function main() {
        const motivosIR = []
        if (rendaTributavel()) {
            motivosIR.push("textoIR");
        }
        console.log(motivosIR);
    }
    function rendaTributavel() {
        return (document.getElementById("rendaTributavel").value >= 28559.70);
    }
    function rendaIsenta() {
        return (document.getElementById("rendaIsenta").value >= 40000);
    }
    // Radios Buttons
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
    //
    function receitaAtividade() {
        return $("receitaAtividade").value >= 142798, 50;
    }
    function valorTotalRural() {
        return (document.getElementById("valorTotalRural").value >= 300000);
    }

    document.querySelector("#btn-calcular").addEventListener("click", main);
});