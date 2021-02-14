import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
// import EditPost from './EditPost';

const Soulchat = () => {
	const [posts, setPosts] = useState([]);

	async function getForums() {
		const resp = await axios.get('/api/forum/soulchat');
		console.log(resp.data);
		setPosts(resp.data.posts);
	}

	return (
		<div className="soulchat-container">
			<h1>Soulchat</h1>
			<button onClick={getForums}>Get Posts</button>
			<div className="soulchat-posts">
				<ul>
					{posts.length !== 0 &&
						posts.map((post) => (
							<li>
								<div key={post.id}>
									<h4>{post.Book.title}</h4>
									<h5>Author: {post.Book.author}</h5>
									<h5>Status: {post.Book.status}</h5>
									<h6>{post.description}</h6>
									<button
										onClick={async (e) => {
											let postId = post.id;
											const resp = await axios
												.post(`/api/forum/${postId}/delete`, postId)
												.then(() => getForums());
										}}
									>
										Delete Post
									</button>
									<button>Edit Post</button>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default Soulchat;
