document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart').getContext('2d');

  const dates = JSON.parse(localStorage.getItem('dates')) || [];
  const reps = JSON.parse(localStorage.getItem('reps')) || [];
  const sets = JSON.parse(localStorage.getItem('sets')) || [];
  
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  };

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates.map(formatDate),
      datasets: [
        {
          label: 'Reps',
          data: reps,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8
        },
        {
          label: 'Sets',
          data: sets,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'll'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const date = formatDate(context.label);
              return `${label}: ${context.raw} (${date})`;
            }
          }
        }
      }
    }
  });

  window.addEntry = function() {
    const repsValue = document.getElementById('reps').value;
    const setsValue = document.getElementById('sets').value;
    const date = new Date().toISOString();

    if (repsValue && setsValue) {
      dates.push(date);
      reps.push(repsValue);
      sets.push(setsValue);

      localStorage.setItem('dates', JSON.stringify(dates));
      localStorage.setItem('reps', JSON.stringify(reps));
      localStorage.setItem('sets', JSON.stringify(sets));

      chart.data.labels = dates.map(formatDate);
      chart.data.datasets[0].data = reps;
      chart.data.datasets[1].data = sets;
      chart.update();
    }
  };

  window.filterData = function(range) {
    const now = new Date();
    let filteredDates = [];
    let filteredReps = [];
    let filteredSets = [];

    dates.forEach((date, index) => {
      const entryDate = new Date(date);
      switch (range) {
        case '1m':
          if (entryDate >= new Date(now.setMonth(now.getMonth() - 1))) {
            filteredDates.push(date);
            filteredReps.push(reps[index]);
            filteredSets.push(sets[index]);
          }
          break;
        case '3m':
          if (entryDate >= new Date(now.setMonth(now.getMonth() - 3))) {
            filteredDates.push(date);
            filteredReps.push(reps[index]);
            filteredSets.push(sets[index]);
          }
          break;
        case '1y':
          if (entryDate >= new Date(now.setFullYear(now.getFullYear() - 1))) {
            filteredDates.push(date);
            filteredReps.push(reps[index]);
            filteredSets.push(sets[index]);
          }
          break;
        case '10y':
          if (entryDate >= new Date(now.setFullYear(now.getFullYear() - 10))) {
            filteredDates.push(date);
            filteredReps.push(reps[index]);
            filteredSets.push(sets[index]);
          }
          break;
        default:
          filteredDates.push(date);
          filteredReps.push(reps[index]);
          filteredSets.push(sets[index]);
      }
    });

    chart.data.labels = filteredDates.map(formatDate);
    chart.data.datasets[0].data = filteredReps;
    chart.data.datasets[1].data = filteredSets;
    chart.update();
  };
});
