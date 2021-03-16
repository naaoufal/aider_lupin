import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function SuperAdminLogin () {
    return (
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="#">Home</Link></li>
                    <li class="active">Super Admin access</li>
                    <div className="row">
                        <article class="col-xs-12 maincontent">
                            <header class="page-header">
                                <h1 class="page-title">Sign in</h1>
                            </header>
                        </article>
                    </div>
                </ol>
            </div>
    )
}

export default SuperAdminLogin