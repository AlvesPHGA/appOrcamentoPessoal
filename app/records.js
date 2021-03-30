function loadRecord(despesas= [], filter = false) {
    if (despesas.length == 0 && filter == false) {
        despesas= dataBase.retrieveAllRecords();
    } 

    console.log(despesas)

    let expenseList= document.querySelector("#expenseList")
    expenseList.innerHTML= ''
    
    despesas.forEach(function (d) {
        console.log(d)

        let rowList= expenseList.insertRow();

        rowList.insertCell(0).innerHTML= `${d.dia}/${d.mes}/${d.ano}`;

        switch (d.tipo) {
            case "1":
                rowList.insertCell(1).innerHTML= 'Alimentação';        
                break;

            case "2":
                rowList.insertCell(1).innerHTML= 'Educação';        
                break;

            case "3":
                rowList.insertCell(1).innerHTML= 'Lazer';        
                break;

            case "4":
                rowList.insertCell(1).innerHTML= 'Saúde';        
                break;

            case "5":
                rowList.insertCell(1).innerHTML= 'Transporte';        
                break;
        }
        
        rowList.insertCell(2).innerHTML= d.descricao;
        rowList.insertCell(3).innerHTML= d.valor;
    })
}


// Filtrando resultados
function searchExpense(){
    let ano=document.querySelector('#ano').value;
    let mes=document.querySelector('#mes').value;
    let dia=document.querySelector('#dia').value;
    let tipo=document.querySelector('#tipo').value;
    let descricao=document.querySelector('#descricao').value;
    let valor=document.querySelector('#valor').value;

    let despesa= new Despesas(ano, mes, dia, tipo, descricao, valor)

    let despesas= dataBase.search(despesa); 

    this.loadRecord(despesas, true)
}