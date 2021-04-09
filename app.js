//Item Constructor
class Item {
    constructor(title, cost, onHand, par, order, total) {
        this.title = title
        this.cost = cost
        this.onHand = onHand
        this.par = par
        this.order = order
        this.total = total
    }
}


class UI {
    //ADD ITEM TO LIST
    addItemToList(item) {
        const list = document.getElementById('item-list')
        //CREATE TR ELEMENT
        const row = document.createElement('tr')
        // INSERT COLUMNS
        row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.cost}</td>
        <td>${item.onHand}</td>
        <td>${item.par}</td>
        <td style="color:red">${item.order}</td>
        <td style="color:red;font-weight:bold">$${item.total}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row)
    }
    // SHOW ALERTS
    showAlert(message, className) {
        // CREATE A DIV
        const div = document.createElement('div')
        // ADD CLASSNAME
        div.className = `alert ${className}`
        //ADD TEXT 
        div.appendChild(document.createTextNode(message))
        // GET PARENT
        const container = document.querySelector('.container')
        const form = document.querySelector('#item-form')
        //INSERT ALERT
        container.insertBefore(div, form)
        // TIMEOUT AFTER # SECONDS 
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }
    //DELETE ITEM
    deleteItem(target) {
        if (target.className === 'delete') target.parentElement.parentElement.remove()
    }
    // CLEAR FIELDS
    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('cost').value = ''
        document.getElementById('onHand').value = ''
        document.getElementById('par').value = ''

    }

}


//Event Listeners FOR ADD ITEM
const itemForm = document.querySelector('#item-form')

itemForm.addEventListener('submit', (e) => {
    //GET FORM VALUES
    const title = document.getElementById('title').value,
        cost = Number(document.getElementById('cost').value).toFixed(2),
        onHand = Number(document.getElementById('onHand').value),
        par = Number(document.getElementById('par').value),
        order = Number(par - onHand),
        total = Number(order * cost).toFixed(2)


    //INSTANTIATE ITEM
    const item = new Item(title, cost, onHand, par, order, total)


    //INSTANTIATE UI
    const ui = new UI()

    // VALIDATE
    if (title === '' || cost === '' || onHand === 0 || par === 0) {
        //ERROR ALERT
        ui.showAlert('Please fill in ALL fields', 'error')

    } else {
        //ADD ITEM TO LIST
        ui.addItemToList(item)

        //SHOW SUCCESS 
        ui.showAlert('Item ADDED!', 'success')

        // CLEAR FIELDS
        ui.clearFields()

    }


    e.preventDefault()
})


// EVENT LISTENER FOR DELETE
const deleteItem = document.querySelector('#item-list')

deleteItem.addEventListener('click', (e) => {
    const ui = new UI()

    ui.deleteItem(e.target)

    // SHOW ALERT
    ui.showAlert('Item REMOVED', 'success')
    e.preventDefault()
})