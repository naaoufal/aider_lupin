import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import NavBar from "./NavBar"

function SuperAdminDashboard () {

    const [stat , setStatus] = useState()
    const [sellers, setSellers] = useState([])
    let history = useHistory([])
    const [admin, setAdmins] = useState([])
    const [productType, setType] = useState([])
    const token = localStorage.getItem('tokenaccess')
    const data = localStorage.getItem('adminInfo')
    const dt = JSON.parse(data)

    function renderAdminData () {
        fetch("http://localhost:3001/api/admins/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setAdmins(data)
        })
    }

    function renderTypeData () {
        fetch("http://localhost:3001/api/productsType/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setType(data)
        })
    }

    useEffect(() => {

        if (token) {
            
            // render sellers data:
            fetch("http://localhost:3001/api/users/allSellers").then(res => {
                return res.json()
            }).then(data => {
                setSellers(data)
            })

            renderAdminData()
            renderTypeData()

        } else {
            history.push("/SuperAdminLogin")
        }
    }, [])

    // add new admin:
    function addNewAdmin () {
        const name = document.querySelector('#full').value
        const em = document.querySelector('#email').value
        const ph = document.querySelector('#phone').value
        const ps = document.querySelector('#password').value
        //console.log(name, em, ph, ps)
        fetch("http://localhost:3001/api/admins/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                fullname : name,
                email : em,
                phone : ph,
                password : ps,
                is_reseted : false,
                stat : false
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data.message)
            if(data.message == "Email send to admin"){
                alert("Admin Added Successfully")
                window.location.reload()
            } else {
                alert("Error")
                window.location.reload()
            }
        })
    }

    function addNewType () {
        const nm = document.querySelector('#name').value

        fetch("http://localhost:3001/api/productsType/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                name : nm
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            if(data){
                alert("Type Added Successfully")
                window.location.reload()
            } else {
                alert("Error")
                window.location.reload()
            }
        })
    }

    // patch on stat of admin only !!! :
    function editStat (id) {
        fetch(`http://localhost:3001/api/admins/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                stat : false
            })
        }).then(res => {
            window.location.reload()
        })
    }

    // edit product type:
    function editType (id) {
        const nm = document.querySelector('#nameType').value
        console.log(nm, id)
        // fetch(`http://localhost:3001/api/productsType/edit/${id}`, {
        //     method : 'PATCH',
        //     headers : {
        //         'Content-Type' : 'application/json',
        //         'Authorization' : 'Bearer ' + token
        //     },
        //     body : JSON.stringify({
        //         name : nm
        //     })
        // }).then(res => {
        //     return res.json()
        // }).then(data => {
        //     console.log(data)
        // })
    }

    // enable admin account:
    function enableAd (id) {
        fetch(`http://localhost:3001/api/admins/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                stat : true
            })
        }).then(res => {
            window.location.reload()
        })
    }

    // delete an admin:
    function deleteAdmin (id) {
        fetch(`http://localhost:3001/api/admins/delete/${id}`, {
            method : 'DELETE',
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            window.location.reload()
        })
    }

    return (
        <body className="home">
            <NavBar />
            <header id="head" class="secondary"></header>
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="/SuperDashboard">Dashboard</Link></li>
                    <li class="active">Super administrator access</li>
                </ol>

                <header class="page-header">
                    <h1 class="page-title">Dashboard</h1>
                </header>

                <div className="jumbotron top-space">
                    <h4>General Information :</h4>
                    <p>Full name : {dt.fullname}</p>
                    <p>Email : {dt.email}</p>
                </div>
                
                <br /> <br />
                <div className="row">
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Administrator Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>full name</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Password</td>
                                            <td>Is_Reseted</td>
                                            <td>Status</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admin.map( (i) => (
                                        <tr>
                                            <td>{i._id}</td>
                                            <td>{i.fullname}</td>
                                            <td>{i.email}</td>
                                            <td>{i.phone}</td>
                                            <td>{i.password}</td>
                                            <td>{JSON.stringify(i.is_reseted)}</td>
                                            <td>{JSON.stringify(i.stat)}</td>
                                            <td> { i.stat ?
                                                <button onClick={() => editStat(i._id)} className="btn btn-warning">Desable</button>
                                                :
                                                <button onClick={() => enableAd(i._id)} className="btn btn-warning">Enable</button> 
                                                }
                                                 <button onClick={() => deleteAdmin(i._id)} className="btn btn-info">Delete</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <hr />
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                Add New Administrator
                                </button>
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Administrator</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin full name" className="form-control" id="full" required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" placeholder="Enter admin email" className="form-control" id="email" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin phone" className="form-control" id="phone" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" placeholder="Enter admin password" className="form-control" id="password" required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addNewAdmin} class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Sellers Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Fullname</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Password</td>
                                            <td>Is_Reseted</td>
                                            <td>Role</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellers.map( (i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.fullname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.password}</td>
                                                <td>{JSON.stringify(i.is_reseted)}</td>
                                                <td>{i.role}</td>
                                                <td><button className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Products Type Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productType.map((i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.name}</td>
                                                <td><button type="button" data-toggle="modal" data-target="#exampleEdit" onClick={() => editType(i._id)} className="btn btn-info">Edit</button> <button className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#example1">
                                Add New Type
                                </button>
                                {/* modal to add new type */}
                                <div class="modal fade" id="example1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Type</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Type Name" className="form-control" id="name" required/>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addNewType} class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal to edit a type */}
                                <div class="modal fade" id="exampleEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Type</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Type Name" className="form-control" id="nameType" required/>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={editType} class="btn btn-primary">Edit</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default SuperAdminDashboard