// Get a reference to the canvas element
const canvas = document.getElementById('myChart');

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};

// Create a new Chart.js chart object
const chart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [], // Labels for the x-axis
        datasets: [{
            label: 'y = x^2', // Label for the dataset
            data: [], // Data for the dataset
            backgroundColor: '#FF007F', // Transparent background color
            chartColor: "#333",
            borderColor: '#FF007F', // Line color
            borderWidth: 2 // Line width
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear', // Use a linear x-axis
                position: 'bottom'
            }],
            yAxes: [{
                type: 'linear', // Use a linear y-axis
                position: 'left'
            }]
        },
        plugins: {
            customCanvasBackgroundColor: {
                color: '#333',
            }
        }
    },
    plugins: [plugin]
});

// Generate data for the x^2 function and add it to the chart
for (let x = -10; x <= 10; x++) {
    const y = x * x;
    chart.data.labels.push(x);
    chart.data.datasets[0].data.push(y);
}
chart.update();