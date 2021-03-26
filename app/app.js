class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano= ano,
        this.mes= mes,
        this.dia= dia,
        this.tipo= tipo,
        this.descricao= descricao,
        this.valor= valor
    }    

    dataValidate(){
        for(let index in this){
            if (this[index]==undefined || this[index]=='' || this[index]==null) {
                return false;
            }
        }
        return true;
    }
}

document.querySelector('#register').addEventListener('click', function() {
        
    let ano= document.querySelector('#ano');
    let mes= document.querySelector('#mes');
    let dia= document.querySelector('#dia');
    let tipo= document.querySelector('#tipo')
    let descricao= document.querySelector('#descricao');
    let valor= document.querySelector('#valor');

    let despesas= new Despesas(

        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if (despesas.dataValidate()) {
        dataBase.gravar(despesas);
        $('#successRecording').modal('show')
    } else {
        $('#errorRecording').modal('show')
        console.log('Dados invalidos')
    }    
})

 





// Criação e conexão do banco de dados
class DataBase{

    constructor(){
        let id= localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getNextId(){
        let nextId= localStorage.getItem('id')
        return parseInt(nextId)+1;
    }

    gravar(d){        
        let id= this.getNextId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let dataBase= new DataBase()