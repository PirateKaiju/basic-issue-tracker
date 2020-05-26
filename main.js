document.getElementById('issueInputForm').addEventListener('submit', saveIssue);//Aguarda cliques no submit

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues')); //Recupera do Local Storage
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for(let i = 0; i < issues.length; i++){//Para cada issue "salva"
        //Recuperando dados
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        //Estruturacao p/ exibir de cada issue
        issuesList.innerHTML += 
            '<div class="well">'+
            '<h6>Issue ID: ' + id + '</h6>'+
            '<p><span class="label label-info">' + status + '</span></p>'+
            '<h3>' + desc + '</h3>'+
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
            '</div>';


    }



}

function saveIssue(e){
    //Valores que serao salvos sao os do formulario html
    let issueId = chance.guid();
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueStatus = 'Open'; //Padrao

    // Classe (d) issue
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus

    }

    if(localStorage.getItem('issues') === null){//Existencia de issues
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));//Salva pelo JSON
    }else{//Se ja existir alguma
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));

    }
    document.getElementById('issueInputForm').reset();//Limpar form
    
    fetchIssues(); //Atualiza exibicao da lista
    e.preventDefault();//Prever envio sem info.



}

function setStatusClosed(id){//Clique em fechar a chamada da issue
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++){
        if(issues[i].id == id){//Encontrar a issue a ser fechada
            issues[i].status = 'Closed';


        }



    }
    localStorage.setItem('issues', JSON.stringify(issues)); //Guarda
    fetchIssues(); //Atualiza exibicao


}

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    for(let i = 0; i < issues.length; i++){
        if(issues[i].id == id){//Encontrou o id
            issues.splice(i,1);//Remocao


        }


    }
    localStorage.setItem('issues',JSON.stringify(issues));//Guarda
    fetchIssues();//Atualiza exibicao



}