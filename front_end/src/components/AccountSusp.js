import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function AccountSuspend () {
    
    let history = useHistory()

    function clearUserSess () {
        localStorage.clear()
        history.push("/AdminLogin")
    }

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
                            <li class="active"><Link onClick={clearUserSess} className="btn">Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <header id="head" className="secondary"></header>
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="#">Suspended</Link></li>
                    <li class="active">Admin access</li>
                    <div className="row">
                        <article class="col-xs-12 maincontent">
                            <header class="page-header">
                                <h1 class="page-title">Account Status</h1>
                            </header>
                            <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                                <div class="panel panel-default">
                                    <div class="panel-body text-center">
                                        <h3 class="thin text-center">Your Account is Suspended</h3>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </ol>
            </div>
        </body>
    )
}

export default AccountSuspend