const diasSem = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];

async function getDados(ano) {
    const dados = await fetch("./aulas.json").then(async res => {
        const dias = await res.json();
        return dias;
    })
    return dados[ano];
}

async function criarDias() {
    const dados = await getDados("2022");

    meses.forEach(function (mes) {
        const elemMes = document.querySelector("."+mes)
        let dias = dados[elemMes.dataset.mes]

        dias.forEach(function (dia) {
            const elemSemana = document.querySelector("tr."+dia.dia_semana);
            const elemDia = document.createElement("td");
            elemDia.setAttribute("class", "dia");
            if(dia.quantidade < 2){
                elemDia.classList.add("ruim")
            } else if(dia.quantidade < 4){
                elemDia.classList.add("medio")
            } else {
                elemDia.classList.add("bom")
            }

            const divElem = document.createElement("div");
            divElem.innerHTML = "QTDD: "+dia.quantidadedia + "Dia: "+" "+dia.dia
            divElem.setAttribute("class", "info");
            elemDia.appendChild(divElem);

            elemDia.addEventListener("mouseenter", function(){
                console.log("moseover")
                divElem.classList.add("show")
            });
            elemDia.addEventListener("mouseleave", function(){
                divElem.classList.remove("show")
            });
            elemSemana.appendChild(elemDia);
        })
    })
}

criarDias();