'use-strict';
const fetch = require("node-fetch");

var UtilsRepository = {
    viacep: async (body) => {
        let url = `https://viacep.com.br/ws/${body}/json/`;
        let dados = { rows: [] }
        dados = await fetch(url, { method: 'get' })
            .then(response => response.json())
            .then(data => { return { data: data, type: 200 } })
            .catch(error => { return { err: error, type: 400 } });
        return dados
    },

    dataAtual: () => {
        let data = new Date();
        let ano4 = data.getFullYear();
        let mes = data.getMonth() + 1;
        if (mes < 10) { mes = '0' + mes }
        let dia = data.getDate();
        if (dia < 10) { dia = '0' + dia }
        return dia + '/' + mes + '/' + ano4;
    },

    horaAtual: () => {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        let d = new Date();
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());

        return h + ":" + m;
    },

    formataMoeda: (v) => {
        v = v.toString();

        if (v.indexOf(".") === -1) { v = v + '00' }

        v = v.replace(/\D/g, '');
        v = v.replace(/(\d{1,2})$/, ',$1');
        v = v.replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1');
        if (v.length < 4) { v = '00' + v } else { v = v.replace(/^[0]{1}/, ''); }
        if (v.length <= 3) { v = '0' + v }
        return v
    },

    formataDataFinal: (mesAno) => {

        let mes = mesAno.substring(5, 8)
        let ano = mesAno.substring(0, 4)

        function validarAnoBissexto(a) {
            let resposta = 0;
            if (a % 400 == 0) resposta = 29;
            else { if (a % 4 == 0 && a % 100 != 0) resposta = 29; else resposta = 28; }
            return resposta
        }

        let dataFinal = ''
        switch (mes) {
            case '01': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '02': let dia = validarAnoBissexto(ano); dataFinal = `${ano}-${mes}-${dia} 23:59:59`; break;
            case '03': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '04': dataFinal = `${ano}-${mes}-30 23:59:59`; break;
            case '05': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '06': dataFinal = `${ano}-${mes}-30 23:59:59`; break;
            case '07': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '08': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '09': dataFinal = `${ano}-${mes}-30 23:59:59`; break;
            case '10': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            case '11': dataFinal = `${ano}-${mes}-30 23:59:59`; break;
            case '12': dataFinal = `${ano}-${mes}-31 23:59:59`; break;
            default: dataFinal = `${ano}-${mes}-30 23:59:59`; break;
        }

        return dataFinal
    },

    formataData: (d) => {
        let data = new Date(d),
            dia = data.getUTCDate().toString(), //getData estava trazendo um dia anterior
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();

        return diaF + "/" + mesF + "/" + anoF;
    }

}

module.exports = UtilsRepository;


