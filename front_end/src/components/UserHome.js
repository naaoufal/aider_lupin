import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserHome () {

    let history = useHistory()
    const data = localStorage.getItem('buyerInfo')
    const dt = JSON.parse(data)

    function clearStorage() {
        localStorage.clear()
        history.push("/UserLogin")
    }

    function resetStatAndPoints () {
        fetch(`http://localhost:3001/api/users/edit/${dt._id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                userType : "user",
                numberOfSell : 0
            })
        })
    }

    useEffect(() => {
        resetStatAndPoints()
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
                        <li class="active"><Link onClick={clearStorage} className="btn">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <header id="head" class="secondary"></header>
        <div className="container">
            

            <header class="page-header">
                <img className="page-title" src="" />
            </header>

            <div className="jumbotron top-space">
                <h4>General Information :</h4>
                <p>ID : {dt._id}</p>
                <p>Full name : {dt.fullname}</p>
                <p>Email : {dt.email}</p>
            </div>
            
            <br /> <br />
            <div className="row">
                <div className="col-md text-center">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3 class="thin">All Products</h3>
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

export default UserHome