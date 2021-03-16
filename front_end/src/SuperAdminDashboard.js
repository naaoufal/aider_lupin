import { Link } from "react-router-dom"
import NavBar from "./components/NavBar"

function SuperAdminDashboard () {
    return (
        <div>
            <NavBar />
            <header id="head" class="secondary"></header>
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="/SuperDashboard">Dashboard</Link></li>
                    <li class="active">Super administrator access</li>
                </ol>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Can I use it to build a site for my client?</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminDashboard