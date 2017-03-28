(function() { // protect the lemmings

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET

	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	if (document.querySelector('.js-admin') != null) {
		// put the render function that you want to run for th admin page in here.
	}

	if (document.querySelector('.js-homepage') != null) {
		// put the render function that you want to run for th home page in here.
	}

	function render(todoItems) {
		const container = document.querySelector('.js-postlist');
		container.innerHTML = '';
		for (const todoItem of todoItems) {
			const li = document.createElement('li');
			li.innerHTML = `
${todoItem.data.todo}
			`;

			if (todoItem.data.isDone) {
				li.innerHTML += `<span class="glyphicon glyphicon-check todolist-icon js-todo-check green"></span>`
			}
			else {
				li.innerHTML += `<span class="glyphicon glyphicon-unchecked todolist-icon js-todo-check"></span>`
			}


			li.classList.add('list-group-item', 'todolist-item');

			container.appendChild(li);
			
			li.querySelector('.js-todo-check').addEventListener('click', (e) => {
				console.log(todoItem);
				let isDone;
				if (todoItem.data.isDone) {
					isDone = false;
				}
				else {
					isDone = true;
				}

				PUT('/api/post/' + todoItem.id, {isDone})
					.then((data) => {
						render(data);
					})
					.catch((e) => {
						alert(e)
					})
			})
			
		}

		if (todoItems.length === 0) {
			container.innerHTML = `
<li class="list-group-item">
No todoitems!
</li>
			`;
		}
	} // render


	GET('/api/posts')
		.then((todoItems) => {
			render(todoItems);
		});

	document.querySelector('.js-add-todo').addEventListener('click', (e) => {
		const input = document.querySelector('.js-todo-text');
		input.setAttribute('disabled', 'disabled');

		POST('/api/posts', {
			todo: input.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			render(data);
		});
	})

})();


