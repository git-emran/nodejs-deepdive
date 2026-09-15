import { appendFileSync, existsSync } from "fs"
import { createInterface } from "readline"

const PHONE_REGEX = /^\d+$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

const readLineAsync = (message) =>
  new Promise((resolve) => readline.question(message, resolve))

const readValidatedAsync = async (message, validationFn, errorMessage) => {
  while (true) {
    const input = await readLineAsync(message)
    if (validationFn(input)){
      return input
    }
    console.log(errorMessage)
  }
}

class Person {
  constructor(name = "", number = "", email = ""){
    this.name = name
    this.number = number
    this.email = email
    this.createdAt = new Date().toISOString()
  }
  saveToCSV(){
    const fileExists = existsSync("./contacts.csv")
    const content = `${this.name}, ${this.number}, ${this.email}, ${this.createdAt}\n`
    try {
      if (!fileExists){
        const header = "NAME, PHONE_NUMBER, EMAIL, CREATED_AT\n"
        appendFileSync("./contacts.csv", header + content)
      } else {
        appendFileSync("./contacts.csv", content)
      }
      console.log(`${this.name} Saved!`)
    } catch(err){
      console.error(err)
    }

  }
}

const startApp = async () => {
  let shouldContinue = true
  while (shouldContinue) {
    const name = await readLineAsync("Contact Name: ")
    const number = await readValidatedAsync (
      "Contact Number: ",
      (input) => PHONE_REGEX.test(input.trim()),
      "Invalid phone number! Please enter digits only"
    )
    const email = await readValidatedAsync(
      "Contact email: ",
      (input) => EMAIL_REGEX.test(input.trim()),
      "Invalid email format!"
    )

    const person = new Person(name, number, email)
    person.saveToCSV()
    const response = await readLineAsync("Continue? [y to continue]: ")
    shouldContinue = response.toLowerCase() === "y"
  }
  readline.close()
}
startApp()
