import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';

function NavBar () {

    let history = useHistory()

    // clear localstorage:
    function clearStorage () {
        localStorage.clear()
        history.push("/SuperAdminLogin")
    }

    return (
        <div class="navbar navbar-inverse navbar-fixed-top headroom" >
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    <Link className="navbar-brand">LOGO</Link>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav pull-right">
                        <li class="active"><Link onClick={clearStorage} className="btn">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar