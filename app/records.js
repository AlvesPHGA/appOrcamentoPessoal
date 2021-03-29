function loadRecord() {
    let despesas= []

    despesas= dataBase.retrieveAllRecords();

    console.log(despesas)

    let expenseList= document.querySelector("#expenseList")
    
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