import { useEffect } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"

function AdminDashboard () {

    let history = useHistory()

    const token = localStorage.getItem('adminToken')
    const data = localStorage.getItem('admin')
    const dt = JSON.parse(data)

    //console.log(token)

    useEffect(() => {
        if(token){

        } else {
            history.push("/NormalAdmin")
        }
    })

    return (
        <body className="home">
            <NavBar />
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