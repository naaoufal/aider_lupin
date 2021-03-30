import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function SellerReset () {

    let history = useHistory()
    const [ps, setPs] = useState()
    const [psConfirm, setPsConfirm] = useState()
    const data = JSON.parse(localStorage.getItem('resetInfo'))

    function ResetAd () {

        if(ps == psConfirm) {
            
            fetch(`http://localhost:3001/api/users/edit/${data._id}`, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    password : psConfirm,
                    is_reseted : true
                })
            }).then(res => {
                return res.json()
            }).then(data => {
                //console.log(data)
                if(data) {
                    alert("Your Password is Reseted Successfully")
                    history.push("/UserLogin")
                    localStorage.clear('resetInfo')
                } else {
                    alert("Error")
                    history.push("/SellerReset")
                }
            })

        } else {
            alert("Password Are Not Match !!!")
        }
    }

    return (
        <div className="container">
            <ol className="breadcrumb">
                <li className="active">Admin Reset Panel</li>
                <div className="row">
                    <article className="col-xs-12 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Reset Password</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h3 className="thin text-center">Type Your New Password</h3>
                                    <hr />
                                    <div>
                                        <div className="top-margin">
                                            <label>Enter Password <span className="text-danger">*</span></label>
                                            <input onChange={event => setPs(event.target.value)} type="password" className="form-control" required />
                                        </div>
                                        <div className="top-margin">
                                            <label>Confirm Password <span classNameName="text-danger">*</span></label>
                                            <input onChange={event => setPsConfirm(event.target.value)} type="password" className="form-control" required />
                                        </div>

                                        <hr/>

                                        <div className="row">
                                            <div className="col-lg-8">
                                            </div>
                                            <div className="col-lg-4 text-right">
                                                <button onClick={ResetAd} className="btn btn-action" >Reset</button>
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

export default SellerReset