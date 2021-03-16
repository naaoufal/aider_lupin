import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function SuperAdminLogin () {

    let history = useHistory()

    const [em, setEmail] = useState()
    const [pass, setPass] = useState()

    // login function:
    function clickLog () {
        fetch("http://localhost:3001/api/superadmins/auth", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : em,
                password : pass
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            localStorage.setItem('tokenaccess', data.accessToken)
            fetch("http://localhost:3001/api/superadmins/all", {
                headers : {
                    'Authorization' : 'Bearer ' + data.accessToken
                }
            }).then(res => {
                return res.json()
            }).then(superAdmin => {
                superAdmin.map(info => {
                    //console.log(info.email, info.password)
                    if(info.email == em && info.password == pass) {
                        localStorage.setItem('adminInfo', JSON.stringify(info))
                        //console.log("super admin found")
                        history.push("/SuperDashboard")
                    } else {
                        console.log("Error")
                    }
                })
                
                
            })
        })
    }

    return (
            <div className="container">
                <ol className="breadcrumb">
                    <li><Link to="#">Home</Link></li>
                    <li className="active">Super Admin access</li>
                    <div className="row">
                        <article className="col-xs-12 maincontent">
                            <header className="page-header">
                                <h1 className="page-title">Sign in</h1>
                            </header>
                            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h3 className="thin text-center">Super Admin Panel</h3>
                                        <hr />
                                        <div>
                                            <div className="top-margin">
                                                <label>Email <span className="text-danger">*</span></label>
                                                <input onChange={event => setEmail(event.target.value)} type="text" className="form-control" required />
                                            </div>
                                            <div className="top-margin">
                                                <label>Password <span classNameName="text-danger">*</span></label>
                                                <input onChange={event => setPass(event.target.value)} type="password" className="form-control" required />
                                            </div>

                                            <hr/>

                                            <div className="row">
                                                <div className="col-lg-8">
                                                </div>
                                                <div className="col-lg-4 text-right">
                                                    <button className="btn btn-action" onClick={clickLog} >Sign in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </ol>
            </div>
    )
}

export default SuperAdminLogin