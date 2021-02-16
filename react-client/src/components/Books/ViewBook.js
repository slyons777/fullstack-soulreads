import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Journal from '../Forum/Journal';

const ViewBook = ({ viewbook }) => {
	const [editing, setEditing] = useState(false);
	const [editTitle, setEditTitle] = useState('');
	const [editAuthor, setEditAuthor] = useState('');
	const [editCategory, setEditCategory] = useState('');
	const [editStatus, setEditStatus] = useState('');
	const [editIntention, setEditIntention] = useState('');

	useEffect(() => {
		setEditTitle(viewbook.title);
		setEditAuthor(viewbook.author);
		setEditCategory(viewbook.category);
		setEditStatus(viewbook.status);
		setEditIntention(viewbook.intention);
	}, [viewbook]);

	if (editing) {
		return (
			<div>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						const resp = await axios.put(`/api/books/${viewbook.id}/edit`, {
							title: editTitle,
							author: editAuthor,
							category: editCategory,
							status: editStatus,
							intention: editIntention,
						});
					}}
				>
					<label>
						Title
						<div>
							<input
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
							/>
						</div>
					</label>

					<label>
						Author
						<div>
							<input
								value={editAuthor}
								onChange={(e) => setEditAuthor(e.target.value)}
							/>
						</div>
					</label>

					<label>
						Category
						<div>
							<input
								value={editCategory}
								onChange={(e) => setEditCategory(e.target.value)}
							/>
						</div>
					</label>

					<div>
						<select
							value={editStatus}
							onChange={(e) => setEditStatus(e.target.value)}
						>
							<option>Status</option>
							<option value="Wishlist">Wishlist</option>
							<option value="Currently reading">Currently Reading</option>
							<option value="Purchased">Purchased</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
					<label>
						Intention
						<div>
							<input
								value={editIntention}
								onChange={(e) => setEditIntention(e.target.value)}
							/>
						</div>
					</label>
					<input className="btn" type="submit" value="Update" />
				</form>
				<button className="btn" onClick={() => setEditing(false)}>
					Back to View
				</button>
			</div>
		);
	} else {
		return (
			<div className="view-book">
				<p>{viewbook.title}</p>
				<p>Author: {viewbook.author}</p>
				<p>Category: {viewbook.category}</p>
				<p>ISBN: {viewbook.isbn}</p>
				<p>Intention: {viewbook.intention}</p>

				<button className="btn" onClick={() => setEditing(true)}>
					Edit
				</button>
				<Journal />
			</div>
		);
	}
};

export default ViewBook;
