import { Chart } from "chart.js/auto";

export function generateChart(canvas) {
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Food",
        "Transport",
        "Entertainment",
        "Bills",
        "Shopping",
        "Health",
        "Other",
      ],
      datasets: [
        {
          label: "Sales",
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: [
            "#4E79A7",
            "#A0CBE8",
            "#F28E2B",
            "#FFBE7D",
            "#59A14F",
            "#8CD17D",
            "#B6992D",
          ],
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
      },
    },
  });
}
