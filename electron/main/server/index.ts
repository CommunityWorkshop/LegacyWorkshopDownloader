import express from "express";
import downloadFile from "../utils/downloadFile";
import getItemDetails from "../utils/itemDetails";
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const port = 2550;
const HOST = "0.0.0.0";

export default function startServer() {
  console.log(`starting the server on port ${port}...`);

  // ? Handle initial user request
  app.get("/download/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const itemDetails = await getItemDetails(itemId, ["appId"]);

    if (itemDetails.appId) {
      console.log("App Id is 🆔 : ", itemDetails.appId);
      try {
        const fileLocation = await downloadFile(itemDetails.appId, itemId);
        res.status(200).send(fileLocation);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(404).send("No game found for this workshop item");
    }
  });

  app.get("/details/:itemId", async (req, res) => {
    const itemId = req.params.itemId;
    const itemDetails = await getItemDetails(itemId);
    res.json(itemDetails);
  });

  app.listen(port, HOST);
}
