import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserDashboard () {

    let history = useHistory()

    const data = localStorage.getItem('sellerInfo')
    const dt = JSON.parse(data)

    // clear session :
    function clearUserSess () {
        localStorage.clear()
        history.push("/UserLogin")
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
                <ol className="breadcrumb">
                    <li><Link to="/AdminDashboard">Dashboard</Link></li>
                    <li class="active">User access</li>
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
                                <h3 className="thin">Products Tables :</h3>
                                <hr />
                                <table>
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td></td>
                                        </tr>
                                    </thead>
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
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default UserDashboard