import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import NavBar from "./components/NavBar"

function SuperAdminDashboard () {

    const [stat , setStatus] = useState()
    let history = useHistory([])
    const [admin, setAdmins] = useState([])
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

    useEffect(() => {

        if (token) {
            
            renderAdminData()

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
            //console.log(data.message)
            if(data.message == "Email send to participant"){
                alert("Admin Added Successfully")
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
                                            <td>Action</td>
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
                    <div className="col-md-6 text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Sellers Table :</h3>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default SuperAdminDashboard