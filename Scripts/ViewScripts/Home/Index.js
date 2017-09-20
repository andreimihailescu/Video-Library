/////////////////////////////////////////////
//// BAR GRAPH
function renderBarGraph(dataObject) {
    var ctx = document.getElementById("firstChart");
    var firstChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dataObject.labels,
            datasets: [{
                label: 'Number In Stock',
                data: dataObject.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: "white"
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//// LINE GRAPH
function renderLineGraph(dataObject) {
    var ctx = document.getElementById('secondChart').getContext('2d');
    var secondChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataObject.labels,
            datasets: [{
                label: "Rentals",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataObject.data,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: "white"
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 8,
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 8,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


//// PIE CHART
function renderPieChart(dataArray) {
    var ctx = document.getElementById('thirdChart').getContext('2d');
    var thirdChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Action", "Thriller", "Family", "Romance", "Comedy"],
            datasets: [{
                label: "Genre",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                data: dataArray,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: "white"
                }
            }
        }
    });
}

String.prototype.formatDate = function () {
    return new Date(this);
}

/////////////////////////////////////////////




/////////////////////////////////////////////
$(document).ready(function () {

    //// Bar graph
    var firstChart = {
        labels: [],
        data: []
    };

    movies.forEach(function (movie) {
        firstChart.labels.push(movie.Name);
        firstChart.data.push(movie.NumberInStock);
    });

    renderBarGraph(firstChart);


    //// Line greah 
    $.ajax({
        dataType: "json",
        url: "api/newRentals",
        success: function (data) {
            var daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                dataObject = {
                    data: [],
                    labels: []
                },
                compareDate = new Date();

            //// Compute compare date
            compareDate.setDate(compareDate.getDate() - 7);

            //// Filter data for last 7 days
            for (var i = 0; i < data.length; i++)
                if (data[i].dateRented.formatDate().getTime() < compareDate.getTime())
                    data.splice(i, 1);

            //// Group by week day
            var data = data.reduce(function (r, a) {
                r[daysInWeek[a.dateRented.formatDate().getDay()]] = r[daysInWeek[a.dateRented.formatDate().getDay()]] || [];
                r[daysInWeek[a.dateRented.formatDate().getDay()]].push(a);
                return r;
            }, Object.create(null));

            //// Generate dataObject.labels
            for (var i = 0; i < 7; i++) {
                dataObject.labels.push(daysInWeek[compareDate.getDay()]);
                compareDate.setDate(compareDate.getDate() + 1);
            }

            //// Generate dataObject.labels
            dataObject.labels.forEach(function (day) {
                var bool = false;
                for (var i in data) {
                    if (day === i) {
                        dataObject.data.push(data[i].length);
                        bool = true;
                    }
                }

                if (bool === false)
                    dataObject.data.push(0);
            });

            dataObject.data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
            });

            //// Reorder arrays
            dataObject.data.reverse();
            //dataObject.labels.reverse();

            console.log("dataObject:", dataObject);

            renderLineGraph(dataObject);
        }
    });


    //// Ajax call for pie chart data
    $.ajax({
        dataType: "json",
        url: "/api/movies",
        success: function (data) {
            var thirdChartData = [0, 0, 0, 0, 0];

            data.forEach(function (movie) {
                switch (movie.genre.id) {
                    case 1:
                        thirdChartData[0]++;
                        break;
                    case 2:
                        thirdChartData[1]++;
                        break;
                    case 3:
                        thirdChartData[2]++;
                        break;
                    case 4:
                        thirdChartData[3]++;
                        break;
                    case 5:
                        thirdChartData[4]++;
                        break;
                    default:
                }
            });

            renderPieChart(thirdChartData);
        }
    });

});

/////////////////////////////////////////////