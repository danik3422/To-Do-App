import { useState } from 'react'
import Modal from './Modal'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'

const ListItem = ({ task, getData }) => {
	const [showModal, setShowModal] = useState(false)

	const deleteTask = async () => {
		try {
			const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
				method: 'DELETE',
			})
			if (response.status === 200) {
				getData()
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<li className='list-item'>
			<div className='info-container'>
				<TickIcon />
				<p className='task-title'>{task.title}</p>
				<ProgressBar />
			</div>
			<div className='button-container'>
				<button className='edit' onClick={() => setShowModal(true)}>
					EDIT
				</button>
				<button className='delete' onClick={deleteTask}>
					DELETE
				</button>
			</div>
			{showModal && (
				<Modal
					mode={'edit'}
					setShowModal={setShowModal}
					getData={getData}
					task={task}
				/>
			)}
		</li>
	)
}

export default ListItem
