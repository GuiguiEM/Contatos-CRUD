const apiUrl = 'https://bakcend-fecaf-render.onrender.com/contatos';

// Função para buscar e exibir os contatos
async function fetchContacts() {
    const response = await fetch(apiUrl);
    const contacts = await response.json();
    const tableBody = document.getElementById('contactTableBody');
    tableBody.innerHTML = '';

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.nome}</td>
            <td>${contact.email}</td>
            <td>${contact.telefone}</td>
            <td>${contact.endereco}</td>
            <td>${contact.cidade}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editContact(${contact.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para adicionar ou atualizar um contato
async function saveContact(event) {
    event.preventDefault();

    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const photo = document.getElementById('photo').value;

    const contact = { nome: name, email: email, telefone: phone, endereco: address, cidade: city, foto: photo };

    if (id) {
        await updateContact(id, contact);
    } else {
        await addContact(contact);
    }
    $('#contactModal').modal('hide');
    fetchContacts();
}

// Função para adicionar um novo contato
async function addContact(contact) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
}

// Função para atualizar um contato existente
async function updateContact(id, contact) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
}

// Função para deletar um contato
async function deleteContact(id) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchContacts();
    }
}

// Função para editar um contato
async function editContact(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const contact = await response.json();

    document.getElementById('contactId').value = contact.id;
    document.getElementById('name').value = contact.nome;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.telefone;
    document.getElementById('address').value = contact.endereco;
    document.getElementById('city').value = contact.cidade;
    document.getElementById('photo').value = contact.foto;

    $('#contactModal').modal('show');
}

// Função para abrir o modal de adicionar contato
function openModal() {
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = '';
    $('#contactModal').modal('show');
}

// Inicializa a tabela de contatos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchContacts);

// Evento de submissão do formulário
document.getElementById('contactForm').addEventListener('submit', saveContact);
