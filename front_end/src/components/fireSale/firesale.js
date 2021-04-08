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

// const auth = firebase.auth()
// const firestore = firebase.firestore()

function FireSale () {

    let history = useHistory()

    const [products, setProducts] = useState([])
    const [renderMessage, setMessage] = useState([])

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

    // send message
    function sendMessage () {
        var u = document.querySelector('#user').value
        var m = document.querySelector('#msg').value

        firebase.database().ref('chat').push({
            user : u,
            msg : m
        })

        m = ""

        //var messages = document.querySelector('#chat')
        firebase.database().ref('chat').on('value', (snap) => {
            renderMessage = ""
            snap.map((e) => {
                setMessage(e.value)
            })
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
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
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
                </article>
            </div>
            <div className="row">
                <article className="col-xs-12 maincontent">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body text-center">
                                <div className="panel-heading">
                                    <h2>Chat Box</h2>
                                </div>
                                <div className="panel-body">
                                    <div className="form-group">
                                        <input id="user" className="form-control" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <textarea id="msg" className="form-control" cols="10" rows="10"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button id="send" className="btn btn-success" onClick={sendMessage}>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body text-center">
                                <div className="panel-heading">
                                    <h2>Room Chat</h2>
                                </div>
                                <div className="panel-body" id="chat">
                                    <p>{renderMessage}</p>
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

export default FireSale