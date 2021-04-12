import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { useEffect, useState, useRef } from 'react'

var firebaseConfig = {
    apiKey: "AIzaSyCc3n15L9EDjbFBEsf1QIEVWdAMpaQminI",
    authDomain: "sale-f97b9.firebaseapp.com",
    databaseURL: "https://sale-f97b9-default-rtdb.firebaseio.com",
    projectId: "sale-f97b9",
    storageBucket: "sale-f97b9.appspot.com",
    messagingSenderId: "482757909401",
    appId: "1:482757909401:web:fbc369c1b523f34eb21108"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const firestore = firebase.firestore()

function FireSale () {

    let history = useHistory()

    const [products, setProducts] = useState([])
    const [message, setMessage] = useState([])
    const current = []

    function backHome () {
        localStorage.removeItem('productInfo')
        history.push("/Home")
    }

    function showData () {
        fetch("http://localhost:3001/api/firesale/all").then(res => {
            return res.json()
        }).then(data => {
            setProducts(data)
        })
    }

    function clearInputs () {
        document.querySelector('#user').value = ""
        document.querySelector('#msg').value = ""
    }

    // send message
    function sendMessage () {
        
        const u = document.querySelector('#user').value
        const m = document.querySelector('#msg').value

        firebase.database().ref('chat').push({
            user : u,
            msg : m
        })

        clearInputs()

        
        firebase.database().ref('chat').on('value', (snap) => {
            //console.log(snap)
            clearInputs()
            snap.forEach((e) => {
                //console.log(e.val())
                const x = e.val()
                setMessage(x)
            })
        })
    }


    useEffect(() => {
        // write some functions here !!!
        showData()
        //renderProductData()
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
                                </div>
                            </div>
                        </div>
                    ))}
                </article>
            </div>
            <div className="row">
                <article className="col-xs-12 maincontent">
                    {/* <div className="col-md-6">
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
                    </div> */}
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="panel-heading">
                                    <h2>Room Chat</h2>
                                </div>
                                <div className="panel-body" id="chat">
                                    <ChatRoom />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </ol>
    </div>
    )

    function ChatRoom() {
        const dummy = useRef();
        const messagesRef = firestore.collection('messages');
        const query = messagesRef.orderBy('createdAt').limit(25);
      
        const [messages] = useCollectionData(query, { idField: 'id' });
      
        const [formValue, setFormValue] = useState('');
      
      
        const sendMessage = async (e) => {
          e.preventDefault();
      
          //const { uid, photoURL } = auth.currentUser;
      
          await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
      
          setFormValue('');
          dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
      
        return (<>
          <main>
      
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      
            <span ref={dummy}></span>
      
          </main>
      
          <form onSubmit={sendMessage}>
      
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
      
            <button type="submit" disabled={!formValue}>Send</button>
      
          </form>
        </>)
      }

    //   chat message
    function ChatMessage(props) {
        const { text, uid, photoURL } = props.message;
      
        const messageClass = auth.currentUser ? 'sent' : 'received';
      
        return (<>
          <div className={`message ${messageClass}`}>
            <p>{text}</p>
          </div>
        </>)
    }

}

export default FireSale