$(document).ready(function () {
    var table = $("#rentals").DataTable({
        ajax: {
            url: "/api/newRentals",
            dataSrc: ""
        },
        columns: [
            {
                data: "customer.name"
            },
            {
                data: "movie.name"
            },
            {
                data: "dateReturned",
                render: function (data) {
                    var a;

                    if (data !== null)
                        a = new Date(Date.parse(data)).toDateString();
                    else
                        a = "-";

                    return a;
                }
            },
            {
                data: "id",
                render: function (data) {
                    return "<button class='btn-link js-delete' data-rental-id=" + data + ">Returned</button>";
                }
            }
        ]
    });

    $("#rentals").on("click", ".js-delete", function () {
        var button = $(this);

        bootbox.confirm("Is this movie returned?", function (result) {
            if (result) {
                $.ajax({
                    url: "/api/NewRentals/" + button.attr("data-rental-id"),
                    method: "PUT",
                    success: function () {
                        table.ajax.reload(null, false); 
                    }
                });
            }
        });
    });
});