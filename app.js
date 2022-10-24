var selectRow = null;
var employees = [];

//actualizar datos despues de refrescar pagina //

updateAfterPageRefresh();

// funcion crear/editar el formulario //

function onSubmitForm(){
    if(validate()){
        var formData = readForm();
        if(selectRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }
     
}

// Funcion leer el contenido en el formulario //    

function readForm(){
    var formData = {};
    formData["Nombre"] = document.getElementById("Nombre").value;
    formData["Apellido"] = document.getElementById("Apellido").value;
    formData["Puesto"] = document.getElementById("Puesto").value;
    formData["Departamento"] = document.getElementById("Departamento").value;
    return formData
}

// insertar datos //

function insertNewRecord(formData){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.Nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.Apellido;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.Puesto;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.Departamento;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick=editForm(this)>EDITAR</a><a onClick=deleteRecord(this)>BORRAR</a>`
    employees.push(formData);
    localStorage.setItem("employees",JSON.stringify(employees));
}

function resetForm(){
    document.getElementById("Nombre").value = "";
    document.getElementById("Apellido").value = "";
    document.getElementById("Puesto").value = "";
    document.getElementById("Departamento").value = "";
    selectRow = null;
}

// Eliminar datos del formulario //

function deleteRecord(a){
    var row = a.parentElement.parentElement
    if(confirm("Estas seguro de eliminar esta fila")){  // aviso //
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        employees.splice(row.rowIndex-1,1);
        localStorage.setItem("employees",JSON.stringify(employees));

    }
}

function editForm(a){
    selectRow = a.parentElement.parentElement;
    document.getElementById("Nombre").value = selectRow.cells[0].innerHTML;
    document.getElementById("Apellido").value = selectRow.cells[1].innerHTML;
    document.getElementById("Puesto").value = selectRow.cells[2].innerHTML;
    document.getElementById("Departamento").value = selectRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectRow.cells[0].innerHTML = formData.Nombre;
    selectRow.cells[1].innerHTML = formData.Apelido;
    selectRow.cells[2].innerHTML = formData.Puesto;
    selectRow.cells[3].innerHTML = formData.Departamento;
    employees.splice(selectRow.rowIndex-1,1,{Nombre:formData.Nombre,Apellido:formData.Apellido,Puesto:formData.Puesto,Departamento:formData.Departamento});
    localStorage.setItem("employees",JSON.stringify(employees));
}
function validate(){
    isValid = true;
    if(document.getElementById("Nombre").value == ""){
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById("labelId").classList.contains("hide")){
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updateAfterPageRefresh(){
    if(localStorage.getItem("employees")==null){
        console.log("No hay nada en el almacenamiento local.")
    }
    else{
        employees = JSON.parse(localStorage.getItem("employees"));
        for (let index = 0; index < employees.length; index++) {
            let Nombre = employees[index].Nombre;
            let Apellido = employees[index].Apellido;
            let Puesto = employees[index].Puesto;
            let Departamento = employees[index].Departamento;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${Nombre}</td>
                <td>${Apellido}</td>
                <td>${Puesto}</td>
                <td>${Departamento}</td>
                <td><a onClick=editForm(this)>EDITAR</a><a onClick=deleteRecord(this)>DELETE</a></td>
            </tr>
            `
            
        }
    }
    
}