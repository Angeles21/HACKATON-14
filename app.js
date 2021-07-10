let infoUser = [];

getInfo();
async function getInfo() {
	try {
		const infoUsers = await fetch("http://localhost:3000/users");
		let infoUser = await infoUsers.json();

		const list = document.getElementById("list");
		let template = "";
		infoUser.forEach((user) => {
			template += `
			<div id="${user.id}"" class="item col-md-3 col-6">
				<div class="p-2 product-block">
					<div class="d-flex justify-content-between">
						<div class="hover" data-toggle="modal" data-target="#modalEdit${user.id}">
							<i class="bi bi-pencil-square"></i><br />
							
						</div>
						<div class="hover" data-toggle="modal" data-target="#modalSupr${user.id}">
							<i class="bi bi-x-circle"></i><br />
							
						</div>
					</div>
					<img class="img-fluid" src="" alt="" />
					<div class="caption">
						<h5>Name : ${user.name}</h5>
						<h6>Username : ${user.username}</h6>
						<hr>
						<div>E-mail : ${user.email}</div>
						<hr>
						<div>Address : ${user.address.street}</div>
					</div>
					<!-- DELETE-->
					<div
						class="modal fade"
						id="modalSupr${user.id}"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete User o</h5>
                            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"> Are your sure you want to erase: # ${user.id} - ${user.username} ?</div>
                        <div class="modal-footer">
                            <div class="row">
                                <div class="col">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL</button>
                                </div>
                                <div class="col">
                                    <button  type="button" class="btn btn-red" onclick="erase(${user.id});return false;"  data-dismiss="modal">DELETE</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
					</div>
					<!-- EDIT-->
					<div
						class="modal fade"
						id="modalEdit${user.id}"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Edit user/h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="CLOSE">
										<span aria-hidden="true"></span>
									</button>
								</div>
								<div class="modal-body">
									<input class="form-control" type="text" id="id${user.id}" placeholder="Add ID" value="${user.id}" readonly />
									<input class="form-control" type="text" id="name${user.id}" placeholder="Add name" value="${user.name}"/>
									<input class="form-control" type="text" id="username${user.id}" placeholder="Add username" value="${user.username}" />
									<input class="form-control" type="text" id="email${user.id}" placeholder="Add e-mail" value="${user.email}"/>
									<input class="form-control" type="text" id="street${user.id}" placeholder="Add street" value="${user.address.street}"/>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
									<button type="button" class="btn btn-red" data-dismiss="modal" onclick="update(
										document.getElementById('id${user.id}').value,
										document.getElementById('name${user.id}').value,
										document.getElementById('username${user.id}').value,
										document.getElementById('email${user.id}').value,
										document.getElementById('street${user.id}').value,
								
										)" >update</button>
										
								</div>
							</div>
						</div>
					</div>
		
				</div>
			</div>

									`;
		});
		list.innerHTML = template;
	} catch (error) {
		console.log(error);
	}
}

/************/

const update = async (id, name, username, email, street) => {
	alert("Updating: " + id);

	event.preventDefault();
	try {
		const dato = {
			id: id,
			name: name,
			username: username,
			email: email,
			address: {
				street: street,
			},
		};
		console.log(dato);

		const url = `http://localhost:3000/users/${id}`;

		const params = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(dato),
		};
		const upData = await fetch(url, params);
		const result = await upData.json();
		console.log(result);
		getInfo();
	} catch (err) {
		console.log(err);
	}
};

const erase = async (id) => {
	window.event.preventDefault();
	console.log(id);

	try {
		const url = `http://localhost:3000/users/${id}`;
		const parans = {
			method: "DELETE",
		};
		const data = await fetch(url, parans);
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

const addInfo = async () => {
	event.preventDefault();
	try {
		const dato = {
			name: document.getElementById("name").value,
			username: document.getElementById("username").value,
			email: document.getElementById("email").value,
			address: {
				street: document.getElementById("street").value,
			},
		};
		console.log(dato);

		const url = "http://localhost:3000/users";

		const params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: JSON.stringify(dato),
		};
		const data = await fetch(url, params);
		const result = await data.json();
		console.log(result);
		getInfo();
	} catch (err) {
		console.log(err);
	}
};

async function addInfox() {
	try {
		const infoUsers = await fetch("http://localhost:3000/users");

		let infoUser = await infoUsers.json();

		let hola = "hola";

		const infoUserMODAL = {
			id: infoUser.length + 1,
			name: document.getElementById("name").value,
			username: document.getElementById("username").value,
			email: document.getElementById("email").value,
			address: {
				street: document.getElementById("street").value,
			},
		};

		infoUser = [...infoUser, infoUserMODAL];

		document.getElementById("id").value = "";
		document.getElementById("name").value = "";
		document.getElementById("username").value = "";
		document.getElementById("email").value = "";
		document.getElementById("street").value = "";

		let template = "";
		infoUser.forEach((user) => {
			template += `

			<div id="${user.id}"" class="item col-md-3 col-6">
				<div class="p-2 product-block">
					<div class="d-flex justify-content-between">
						<div data-toggle="modal" data-target="#modalEdit${user.id}">
							<i class="bi bi-pencil-square"></i><br />
							edit
						</div>
						<div data-toggle="modal" data-target="#modalSupr${user.id}">
							<i class="bi bi-x-circle"></i><br />
						</div>
					</div>
					<img class="img-fluid" src="" alt="" />
					<div class="caption">
						<h5>name : ${user.name}</h5>
						<h6>username : ${user.username}</h6>
						<div>email : ${user.email}</div>
						<div>address : ${user.address.street} </div>
					</div>

					<div
						class="modal fade"
						id="modalSupr${user.id}"
						tabindex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body"> Are you sure you want to delete: # ${user.id} - ${user.username} ?</div>
								<div class="modal-footer">
									<div class="row">
										<div class="col">
											<button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
										</div>
										<div class="col">
											<button type="button" class="btn btn-red" onclick="erase(${user.id})" data-dismiss="modal">Delete User</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
		
					<div
						class="modal fade"
						id="modalEdit${user.id}"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Edit user</h5>
									<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true"></span>
									</button>
								</div>
								<div class="modal-body">
									<input class="form-control" type="text" id="id${user.id}" placeholder="Add ID" value="${user.id}" readonly />
									<input class="form-control" type="text" id="name${user.id}" placeholder="Add name" value="${user.name}"/>
									<input class="form-control" type="text" id="username${user.id}" placeholder="Add username" value="${user.username}" />
									<input class="form-control" type="text" id="email${user.id}" placeholder="Add e-mail" value="${user.email}"/>
									<input class="form-control" type="text" id="street${user.id}" placeholder="Add street" value="${user.address.street}"/>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
									<button type="button" class="btn btn-red" data-dismiss="modal">SAVE</button>
								</div>
							</div>
						</div>
					</div>
			
				</div>
			</div>
		
									`;
		});
		list.innerHTML = template;
	} catch (error) {
		console.log(error);
	}
}
