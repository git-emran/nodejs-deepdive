import Fastify from "fastify";
import menudata from "./data/menudata.js";
import ejs from 'ejs'
import operatingHours from "./data/operatingHours.js";
import fastifyView from "@fastify/view";

const app = Fastify()

app.register(fastifyView, {
  engine: {
    ejs: ejs
  }
})

function test(req, reply) {
  reply.view("views/index.ejs", {name: "whats fair is Fair"})
}

function appMenu(req, reply){
  reply.view("views/menu.ejs", {menudata})
}

function appHours(req, reply){
  const days = [
    "monday",
    "tuesday", 
    "wednesday",
    "friday",
    "saturday",
    "sunday"
  ]
  reply.view("views/hours.ejs", {operatingHours, days})
}

app.get("/",test)
app.get("/menu",appMenu)
app.get("/hours",appHours)


app.listen({port: 3000},(err, address) => {
  if (err) throw err
  console.log(`Server running at ${address}`)
})
