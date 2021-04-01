import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function UserDashboard () {

    let history = useHistory()

    const [productType, setProductType] = useState([])
    const [products, setProducts] = useState([])
    const [allPricing, setPricing] = useState([])
    const [image, setImage] = useState({})
    const data = localStorage.getItem('sellerInfo')
    const dt = JSON.parse(data)

    // clear session :
    function clearUserSess () {
        localStorage.clear()
        history.push("/UserLogin")
    }

    // handle images
    const onchange = (e) => {
        setImage(e.target.files[0])
    }

    // add new product
    function addNewProduct () {
        const name = document.querySelector('#name').value
        const proType = document.querySelector('#proType').value
        const price = document.querySelector('#price').value
        const desc = document.querySelector('#desc').value

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('price', price)
        formData.append('proType', proType)

        fetch("http://localhost:3001/api/products/add", {
            method : 'POST',
            header : {
                'Content-Type' : 'multipart/form-data'
            },
            body : formData
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            if(data){
                alert("New Product Added")
                renderProductData()
            } else {
                alert("Error")
            }
        })
        
    }

    function buyPack (id) {
        console.log("this is good", id)
    }
    
    // render data for products
    function renderProductData () {
        fetch("http://localhost:3001/api/products/all").then(res => {
            return res.json()
        }).then(data => {
            setProducts(data)
        })
    }

    // render data for type product
    function renderProductType () {
        fetch("http://localhost:3001/api/productsType/all").then(res => {
            return res.json()
        }).then(data => {
            setProductType(data)
        })
    }

    function deleteProduct (id) {
        //console.log(id)
        fetch(`http://localhost:3001/api/products/delete/${id}`, {
            method : 'DELETE'
        }).then(res => {
            window.location.reload()
        })
    }

    useEffect(() => {

        renderProductData()
        renderProductType()

        
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
                    <p>Pack Promos is : {dt.userType}</p>
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
                                                <td><button className="btn btn-info">Edit</button> <button  className="btn btn-warning" onClick={() => deleteProduct(i._id)} >Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
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
                                                <select className="form-control" id="proType">
                                                    <option>Select Your Product Type</option>
                                                    {productType.map((i) => (
                                                        <option value={i.name}>{i.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter product price" className="form-control" id="price" required />
                                            </div>
                                            <div className="form-group">
                                                <input type="file" onChange={onchange} className="form-control" id="image" required />
                                            </div>
                                            <div className="form-group">
                                                <textarea placeholder="Enter product description" className="form-control" id="desc" required></textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addNewProduct} class="btn btn-primary" data-dismiss="modal">Add</button>
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
                                <h3 className="thin">Pricing Table</h3>
                                <hr />
                                <div className="col-sm-6">
                                    <div className="panel panel-warning">
                                        <div className="panel-heading">
                                            <h2>Pro Pack</h2>
                                        </div>
                                        <div className="panel panel-body">
                                            <p>This is a Pro Pack</p>
                                            <input type="hidden" id="score" value="3000" />
                                            <button className="btn btn-primary">Buy</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="panel panel-warning">
                                        <div className="panel-heading">
                                            <h2>Expert Pack</h2>
                                        </div>
                                        <div className="panel panel-body">
                                            <p>This is a Expert Pack</p>
                                            <input type="hidden" id="score" value="5000" />
                                            <button className="btn btn-primary">Buy</button>
                                        </div>
                                    </div>
                                </div>
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