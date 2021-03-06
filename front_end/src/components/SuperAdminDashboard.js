import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import NavBar from "./NavBar"
import '../image.css'

function SuperAdminDashboard () {

    const [stat , setStatus] = useState()
    const [sellers, setSellers] = useState([])
    let history = useHistory([])
    const [admin, setAdmins] = useState([])
    const [productType, setType] = useState([])
    const [ads, setAds] = useState([])
    const [commands, setCommands] = useState([])
    const token = localStorage.getItem('tokenaccess')
    const data = localStorage.getItem('adminInfo')
    const dt = JSON.parse(data)

    function renderAdminData () {
        fetch("http://localhost:3001/api/admins/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            setAdmins(data)
        })
    }

    
    function renderTypeData () {
        fetch("http://localhost:3001/api/productsType/all", {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            setType(data)
        })
    }

    function renderAdsData () {
        fetch("http://localhost:3001/api/ads/all").then(res => {
            return res.json()
        }).then(data => {
            setAds(data)
        })
    }

    const [image, setImage] = useState({})

    const onchange = (e) => {
        setImage(e.target.files[0])
    }

    function addAds () {

        const price = document.querySelector('#price').value
        const desc = document.querySelector('#desc').value

        const formData = new FormData()
        formData.append('image', image)
        formData.append('price', price)
        formData.append('desc', desc)

        //console.log(image, price, desc)

        fetch("http://localhost:3001/api/ads/addOne", {
            method : 'POST',
            header : {
                'Content-Type' : 'multipart/form-data'
            },
            body : formData
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data, image, price, desc)
            if(data) {
                alert("Ads Added Successfully")
                renderAdsData()
            } else {
                alert("Error")
            }
        })
    }

    // add new admin:
    function addNewAdmin () {
        const name = document.querySelector('#full').value
        const em = document.querySelector('#email').value
        const ph = document.querySelector('#phone').value
        const ps = document.querySelector('#password').value
        //console.log(name, em, ph, ps)
        fetch("http://localhost:3001/api/admins/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                fullname : name,
                email : em,
                phone : ph,
                password : ps,
                is_reseted : false,
                stat : false
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data.message)
            if(data.message == "Email send to admin"){
                alert("Admin Added Successfully")
                window.location.reload()
            } else {
                alert("Error")
                window.location.reload()
            }
        })
    }

    function addNewType () {
        const nm = document.querySelector('#name').value

        fetch("http://localhost:3001/api/productsType/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                name : nm
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            //console.log(data)
            if(data){
                alert("Type Added Successfully")
                window.location.reload()
            } else {
                alert("Error")
                window.location.reload()
            }
        })
    }

    // patch on stat of admin only !!! :
    function editStat (id) {
        fetch(`http://localhost:3001/api/admins/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                stat : false
            })
        }).then(res => {
            window.location.reload()
        })
    }

    function deleteType (id) {
        fetch(`http://localhost:3001/api/productsType/delete/${id}`, {
            method : 'DELETE',
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            renderTypeData()
        })
    }

    // edit product type:
    function editType (id) {
        const nm = document.querySelector('#nameType').value
        console.log(nm, id)
        // fetch(`http://localhost:3001/api/productsType/edit/${id}`, {
        //     method : 'PATCH',
        //     headers : {
        //         'Content-Type' : 'application/json',
        //         'Authorization' : 'Bearer ' + token
        //     },
        //     body : JSON.stringify({
        //         name : nm
        //     })
        // }).then(res => {
        //     return res.json()
        // }).then(data => {
        //     console.log(data)
        // })
    }

    // enable admin account:
    function enableAd (id) {
        fetch(`http://localhost:3001/api/admins/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body : JSON.stringify({
                stat : true
            })
        }).then(res => {
            window.location.reload()
        })
    }

    // delete an admin:
    function deleteAdmin (id) {
        fetch(`http://localhost:3001/api/admins/delete/${id}`, {
            method : 'DELETE',
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {
            window.location.reload()
        })
    }

    // commands render
    function renderCommands () {
        fetch("http://localhost:3001/api/commands/all").then(res => {
            return res.json()
        }).then(data => {
            setCommands(data)
        })
    }

    // confirm command
    function confirmCommand (id) {
        fetch(`http://localhost:3001/api/commands/edit/${id}`, {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                is_validate : true
            })
        }).then(res => {
            renderCommands()
        })
    }

    // delete commend
    function deleteCommand (id) {
        fetch(`http://localhost:3001/api/commands/delete/${id}`, {
            method : 'DELETE'
        }).then(res => {
            renderCommands()
        })
    }

    useEffect(() => {

        renderAdsData()
        renderCommands()

        if (token) {
            
            // render sellers data:
            fetch("http://localhost:3001/api/users/allSellers").then(res => {
                return res.json()
            }).then(data => {
                setSellers(data)
            })

            renderAdminData()
            renderTypeData()

        } else {
            history.push("/SuperAdminLogin")
        }
    }, [])

    return (
        <body className="home">
            <NavBar />
            <header id="head" class="secondary"></header>
            <div className="container">
                <ol class="breadcrumb">
                    <li><Link to="/SuperDashboard">Dashboard</Link></li>
                    <li class="active">Super administrator access</li>
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
                                <h3 class="thin">Administrator Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>full name</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            {/* <td>Password</td> */}
                                            <td>Is_Reseted</td>
                                            <td>Status</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admin.map( (i) => (
                                        <tr>
                                            <td>{i._id}</td>
                                            <td>{i.fullname}</td>
                                            <td>{i.email}</td>
                                            <td>{i.phone}</td>
                                            {/* <td>{i.password}</td> */}
                                            <td>{JSON.stringify(i.is_reseted)}</td>
                                            <td>{JSON.stringify(i.stat)}</td>
                                            <td> { i.stat ?
                                                <button onClick={() => editStat(i._id)} className="btn btn-warning">Desable</button>
                                                :
                                                <button onClick={() => enableAd(i._id)} className="btn btn-warning">Enable</button> 
                                                }
                                                 <button onClick={() => deleteAdmin(i._id)} className="btn btn-info">Delete</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <hr />
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleAdd">
                                Add New Administrator
                                </button>
                                <div class="modal fade" id="exampleAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Administrator</h5>
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
                                                <input type="password" placeholder="Enter admin password" className="form-control" id="password" required />
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addNewAdmin} class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Sellers Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Fullname</td>
                                            <td>Email</td>
                                            <td>Phone</td>
                                            {/* <td>Password</td> */}
                                            <td>Is_Reseted</td>
                                            <td>Role</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellers.map( (i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.fullname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.phone}</td>
                                                {/* <td>{i.password}</td> */}
                                                <td>{JSON.stringify(i.is_reseted)}</td>
                                                <td>{i.role}</td>
                                                <td><button className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Products Type Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productType.map((i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td>{i.name}</td>
                                                <td><button type="button" data-toggle="modal" data-target="#exampleEdit" onClick={() => editType(i._id)} className="btn btn-info">Edit</button> <button onClick={() => deleteType(i._id)} className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#example1">
                                Add New Type
                                </button>
                                {/* modal to add new type */}
                                <div class="modal fade" id="example1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Type</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Type Name" className="form-control" id="name" required/>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addNewType} class="btn btn-primary">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal to edit a type */}
                                <div class="modal fade" id="exampleEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Edit Type</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Type Name" className="form-control" id="nameType" required/>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={editType} class="btn btn-primary">Edit</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* commands table */}
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Commands Table :</h3>
                                <hr />
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            {/* <td scope="10px">ID</td> */}
                                            <td>Product Name</td>
                                            <td>Product ID</td>
                                            <td>Buyer ID</td>
                                            <td>Seller ID</td>
                                            <td>Price</td>
                                            {/* <td>Command Date</td> */}
                                            {/* <td>Confirmed</td> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commands.map((i) => (
                                            <tr>
                                                {/* <td>{i._id}</td> */}
                                                <td>{i.productName}</td>
                                                <td>{i.productId}</td>
                                                <td>{i.buyerId}</td>
                                                <td>{i.idSeller}</td>
                                                <td>{i.price}</td>
                                                {/* <td>{i.date}</td> */}
                                                {/* <td>{JSON.stringify(i.is_validate)}</td> */}
                                                <td>
                                                    {i.is_validate == false ?
                                                    <button onClick={() => confirmCommand(i._id)} className="btn btn-info">Confirm</button>
                                                    :
                                                    <button onClick={() => confirmCommand(i._id)} className="btn btn-danger">Confirmed</button>
                                                    }
                                                    <button onClick={() => deleteCommand(i._id)} className="btn btn-warning">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* end of command table */}
                    <div className="col-md text-center">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3 class="thin">Ads Table :</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Image</td>
                                            <td>Price</td>
                                            <td>Description</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ads.map((i) => (
                                            <tr>
                                                <td>{i._id}</td>
                                                <td><img src={"images/"+i.image} /></td>
                                                <td>{i.price}</td>
                                                <td>{i.desc}</td>
                                                <td><button className="btn btn-warning">Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleAds">
                                Add New Ads
                                </button>
                                {/* modal to add new type */}
                                <div class="modal fade" id="exampleAds" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Add New Ads</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="form-group">
                                                <input type="file" onChange={onchange} className="form-control" id="image" required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Price" className="form-control" id="price" required/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" placeholder="Enter Description" className="form-control" id="desc" required/>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={addAds} class="btn btn-primary" data-dismiss="modal">Add</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default SuperAdminDashboard