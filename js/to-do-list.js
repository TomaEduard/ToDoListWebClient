window.ToDoList = {
    apiUrl: "http://localhost:8081/to-do-items",

    addItem: function () {
        var description = $("input[title='Description']").val();
        var deadline = $("input[title='Deadline']").val();

        var data = {
            'description': description,
            'deadline': deadline
        };

        $.ajax({
            url: ToDoList.apiUrl,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            // reload items table

        });
    },

    // displayItems
    getItemRow: function (item) {

        // Transform date String(from API)
        var deadline = new Date(item.deadline).toLocaleDateString('ro-RO');

        return `<tr>
<td class="description">${item.description}</td>
<td class="deadline">${deadline}</td>
<td><input type="checkbox" class="mark-done" title="Done"></td>
</tr>
`
    },

    displayItems: function (items) {
        console.log('Displaying items.');
        var rows = '';

        items.forEach(item => rows += ToDoList.getItemRow(item));
        console.log(rows);

        $('#to-do-items tbody').html(rows);
    },

    getItems: function () {
        $.ajax({
            url: ToDoList.apiUrl,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            // reload items table

            ToDoList.displayItems(response)
        });
    },

    // add item
    bindEvents: function () {

        $("#create-item-form").submit(function (event) {
            event.preventDefault();

            console.log("Submitting form");

            ToDoList.addItem();

            return false;
        });

    }
};

ToDoList.getItems();
ToDoList.bindEvents();