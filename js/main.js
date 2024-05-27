// main.js
const fetchPlants = async (page) => {
  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/observations?taxon_id=47126&per_page=100&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const loadPlants = async () => {
  const plantasContainer = document.getElementById("plantas-container");
  let page = 1;
  let plantsWithPhotos = [];
  const maxPlants = 25;

  while (plantsWithPhotos.length < maxPlants) {
    const plants = await fetchPlants(page);
    if (plants.length === 0) break;

    plants.forEach((plant) => {
      if (
        plant.photos &&
        plant.photos.length > 0 &&
        plantsWithPhotos.length < maxPlants
      ) {
        const colDiv = document.createElement("div");
        colDiv.className = "col";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card h-100";

        const plantImage = document.createElement("img");
        plantImage.className = "card-img-top";
        plantImage.src = plant.photos[0].url.replace("square", "medium");
        plantImage.alt = plant.taxon.name;

        const cardBody = document.createElement("div");
        cardBody.className = "card-bodyy";

        const plantName = document.createElement("h5");
        plantName.className = "card-title";
        plantName.textContent = plant.taxon.name;

        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.textContent = "Buy";

        cardBody.appendChild(plantName);
        cardFooter.appendChild(button);

        cardDiv.appendChild(plantImage);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(cardFooter);

        colDiv.appendChild(cardDiv);

        plantasContainer.appendChild(colDiv);
        plantsWithPhotos.push(plant);
      }
    });

    page += 1;
  }
};

loadPlants();
