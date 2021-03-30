import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserLogin () {

    let history = useHistory()
    const [em, setEmail] = useState([])
    const [ps, setPassword] = useState([])
    const [rl, setRole] = useState([])

    function submitBuyer () {
        fetch("http://localhost:3001/api/users/allUser").then(res => {
            return res.json()
        }).then(data => {
            data.map(i => {
                //console.log(i)
                if(i.email == em && i.password == ps && i.role == rl) {
                    //console.log(i)
                    if(rl == "seller") {
                        //console.log(i)
                        if(i.is_reseted == false) {
                            localStorage.setItem('resetInfo', JSON.stringify(i))
                            history.push("/SellerReset")
                        } else {
                            localStorage.setItem('sellerInfo', JSON.stringify(i))
                            history.push("/SellerDashboard")
                        }
                    } else {
                        //console.log(i)
                        localStorage.setItem('buyerInfo', JSON.stringify(i))
                        history.push("/Home")
                    }
                }
            })
        })
    }

    return (
        <div className="container">
            <ol class="breadcrumb">
                <li><Link to="#">Home</Link></li>
                <li class="active">User Access</li>
                <div className="row">
                    <article class="col-xs-12 maincontent">
                        <header class="page-header">
                            <h1 class="page-title">Sign in</h1>
                        </header>
                        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <h3 class="thin text-center">User Panel</h3>
                                    <hr />
                                    <div>
                                        <div class="top-margin">
                                            <label>Email <span class="text-danger">*</span></label>
                                            <input onChange={event => setEmail(event.target.value)} type="text" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <label>Password <span class="text-danger">*</span></label>
                                            <input onChange={event => setPassword(event.target.value)} type="password" class="form-control" required />
                                        </div>
                                        <div class="top-margin">
                                            <select className="form-control" onChange={event => setRole(event.target.value)}>
                                                <option>Select Your Option</option>
                                                <option value="seller">Seller</option>
                                                <option value="buyer">Buyer</option>
                                            </select>
                                        </div>

                                        <hr/>

                                        <div class="row">
                                            <div class="col-lg-8">
                                            <Link to="/UserRegister">Create New Account</Link>
                                            </div>
                                            <div class="col-lg-4 text-right">
                                                <button onClick={submitBuyer} class="btn btn-action" type="submit">Sign in</button>
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

export default UserLogin