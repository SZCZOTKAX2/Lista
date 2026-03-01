$(document).ready(function () {

    // D&D
    $("#shoppingList").sortable();

    function createItem(text) {
        return $("<li>")
            .addClass("list-group-item")
            .text(text);
    }

    // Dodaj 
    $("#addProduct").click(function () {
        const value = $("#productInput").val();
        if (value !== "") {
            $("#shoppingList").append(createItem(value));
            $("#productInput").val("");
        }
    });

    // Dodaj P
    $("#addFirst").click(function () {
        const value = $("#productInput").val();
        if (value !== "") {
            $("#shoppingList").prepend(createItem(value));
            $("#productInput").val("");
        }
    });

    // Dodaj K
    $("#addLast").click(function () {
        const value = $("#productInput").val();
        if (value !== "") {
            $("#shoppingList").append(createItem(value));
            $("#productInput").val("");
        }
    });

    // Usuń 
    $("#removeLast").click(function () {
        $("#shoppingList li:last").remove();
    });

    // Wyczyść 
    $("#clearList").click(function () {
        $("#shoppingList").empty();
    });

    // Przywróć 
    $("#restoreList").click(function () {
        $("#shoppingList").html(`
            <li class="list-group-item">Chleb</li>
            <li class="list-group-item">Masło</li>
            <li class="list-group-item">Ser</li>
        `);
    });

    // Edycja 
$(document).on("click", "#shoppingList li", function (e) {


    if ($(e.target).is("input")) return;

    const li = $(this);

    
    if (li.find("input").length > 0) return;

    const text = li.text();
    const input = $("<input>")
        .addClass("form-control")
        .val(text);

    li.addClass("active");

    li.fadeOut(200, function () {
        li.html(input);
        li.fadeIn(200);
        input.focus();
    });

    // Zapis
    input.on("keypress", function (e) {
        if (e.which === 13) {
            const newText = $(this).val();

            li.fadeOut(200, function () {
                li.text(newText);
                li.removeClass("active");
                li.fadeIn(200);
            });
        }
    });

});

    // Pokoloruj
    $("#colorEven").click(function () {
        $("#shoppingList li:even").css("background-color", "#d1ecf1");
    });

    // A-Z
    $("#sortAZ").click(function () {
        const items = $("#shoppingList li").get();

        items.sort(function (a, b) {
            return $(a).text().localeCompare($(b).text());
        });

        $.each(items, function (i, li) {
            $("#shoppingList").append(li);
        });
    });

    // Filtrowanie
    $("#filterInput").on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $("#shoppingList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

});