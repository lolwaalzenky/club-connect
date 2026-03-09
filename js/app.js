const memberForm = document.getElementById("memberForm");
const memberTableBody = document.getElementById("memberTableBody");
const messageBox = document.getElementById("messageBox");
const clearBtn = document.getElementById("clearBtn");

function getMembers() {
  let members = localStorage.getItem("clubMembers");
  return members ? JSON.parse(members) : [];
}

function saveMembers(members) {
  localStorage.setItem("clubMembers", JSON.stringify(members));
}

function showMessage(type, text) {
  messageBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${text}
    </div>
  `;
}

function clearMessage() {
  messageBox.innerHTML = "";
}

function renderMembers() {
  const members = getMembers();
  memberTableBody.innerHTML = "";

  if (members.length === 0) {
    memberTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No members added yet.</td>
      </tr>
    `;
    return;
  }

  for (let i = 0; i < members.length; i++) {
    const member = members[i];

    memberTableBody.innerHTML += `
      <tr>
        <td>${member.memberName}</td>
        <td>${member.email}</td>
        <td>${member.year}</td>
        <td>${member.affiliation}</td>
        <td>${member.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editMember(${i})">Update</button>
          <button class="btn btn-sm btn-danger" onclick="deleteMember(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
}

function editMember(index) {
  const members = getMembers();
  const member = members[index];

  document.getElementById("memberName").value = member.memberName;
  document.getElementById("email").value = member.email;
  document.getElementById("year").value = member.year;
  document.getElementById("affiliation").value = member.affiliation;
  document.getElementById("phone").value = member.phone;
  document.getElementById("editIndex").value = index;

  showMessage("info", "You are now editing a member.");
}

function deleteMember(index) {
  let members = getMembers();
  members.splice(index, 1);
  saveMembers(members);
  renderMembers();
  showMessage("success", "Member deleted successfully.");
}

memberForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessage();

  const memberName = document.getElementById("memberName").value.trim();
  const email = document.getElementById("email").value.trim();
  const year = document.getElementById("year").value.trim();
  const affiliation = document.getElementById("affiliation").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (
    memberName === "" ||
    email === "" ||
    year === "" ||
    affiliation === ""
  ) {
    showMessage("danger", "Please fill in all required fields.");
    return;
  }

  const memberData = {
    memberName: memberName,
    email: email,
    year: year,
    affiliation: affiliation,
    phone: phone
  };

  let members = getMembers();

  if (editIndex === "-1") {
    members.push(memberData);
    showMessage("success", "Member added successfully.");
  } else {
    members[editIndex] = memberData;
    showMessage("success", "Member updated successfully.");
    document.getElementById("editIndex").value = "-1";
  }

  saveMembers(members);
  renderMembers();
  memberForm.reset();
});

clearBtn.addEventListener("click", function () {
  document.getElementById("editIndex").value = "-1";
  clearMessage();
});

renderMembers();