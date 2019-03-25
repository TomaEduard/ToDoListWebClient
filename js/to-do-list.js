
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

    bindEvents: function () {

        $("#create-item-form").submit(function (event) {
            event.preventDefault();
            console.log("Submitting form");

            ToDoList.addItem();
            return false;
        });
    }
};

ToDoList.bindEvents();