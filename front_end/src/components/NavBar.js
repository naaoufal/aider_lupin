import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

function NavBar () {
    return (
        <div class="navbar navbar-inverse navbar-fixed-top headroom" >
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
                    <Link className="navbar-brand">LOGO</Link>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav pull-right">
                        <li class="active"><Link className="btn">Sign in</Link></li>
                        <li class="active"><Link className="btn">Sign up</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar