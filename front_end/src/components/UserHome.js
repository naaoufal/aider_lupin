import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Paypal from './paypal/paypal'
import '../user.css'

function UserHome () {

    let history = useHistory()
    const data = localStorage.getItem('buyerInfo')
    const dt = JSON.parse(data)
    const [products, setProducts] = useState([])
    const [ads, setAds] = useState([])
    const [currency, setCurrency] = useState([])
    const [checkout, setCheckOut] = useState(false)

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

    function renderAds () {
        fetch("http://localhost:3001/api/ads/randomAds").then(res => {
            return res.json()
        }).then(data => {
            setAds(data)
        })
    }

    function renderProducts () {
        fetch("http://localhost:3001/api/products/all").then(res => {
            return res.json()
        }).then(data => {
            setProducts(data)
        })
    }

    // currency api
    function renderCurrency () {
        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=c38142af852578c0d6b5ba020eb82a79").then(res => {
            return res.json()
        }).then(data => {
            setCurrency(data)
        })
    }

    function Checkout (id) {
        fetch(`http://localhost:3001/api/products/oneProduct/${id}`).then(res => {
            return res.json()
        }).then(data => {
            localStorage.setItem('productInfo', JSON.stringify(data))
            history.push("/payment")
        })
    }

    useEffect(() => {
        resetStatAndPoints()
        renderProducts()
        renderAds()
        renderCurrency()
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
                        <li><div id="google_translate_element" className=""></div></li>
                        <li class="active"><Link onClick={clearStorage} className="btn">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <header id="head" class="secondary"></header>
        <div className="container">
            

            <header class="page-header">
                {ads.map((i) => (
                    <center>
                        <img className="page-title" id="ads" src={"images/"+i.image} />
                    </center>
                ))}
            </header>

            {/* <div className="jumbotron top-space">
                <h4>General Information :</h4>
                <p>ID : {dt._id}</p>
                <p>Full name : {dt.fullname}</p>
                <p>Email : {dt.email}</p>
            </div> */}
            
            <br /> <br />
            <div className="row">
                <div className="col-md text-center">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h3 class="thin">All Products</h3>
                            <hr />
                            {products.map((i) => (
                                <div className="col-sm-4">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h2>{i.name}</h2>
                                        </div>
                                        <div className="panel panel-body">
                                            <img src={"images/"+i.image} />
                                            <p><input value={i.price} readonly="readonly" /> €</p>
                                            <p>{i.desc}</p>
                                            {/* {checkout ? (
                                                // run test
                                                <Paypal />
                                            ) : ( */}
                                            <button onClick={() => Checkout(i._id)} className="btn btn-primary">Buy</button>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            ))}
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