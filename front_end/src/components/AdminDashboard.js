import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"

function AdminDashboard () {

    let history = useHistory()

    const token = localStorage.getItem('adminToken')
    const data = localStorage.getItem('admin')
    const dt = JSON.parse(data)
    const [buyers, setBuyers] = useState([])

    // clear localStorage : 
    function clearSess () {
        localStorage.clear()
        history.push("/AdminLogin")
    }

    useEffect(() => {
        if(token){
            fetch("http://localhost:3001/api/users/allBuyers").then(res => {
                return res.json()
            }).then(data => {
                //console.log(data)
                setBuyers(data)
            })
        } else {
            history.push("/AdminLogin")
        }
    })

    return (
        <body className="home">
            <div class="navbar navbar-inverse navbar-fixed-top headroom" >
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                        <Link className="navbar-brand">LOGO</Link>
                    </div>
                    <div class="navbar-collapse collapse">
                        <ul class="nav navbar-nav pull-right">
                            <li class="active"><Link onClick={clearSess} className="btn">Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <header id="head" className="secondary"></header>
            <div className="container">
                <ol className="breadcrumb">
                    <li><Link to="/AdminDashboard">Dashboard</Link></li>
                    <li class="active">Administrator access</li>
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
                                <h3 className="thin">Buyers Tables :</h3>
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
                                        {buyers.map( (i) => (
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
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 className="thin">Delivery Tables :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Fullname</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Status</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buyers.map( (i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.fullname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.stat}</td>
                                                <td><button className="btn btn-warning">Delete</button> <button className="btn btn-info">Edit</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 className="thin">Products Tables :</h3>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default AdminDashboard