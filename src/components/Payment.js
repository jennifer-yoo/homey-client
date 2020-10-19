import React, { Component } from 'react';
import { CardElement, useStripe, useElements, ElementsConsumer } from "@stripe/react-stripe-js";
import { Redirect } from 'react-router-dom'

class Payment extends Component {

    state = {
        name: "",
        email: "",
        address: "",
        apt: "",
        city: "",
        usState: "",
        zip: "",
        status: false
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
        // Stripe.js has not yet loaded.
        // Make  sure to disable form submission until Stripe.js has loaded.
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
            }
        }
    }

    render() {
        console.log("in payment:", this.props.order)

        const CARD_ELEMENT_OPTIONS = {
            style: {
                base: {
                color: "#32325d",
                fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#9e9e9e",
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
                    <Redirect to="/my-account" />
                    :
                    <><div className="billing-container">
                        <h2>Billing</h2>
                        <form className="billing-form">
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

                            <label htmlFor="zip">Zip Code</label>
                            <input id="zip" name="zip" type="text" value={this.state.zip} onChange={this.changeHandler}/>

                            <label htmlFor="usState">State</label>
                            <select value={this.state.value} onChange={this.changeHandler}>
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

                            <button className="billing-btn">Continue to Shipping</button>
                        </form>
                    </div>

                    <div className="shipping-container">

                    </div>

                    <div className="payment-container">
                        <form onSubmit={this.handleSubmit}> 
                            <CardElement options={CARD_ELEMENT_OPTIONS}/>
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
// export default function InjectedCheckoutForm() {
//   return (
//         <ElementsConsumer>
//             {({stripe, elements}) => (
//                 <Payment stripe={stripe} elements={elements}/>
//             )}
//         </ElementsConsumer>
//     );
// }