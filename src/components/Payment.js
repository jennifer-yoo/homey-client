import React, { Component } from 'react';
import { CardElement, useStripe, useElements, ElementsConsumer } from "@stripe/react-stripe-js";
import { Redirect } from 'react-router-dom'
import SuccessModal from '../components/SuccessModal'

class Payment extends Component {

    state = {
        name: "",
        email: "",
        address: "",
        apt: "",
        city: "",
        usState: "",
        zip: "",
        status: false,
        diffShipping: false,
        shipAddress: "",
        shipApt: "",
        shipCity: "",
        shipState: "",
        shipZip: "",
        showShipping: "none",
        showPayment: "none",
        ccName: ""
    }

    changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    orderTotal = () => {
        let prices = this.props.order.map(item => item.furniture.price)
        return prices.reduce((result,num) => result+num)
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()

        const {stripe, elements} = this.props

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch('http://localhost:3001/create-checkout-session', {method: 'POST'})
        const session = await response.json()
        console.log(session.payment_intent)

        const result = await stripe.confirmCardPayment(session.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                name: 'Jenny Rosen',
                },
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log("success")
                this.props.checkOut(this.orderTotal())
                this.setState((previousState) => ({status: !previousState.status}))
                setTimeout(()=> this.props.history.push('/my-account'), 6000) 

                // console.log("in submit payment:", this.props.history)
            }
        }
    }

    submitBilling = (e) => {
        e.preventDefault()
        if (this.state.diffShipping === false) {
            this.setState({shipAddress: this.state.address, shipApt: this.state.apt, shipCity: this.state.city, shipState: this.state.usState, shipZip: this.state.zip})
            this.setState({showPayment: "block"})
        } else {
            this.setState({showShipping: "block"})
        }
    }

    submitShipping = (e) => {
        e.preventDefault()
        this.setState({showPayment: "block"})
    }

    render() {
        const CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                color: "black",
                backgroundColor: "rgb(223, 223, 223)",
                fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontSize: "14px",
                    "::placeholder": {
                        color: "black",
                        letterSpacing: ".5px",
                    },
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            },
            hidePostalCode: true
        };

        return (
            <div className="checkout-container">
                { this.state.status ? 
                    null
                    :
                    <><div className="billing-container">
                        <p className="billing-header">Billing</p>
                        <form className="billing-form" onSubmit={this.submitBilling}>
                            <label htmlFor="name">Full Name</label>
                            <input id="name" name="name" type="text" value={this.state.name} onChange={this.changeHandler}/>

                            <label htmlFor="email">Email Address</label>
                            <input id="email" name="email" type="email" value={this.state.email} onChange={this.changeHandler}/>

                            <label htmlFor="address">Street Address</label>
                            <input id="address" name="address" type="text" value={this.state.address} onChange={this.changeHandler}/>

                            <label htmlFor="apt">Apt/Suite</label>
                            <input id="apt" name="apt" type="text" value={this.state.apt} onChange={this.changeHandler}/>

                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" value={this.state.city} onChange={this.changeHandler}/>

                            <label htmlFor="zip">ZipCode</label>
                            <input id="zip" name="zip" type="text" value={this.state.zip} onChange={this.changeHandler}/>

                            <label htmlFor="usState">State</label>
                                <select name="usState" value={this.state.usState} onChange={this.changeHandler}>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        
                            <input type="checkbox" className="checkShipping" id="diffShipping" name="diffShipping" value={this.state.diffShipping} onChange={() => this.setState((previousState) => ({diffShipping: !previousState.diffShipping}))} />
                            <label htmlFor="diffShipping">Use different shipping address</label>

                            <button className="billing-btn">Continue to Shipping</button>
                        </form>
                    </div>

                    <div className="shipping-container">
                        <p className="shipping-header">Shipping</p>
                            <form className="shipping-form" onSubmit={this.submitShipping} style={{display: this.state.showShipping }}>
                                <label htmlFor="address">Street Address</label>
                                <input id="shipAddress" name="shipAddress" type="text" value={this.state.shipAddress} onChange={this.changeHandler}/>

                                <label htmlFor="shipApt">Apt/Suite</label>
                                <input id="shipApt" name="shipApt" type="text" value={this.state.shipApt} onChange={this.changeHandler}/>

                                <label htmlFor="shipCity">City</label>
                                <input id="shipCity" name="shipCity" type="text" value={this.state.shipCity} onChange={this.changeHandler}/>

                                <label htmlFor="shipZip">ZipCode</label>
                                <input id="shipZip" name="shipZip" type="text" value={this.state.shipZip} onChange={this.changeHandler}/>

                                <label htmlFor="usState">State</label>
                                    <select name="shipState" value={this.state.shipState} onChange={this.changeHandler}>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>

                                <button className="billing-btn">Continue to Payment</button>
                            </form>
                    </div>

                    <div className="payment-container">
                        <p className="payment-header">Payment</p>
                        <form className="payment-form" onSubmit={this.handleSubmit} style={{display: this.state.showPayment }}> 
                                <label htmlFor="ccName">Full Name</label>
                                <input className="cc-input" id="ccName" name="ccName" type="text" value={this.state.ccName} onChange={this.changeHandler}/>

                                <label htmlFor="cc-header">Credit Card</label>
                                <CardElement options={CARD_ELEMENT_OPTIONS}/>
                                <div className="cc-input" id="card-element">
                                </div>
                                <button className="checkout-btn" type="submit" disabled={!this.props.stripe}>Confirm Order</button>
                        </form>
                    </div>
                    </>
                }
            </div>
        )
    }
}

export default Payment;