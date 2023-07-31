import { useState } from 'react'

const Modal = ({ mode, setShowModal, getData, task }) => {
	const editMode = mode === 'edit' ? true : false
	const [data, setData] = useState({
		user_email: editMode ? task.user_email : 'daniele@test.com',
		title: editMode ? task.title : null,
		progress: editMode ? task.progress : 50,
		date: editMode ? '' : new Date(),
	})

	const postData = async (e) => {
		e.preventDefault()
		try {
			const responce = await fetch(`http://localhost:8000/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (responce.status === 200) {
				console.log('Sent successfully!')
				setShowModal(false)
				getData()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const editData = (e) => {
		e.preventDefault()
		try {
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setData((data) => ({
			...data,
			[name]: value,
		}))
		console.log(data)
	}
	return (
		<div className='overlay'>
			<div className='modal'>
				<div className='form-title-container'>
					<h3>Let's {mode} your task</h3>
					<button onClick={() => setShowModal(false)}>X</button>
				</div>

				<form>
					<input
						type='text'
						required
						maxLength={30}
						placeholder=' Your task goes here'
						name='title'
						value={data.title}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='range'>Drag to select your current progress</label>
					<input
						type='range'
						required
						id='range'
						min={0}
						maxLength={100}
						name='progress'
						value={data.progress}
						onChange={handleChange}
					/>
					<input
						className={mode}
						type='submit'
						onClick={editMode ? '' : postData}
					/>
				</form>
			</div>
		</div>
	)
}
export default Modal
