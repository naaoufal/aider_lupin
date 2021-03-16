import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import NavBar from "./components/NavBar"

function SuperAdminDashboard () {

    let history = useHistory()
    const [admins, setAdmins] = useState()
    const token = localStorage.getItem('tokenaccess')
    const data = localStorage.getItem('adminInfo')

    useEffect(() => {
        if (token) {
            function renderAdminData () {
                console.log(data)
            }

            renderAdminData()

        } else {
            history.push("/SuperAdminLogin")
        }
    }, [])

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
                    <p>Full name : {}</p>
                    <p>Email : {}</p>
                </div>
                
                <br /> <br />
                <div className="row">
                    <div className="col-md-6 text-center">
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>123</td>
                                            <td>123</td>
                                            <td>123</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                <button className="btn btn-primary">Add New</button>
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