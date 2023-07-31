const PORT = process.env.PORT || 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const pool = require('./db')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Get all tasks
app.get('/todos/:userEmail', async (req, res) => {
	const userEmail = req.params.userEmail
	try {
		const todos = await pool.query(
			'SELECT * FROM todos WHERE user_email = $1',
			[userEmail]
		)
		res.json(todos.rows)
	} catch (error) {
		console.log(error)
	}
})

//Create a new task
app.post('/todos', async (req, res) => {
	const { user_email, title, progress, date } = req.body
	console.log(user_email, title, progress, date)
	const id = uuidv4()
	try {
		const newTask = await pool.query(
			`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)`,
			[id, user_email, title, progress, date]
		)
		res.json(newTask)
	} catch (error) {
		console.log(error)
	}
})

//Edit task
app.put('')

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`)
})
