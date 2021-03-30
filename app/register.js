function register() {
        
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
        $('#actionRecording').modal('show')
        document.querySelector('#modal-title').innerHTML= 'Sucesso na gravação'
        document.querySelector('#modal-text').classList= 'modal-header text-success'

        document.querySelector('#text-content').innerHTML= ' Despesa cadastrada com sucesso!'

        document.querySelector('#button-ok').innerHTML= 'Ok'
        document.querySelector('#button-ok').classList= 'btn btn-success'

        ano.value= '' 
        mes.value= '' 
        dia.value= '' 
        tipo.value= '' 
        descricao.value= '' 
        valor.value= ''
    } else {
        $('#actionRecording').modal('show')
        document.querySelector('#modal-title').innerHTML= 'Erro na gravação'
        document.querySelector('#modal-text').classList= 'modal-header text-danger'

        document.querySelector('#text-content').innerHTML= 'Erro no cadastro, favor preencher todos os campos!'

        document.querySelector('#button-ok').innerHTML= 'Ok'
        document.querySelector('#button-ok').classList= 'btn btn-danger'
    }    
}


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

    retrieveAllRecords(){
        let despesas= []

        let id= localStorage.getItem('id');
        
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa === null) {
                continue
            }

            despesa.id= i;
            despesas.push(despesa)                        
        }

        return despesas;        
    }

    search(despesa){
        let filteredExpenses= []
        filteredExpenses= this.retrieveAllRecords();

        console.log(filteredExpenses)

        if (despesa.ano != '') {
            filteredExpenses= filteredExpenses.filter(v => v.ano == despesa.ano)
        }

        if (despesa.mes != '') {
            filteredExpenses= filteredExpenses.filter(v => v.mes == despesa.mes)
        }

        if (despesa.dia != '') {
            filteredExpenses= filteredExpenses.filter(v => v.dia == despesa.dia)
        }

        if (despesa.tipo != '') {
            filteredExpenses= filteredExpenses.filter(v => v.tipo == despesa.tipo)
        }

        if (despesa.descricao != '') {
            filteredExpenses= filteredExpenses.filter(v => v.descricao == despesa.descricao)
        }

        if (despesa.valor != '') {
            filteredExpenses= filteredExpenses.filter(v => v.valor == despesa.valor)
        }

        return filteredExpenses
    }

    remove(id){
        localStorage.removeItem(id)
    }

    
}

let dataBase= new DataBase()


