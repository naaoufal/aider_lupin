import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

function AdminDashboard () {

    let history = useHistory()

    const token = localStorage.getItem('adminToken')
    const data = localStorage.getItem('admin')
    const dt = JSON.parse(data)
    const [buyers, setBuyers] = useState([])
    const [delivery, setDelivery] = useState([])
    const [products, setProducts] = useState([])

    // clear localStorage : 
    function clearSess () {
        localStorage.clear()
        history.push("/AdminLogin")
    }

    // fetch for delivery data
    function fetchDelivery () {
        fetch("http://localhost:3001/api/delivery/all").then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setDelivery(data)
        })
    }

    // fetch for buyers data
    function fetchBuyers () {
        fetch("http://localhost:3001/api/users/allBuyers").then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setBuyers(data)
        })
    }

    // add new delivery man
    function addDelivery () {

        const fn = document.querySelector('#full').value
        const em = document.querySelector('#email').value
        const ph = document.querySelector('#phone').value
        const st = document.querySelector('#stat').value

        fetch("http://localhost:3001/api/delivery/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                fullname : fn,
                email : em,
                phone : ph,
                stat : st
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data) {
                fetchDelivery()
            } else {
                alert("Error")
                fetchDelivery()
            }
        })
    }

    // show products
    function renderProductData() {
        fetch("http://localhost:3001/api/products/all").then(res => {
            return res.json()
        }).then(data => {
            setProducts(data)
        })
    }

    // delete product
    function deleteProduct (id) {
        fetch(`http://localhost:3001/api/products/delete/${id}`, {
            method : 'DELETE'
        }).then(res => {
            renderProductData()
        })
    }

    // edit delivery
    function fetchDeliveryId (id) {
        console.log(id)
    }

    useEffect(() => {
        if(token){
            fetchBuyers()
            fetchDelivery()
            renderProductData()
        } else {
            history.push("/AdminLogin")
        }
    }, [])

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
                            <li class="active"><Link onClick={clearSess} className="btn">Sign out</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <header id="head" className="secondary"></header>
            <div className="container">
                <ol className="breadcrumb">
                    <li><Link to="/AdminDashboard">Dashboard</Link></li>
                    <li class="active">Administrator access</li>
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
                                <h3 className="thin">Buyers Tables :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Fullname</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Password</td>
                                            <td>Is_Reseted</td>
                                            <td>Role</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buyers.map( (i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.fullname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.password}</td>
                                                <td>{JSON.stringify(i.is_reseted)}</td>
                                                <td>{i.role}</td>
                                                <td><button className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
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
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Fullname</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            <td>Status</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {delivery.map( (i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.fullname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                <td>{i.stat}</td>
                                                <td><button className="btn btn-warning">Delete</button> <button onClick={() => fetchDeliveryId(i._id)} data-toggle="modal" data-target="#exampleEdit" className="btn btn-info">Edit</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <hr />
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleAdd">
                                Add New Delivery
                                </button>
                                {/* modal to add new delivery */}
                                <div class="modal fade" id="exampleAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Delivery</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin full name" className="form-control" id="full" required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" placeholder="Enter admin email" className="form-control" id="email" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin phone" className="form-control" id="phone" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter the status of delivery man" id="stat" required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" data-dismiss="modal" onClick={addDelivery} class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* edit a delivery */}
                                <div class="modal fade" id="exampleEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Delivery</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin full name" className="form-control" id="full" required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="email" placeholder="Enter admin email" className="form-control" id="email" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter admin phone" className="form-control" id="phone" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter the status of delivery man" id="stat" required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" data-dismiss="modal" onClick={editDelivery} class="btn btn-primary">Edit</button>
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
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.name}</td>
                                                <td>{i.productType}</td>
                                                <td>{i.price}</td>
                                                <td><img src={"images/"+i.image} /></td>
                                                <td>{i.desc}</td>
                                                <td><button  className="btn btn-warning" onClick={() => deleteProduct(i._id)} >Delete</button></td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default AdminDashboard