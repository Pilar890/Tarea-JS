import {
  cardUpcoming,
  cardsPast,
  attendanceMax,
  attendanceLow,
  capacityMax,
  upcomingEventsStatistics,
  pastEventsStatistics,
} from "./module/function.js";

const table = document.getElementById("table");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    const upcomingEvents = cardUpcoming(data.events, data.currentDate);
    const pastEvents = cardsPast(data.events, data.currentDate);
    const maxPercentage = attendanceMax(pastEvents);
    const lowPercentage = attendanceLow(pastEvents);
    const maxCap = capacityMax(data.events);
    const upcomingStatistics = upcomingEventsStatistics(upcomingEvents);
    const pastStatistics = pastEventsStatistics(pastEvents);

    const eventStatisticsContainer =
      document.getElementById("event-statistics");
    eventStatisticsContainer.innerHTML = `<tr>
        <td>"${maxPercentage.name}" with ${(
      (maxPercentage.assistance * 100) /
      maxPercentage.capacity
    ).toFixed(2)}%</td>
        <td>"${lowPercentage.name}" with ${(
      (lowPercentage.assistance * 100) /
      lowPercentage.capacity
    ).toFixed(2)}%</td>
        <td>"${maxCap.name}" with ${maxCap.capacity} capacity </td>
      </tr>`;
    const upcomingStatisticsContainer = document.getElementById(
      "upcoming-statistics"
    );
    const upcomingRows = upcomingStatistics[0]
      .map(
        (category, i) =>
          `<tr>
        <td>${category}</td>
        <td>$${upcomingStatistics[1][i]}</td>
        <td>${upcomingStatistics[2][i].toFixed(2)}%</td>
      </tr>`
      )
      .join("");
    upcomingStatisticsContainer.innerHTML = upcomingRows;
    console.log(upcomingRows);

    const pastStatisticsContainer = document.getElementById("past-statistics");
    const pastRows = pastStatistics[0]
      .map(
        (category, i) =>
          `<tr>
        <td>${category}</td>
        <td>$${pastStatistics[1][i]}</td>
        <td>${pastStatistics[2][i].toFixed(2)}%</td>
      </tr>`
      )
      .join("");
    pastStatisticsContainer.innerHTML = pastRows;
  })
  .catch((err) => {
    console.log(err);
    table.innerHTML = `<p class="text-center"> Error </p>`;
  });
