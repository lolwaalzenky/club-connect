let members = [];

const form = document.getElementById("memberForm");
const table = document.getElementById("memberTable");
const jsonDisplay = document.getElementById("jsonDisplay");

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const year = document.getElementById("year").value;
const affiliation = document.getElementById("affiliation").value;
const phone = document.getElementById("phone").value;

if(name === "" || email === "" || year === "" || affiliation === ""){
alert("Please fill all required fields");
return;
}

const member = {
name:name,
email:email,
year:year,
affiliation:affiliation,
phone:phone
};

members.push(member);

renderMembers();

form.reset();

});

function renderMembers(){

table.innerHTML="";

members.forEach(function(member){

let row = `<tr>
<td>${member.name}</td>
<td>${member.email}</td>
<td>${member.year}</td>
<td>${member.affiliation}</td>
<td>${member.phone}</td>
</tr>`;

table.innerHTML += row;

});

jsonDisplay.textContent = JSON.stringify(members,null,2);

}