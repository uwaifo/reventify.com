import nats from "node-nats-streaming";
import colors from "colors";
colors.enable();

console.clear();

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("Publisher connected on NATS");

  const data = JSON.stringify({
    id: "001",
    title: "#endsars concert",
    price: 20,
  });

  client.publish("ticket:created", data, () => {
    console.log(colors.blue.bold("Event published"));
  });
});
