import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserDashboard () {

    let history = useHistory()

    const [productType, setType] = useState([])
    const data = localStorage.getItem('sellerInfo')
    const dt = JSON.parse(data)

    // clear session :
    function clearUserSess () {
        localStorage.clear()
        history.push("/UserLogin")
    }

    function renderProductType () {
        fetch("http://localhost:3001/api/productsType/all").then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setType(data)
        })
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
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Type</td>
                                            <td>Price</td>
                                            <td>Image</td>
                                            <td>Description</td>
                                        </tr>
                                    </thead>
                                </table>
                                <hr />
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                Add New Product
                                </button>
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter product name" className="form-control" id="name" required/>
                                            </div>
                                            <div className="form-group">
                                                <select className="form-control">
                                                {productType.map((i) => (
                                                    <option>Select Your Product Type</option>
                                                    <option>{i.name}</option>
                                                ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter product price" className="form-control" id="price" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="file" className="form-control" id="image" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter product description" className="form-control" id="desc" required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 className="thin">Pricing Select :</h3>
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