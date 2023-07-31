import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'

function App() {
	const userEmail = 'daniele@test.com'
	const [tasks, setTasks] = useState(null)

	const getData = async () => {
		try {
			const responce = await fetch(`http://localhost:8000/todos/${userEmail}`)
			const data = await responce.json()
			setTasks(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	//Sort by date
	const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

	return (
		<div className='app'>
			<ListHeader listName='💡 To-Do List' getData={getData} />
			{sortedTasks?.map((task) => (
				<ListItem key={task.id} task={task} getData={getData} />
			))}
		</div>
	)
}

export default App
