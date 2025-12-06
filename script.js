const API_URL = "https://sheetdb.io/api/v1/6dmklr71ru3mu";

  fetch(API_URL)
    .then(res => res.json())
    .then(masjids => {

      // Sort by Jummah time (optional)
      masjids.sort((a, b) =>  new Date("1970/01/01 " + b.jummah) - new Date("1970/01/01 " + a.jummah));

      // Jummah Timings
      document.getElementById("jummah-times").innerHTML =
        masjids.map(m => `
          <div class="list-item">
            <strong>${m.name}</strong>
            <span>${m.jummah}</span>
          </div>
        `).join("");

      // Masjid List
      document.getElementById("mosque-list").innerHTML =
        masjids.map(m => `
          <div class="list-item">
            <div>
              <h3>${m.name}</h3>
              <p>${m.area}</p>
              <p>${m.address}</p>
              <p><strong>Jummah:</strong> ${m.jummah}</p>
            </div>
            <a class="btn" href="${m.maps}" target="_blank">Open Maps</a>
          </div>
        `).join("");
    })
    .catch(() => {
      document.getElementById("mosque-list").innerHTML =
        "<p class='error'>Error loading data. Please refresh.</p>";
    });