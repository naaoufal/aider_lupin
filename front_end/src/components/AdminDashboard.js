import { useEffect } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import NavBar from "./NavBar"

function AdminDashboard () {

    let history = useHistory()

    const token = localStorage.getItem('adminToken')
    const data = localStorage.getItem('admin')
    const dt = JSON.parse(data)

    // clear localStorage : 
    function clearSess () {
        localStorage.clear()
        history.push("/AdminLogin")
    }

    useEffect(() => {
        if(token){

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
                                <table></table>
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