import { appendFileSync } from "fs"
import { createInterface } from "readline"
import { promisify } from "util"


const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

const readLineAsync = promisify(readline.question).bind(rl)
(async () => {
  try {
    const name = await readLineAsync('what is your name ?')
    console.log(`Hello ${name}`)
  } catch (err) {
    console.error('Error:', err.message)
  }finally {
    readline.close()
  }
})

class Person {
  constructor(name = "", number = "", email = ""){
    this.name = name
    this.number = number
    this.email = email
  }
  saveToCSV(){
    const content = `${this.name}, ${this.number}, ${this.email}\n`
    try {
      appendFileSync("./contacts.csv", content)
      console.log(`${this.name} Saved!`)
    } catch(err){
      console.error(err)
    }

  }
}

const startApp = async () => {
  let shouldContinue = true
  while ( shouldContinue ) {
    const name = await readLineAsync("Contact Name: ")

  }
}
