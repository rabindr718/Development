console.log("Hello India")
   let idCounter = 1;
   let formDataArray=[]
   function handleSubmit(event) {
       event.preventDefault();
       const uniqueId = idCounter++;
    // Const formattedDateTime = now.toISOString().slice(0, 19); // Formats to 'YYYY-MM-DDTHH:MM:SS'
    const now = new Date();
    // Format
    const options = { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour12: true 
    };
    const formattedDateTime = now.toLocaleString('en-US', options);
    // Format to "5:33 AM, 05/09/2024"
    const [time, date] = formattedDateTime.split(', ');
    const [month] = date.split('/');
    
    const formattedDate = `${month}, ${time}`;
    const formData = {
        id: uniqueId,
        username: document.getElementById('username').value,
        birthdaytime: formattedDate
    };

    formDataArray.push(formData);

    console.log('Form Data:', formData);
    console.log('Form Data Array:', formDataArray);
    
    renderFormData();
}

function renderFormData() {
    const itemsContainer = document.getElementById('itemsContainer');
    itemsContainer.innerHTML = ''; 
    formDataArray.forEach(data => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'itemsContainer';

        // Create and append elements for each item
        const checkboxSpan = document.createElement('span');
        checkboxSpan.className = 'items'; 
        checkboxSpan.innerHTML = `<input type="checkbox" id="vehicle3" name="vehicle4">`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'items1';
        contentDiv.innerHTML = `
            <b>${data.username}</b><br>
            <span>${data.birthdaytime}</span>
        `;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'items2';
        buttonsDiv.innerHTML = `
            <button onclick="deleteItem(${data.id})"><img height="33px" src="/idelete-30.png" alt="Delete"></button>
            <button onclick="editItem(${data.id})"><img height="33px" src="/pencil-32.png" alt="Edit"></button>
        `;

      
        itemDiv.appendChild(checkboxSpan);
        itemDiv.appendChild(contentDiv);
        itemDiv.appendChild(buttonsDiv);

       
        itemsContainer.appendChild(itemDiv);
    });
}

function deleteItem(id) {
    console.log('Deleting item with ID:', id);
    formDataArray = formDataArray.filter(item => item.id !== id); //After CALL MAIN FUNCTION FOR RENDERING
    renderFormData();
}

function editItem(id) {
    console.log('Editing item with ID:', id);
    const itemToEdit = formDataArray.find(item => item.id === id);

    if (itemToEdit) {

        const newUsername = prompt('Enter new username:', itemToEdit.username);
        const now = new Date();
        const options = { 
            hour: '2-digit', minute: '2-digit', second: '2-digit', 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour12: true 
        };
        const formattedDateTime = now.toLocaleString('en-US', options);
        const [time, date] = formattedDateTime.split(', ');
        const [month] = date.split('/');
        const formattedDate = `${month}, ${time}`;
        
        if (newUsername !== null) {
            // Update the item with new values
            itemToEdit.username = newUsername;
            itemToEdit.birthdaytime = formattedDate;
        }
        renderFormData();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});
   document.addEventListener('DOMContentLoaded', function() {
       const form = document.querySelector('form');
       form.addEventListener('submit', handleSubmit);
   });