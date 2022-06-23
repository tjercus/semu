import { opine } from "https://deno.land/x/opine@2.2.0/mod.ts";
import { Client } from "https://deno.land/x/mqtt/deno/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Telegram } from "./types.ts";
import { makeView } from "./view.ts";
import { makeViewModel } from "./model.ts";
import {parseAsTelegram} from "./utils.ts";

const env = config();
const server = opine();

// MQTT topic root for my house
const TOPIC_ROOT = env["TOPIC_ROOT"] || "house";
// MQTT topic root for the group of smart energy meter apps
const DOMAIN_ROOT = "SEM";

/* --------------------------------------------------------------------------- */

let db: Array<Telegram> = [];

/* --------------------------------------------------------------------------- */

// MQTT broker URL defaults to localhost when none from .env file
const mqttClient = new Client({ url: env["MQTT_BROKER_URL"] });
await mqttClient.connect();
await mqttClient.subscribe(`${TOPIC_ROOT}/${DOMAIN_ROOT}/telegram`);

mqttClient.on("message", (_topic: string, payload: Uint8Array) => {
  const telegram = parseAsTelegram(payload); // uint8array to string to JS
  db = db.concat(telegram);
});

server.get("/", (req, res) => {
  res.send(makeView(makeViewModel(db, TOPIC_ROOT)));
});

server.get("/all", (req, res) => {
  res.send(db);
});

server.listen(
  3000,
  () => console.log("HTTP server has started on http://localhost:3000 🚀"),
);
