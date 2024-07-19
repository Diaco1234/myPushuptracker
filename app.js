document.addEventListener('DOMContentLoaded', (event) => {
  const ctx = document.getElementById('chart').getContext('2d');

  let dates = JSON.parse(localStorage.getItem('dates')) || [];
  let reps = JSON.parse(localStorage.getItem('reps')) || [];
  let sets = JSON.parse(localStorage.getItem('sets')) || [];

  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates, // Dates
      datasets: [
        {
          label: 'Reps',
          data: reps,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Sets',
          data: sets,
          borderColor: 'green',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });

  function addEntry() {
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

      chart.update();
    }
  }

  function filterData(range) {
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

    chart.data.labels = filteredDates;
    chart.data.datasets[0].data = filteredReps;
    chart.data.datasets[1].data = filteredSets;
    chart.update();
  }

  window.addEntry = addEntry;
  window.filterData = filterData;
});
