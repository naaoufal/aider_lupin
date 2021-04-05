import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"


function Paypal () {

    let history = useHistory()
    const paypal = useRef()
    const productInfo = JSON.parse(localStorage.getItem('productInfo'))
    const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'))

    console.log(productInfo, buyerInfo)

    function backHome () {
        localStorage.removeItem('productInfo')
        history.push("/Home")
    }

    function addCommand () {
        fetch("http://localhost:3001/api/commands/add", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                productName : productInfo.name,
                productId : productInfo._id,
                buyerId : buyerInfo._id,
                idSeller : productInfo.idSeller,
                price : productInfo.price,
                date : Date(),
                is_validate : false
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: productInfo.name,
                    amount: {
                      currency_code: "EUR",
                      value: productInfo.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              //console.log(order);
              if(order){
                // post a new command if the payment is ok
                addCommand()
                history.push("/Success")
              } else {
                //   they is an Error in payment
                  console.log("Eroor")
              }
            },
            onError: (err) => {
              console.log(err);
            },
          })
        .render(paypal.current);
    }, []);

    return (
        <div className="container">
            <ol className="breadcrumb">
                <li><Link onClick={backHome}>Home</Link></li>
                <li className="active">Checkout Page</li>
                <div className="row">
                    <article className="col-xs-12 maincontent">
                        <header className="page-header">
                            <h1 className="page-title">Checkout</h1>
                        </header>
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-body text-center">
                                    <h3 className="thin">{productInfo.name}</h3>
                                    <img src={"images/" + productInfo.image} />
                                    <p>{productInfo.price}</p>
                                    <p>{productInfo.desc}</p>
                                    <hr />
                                    <div>
                                        <div ref={paypal}></div>
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

export default Paypal