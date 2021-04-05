import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

function Success () {

    let history = useHistory()

    function returnHome () {
        localStorage.removeItem('productInfo')
        history.push("/Home")
    }

    return (
        <div className="container">
            <ol className="breadcrumb">
                <div className="row">
                    <article className="col-xs-12 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Confirmation</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body text-center">
                                    <h3 className="thin">Command Confirmation</h3>
                                    <hr />
                                    <p>Your Command is Done</p>
                                    <hr />
                                    <Link onClick={returnHome} className="btn btn-primary" >Back To Home</Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </ol>
        </div>
    )
}

export default Success