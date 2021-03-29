import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserRegister () {

    const [fullname, setFullname] = useState([])
    const [phone, setPhone] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [role, setRole] = useState([])

    function submitUser () {
        console.log(role)
    }

    useEffect(() => {

    })

    return (
        <div className="container">
            <ol class="breadcrumb">
                <li><Link to="#">Home</Link></li>
                <li class="active">User Access</li>
                <div className="row">
                    <article class="col-xs-12 maincontent">
                        <header class="page-header">
                            <h1 class="page-title">Sign up</h1>
                        </header>
                        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <h3 class="thin text-center">User Panel</h3>
                                    <hr />
                                    <div>
                                    <div class="top-margin">
                                            <label>Fullname <span class="text-danger">*</span></label>
                                            <input onChange={event => setFullname(event.target.value)} type="text" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <label>Phone <span class="text-danger">*</span></label>
                                            <input onChange={event => setPhone(event.target.value)} type="text" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <label>Email <span class="text-danger">*</span></label>
                                            <input onChange={event => setEmail(event.target.value)} type="text" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <label>Password <span class="text-danger">*</span></label>
                                            <input onChange={event => setPassword(event.target.value)} type="password" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <select onChange={event => setRole(event.target.value)} className="form-control">
                                                <option>Select Your Option</option>
                                                <option value="seller">Seller</option>
                                                <option value="buyer">Buyer</option>
                                            </select>
                                        </div>
                                        <hr/>
                                        <div class="row">
                                            <div class="col-lg-8">
                                            </div>
                                            <div class="col-lg-4 text-right">
                                                <button onClick={submitUser} class="btn btn-action" type="submit">Sign up</button>
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

export default UserRegister