import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useEffect, useState } from 'react'

firebase.initializeApp({
    apiKey: "AIzaSyAw0i4q9dkMlqYUYcHmQQ-99n99K9CT3V8",
    authDomain: "firesale-65630.firebaseapp.com",
    projectId: "firesale-65630",
    storageBucket: "firesale-65630.appspot.com",
    messagingSenderId: "1059712891649",
    appId: "1:1059712891649:web:44a003e50c7b47fd9ef900"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function FireSale () {

    let history = useHistory()

    const [products, setProducts] = useState([])

    function backHome () {
        localStorage.removeItem('productInfo')
        history.push("/Home")
    }

    // render product data
    function renderProductData () {
        fetch("http://localhost:3001/api/products/randomproduct").then(res => {
            return res.json()
        }).then(data => {
            setProducts(data)
        })
    }

    useEffect(() => {
        // write some functions here !!!
        renderProductData()
    }, [])

    return (
        <div className="container">
        <ol className="breadcrumb">
            <li><Link onClick={backHome}>Home</Link></li>
            <li className="active">Fire Sale Page</li>
            <div className="row">
                <article className="col-xs-12 maincontent">
                    <header className="page-header">
                        <h1 className="page-title">Fire Sale</h1>
                    </header>
                    {products.map((i) => (
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-body text-center">
                                    <h3 className="thin">{i.name}</h3>
                                    <img src={"images/" + i.image} />
                                    <p>{i.price}</p>
                                    <p>{i.desc}</p>
                                    <hr />
                                    <div>
                                        {/* <div ref={paypal}></div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body text-center">
                                
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </ol>
    </div>
    )
}

export default FireSale