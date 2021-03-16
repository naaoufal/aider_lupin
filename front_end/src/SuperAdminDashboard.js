import { Link } from "react-router-dom"
import NavBar from "./components/NavBar"

function SuperAdminDashboard () {
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
                
                <br /> <br />
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Administrator Table :</h3>
                                <hr />
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