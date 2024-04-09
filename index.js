import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=51.050407&lon=13.737262&appid=60cf715190ea39605b85ea6346af4879";

const myAPIkey = "#################################";
const config = {
  headers: { Authorization: `Bearer ${myAPIkey}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(apiURL);
    const data = response.data;

    const description = data.weather[0].description;
    const temp = data.main.temp;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const visibility = data.visibility;
    const wind = data.wind.speed;
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const todayDate = `${day}/${month}/${year}`;
    res.render("index.ejs", {
      description: description,
      temp: temp,
      visibility: visibility,
      todayDate: todayDate,
      temp_max: temp_max,
      temp_min: temp_min,
      wind: wind,
    });
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API:", error.response.data);
    res.status(500).send("Wystąpił błąd podczas pobierania danych z API.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
