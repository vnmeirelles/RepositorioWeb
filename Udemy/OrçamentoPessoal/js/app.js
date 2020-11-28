class Despesa {
    constructor(ano, mes, dia, tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            console.log(i,this[i])
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        let despesas = Array()

        let id = localStorage.getItem('id')
        for(let i=1; i<=id;i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
               continue 
            } 
            despesa.id = i
            despesas.push(despesa)     
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

class Modal{
    constructor(tipo){
        if(tipo === 'sucesso'){
            document.getElementById('modal_titulo').innerHTML = 'Registro incluido com sucesso!'
            document.getElementById('modal_titulo_div').className   = 'modal-header text-success'
            document.getElementById('modal_conteudo').innerHTML = 'O Registro foi cadastrado com sucesso.'
            document.getElementById('modal_botao').innerHTML = 'Voltar'
            document.getElementById('modal_botao').className = 'btn btn-success'
            $('#modalRegistraDespesa').modal('show')
        } else{
            document.getElementById('modal_titulo').innerHTML = 'Erro na Inclusão do registro!'
            document.getElementById('modal_titulo_div').className   = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
            document.getElementById('modal_botao').innerHTML = 'Voltar e Corrigir'
            document.getElementById('modal_botao').className = 'btn btn-danger'
            $('#modalRegistraDespesa').modal('show')
        }
    }
}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        let modal = new Modal('sucesso')
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        let modal = new Modal('erro')
    }
        
}

function retornaTipo(tipo){
    switch(tipo){
        case '1': return 'Alimentação'
        case '2': return 'Educação'
        case '3': return'Lazer'
        case '4': return'Saúde'
        case '5': return 'Transporte'
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false){
    
    if(despesas.length == 0 && filtro==false){
        despesas = bd.recuperarTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow()  
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = retornaTipo(d.tipo)
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = 'id_despesa_'+d.id
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    
    let despesa = new Despesa(ano, mes, dia, descricao, tipo, valor)

    let despesas =  bd.pesquisar(despesa)

    carregaListaDespesas(despesas,true)
}