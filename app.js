const form = document.getElementById("habitForm");
const chartCanvas = document.getElementById("chart");
let data = JSON.parse(localStorage.getItem("lifePatterns")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const entry = {
    date: document.getElementById("date").value,
    sleep: Number(document.getElementById("sleep").value),
    work: Number(document.getElementById("work").value),
    exercise: Number(document.getElementById("exercise").value),
    mood: Number(document.getElementById("mood").value),
  };

  data.push(entry);
  localStorage.setItem("lifePatterns", JSON.stringify(data));
  form.reset();
  renderChart();
});

function renderChart() {
  const labels = data.map(d => d.date);
  const sleepData = data.map(d => d.sleep);
  const moodData = data.map(d => d.mood);

  if (window.chart) window.chart.destroy();

  window.chart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Sleep (hours)",
          data: sleepData,
          borderWidth: 2,
        },
        {
          label: "Mood",
          data: moodData,
          borderWidth: 2,
        }
      ]
    }
  });
}

renderChart();
