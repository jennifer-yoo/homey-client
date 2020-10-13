import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Payment extends Component {

    state = {
        name: "",
        email: "",
        address: "",
        apt: "",
        city: "",
        usState: "",
        zip: "",

    }

    changeHandler = (event) => {
        event.persist()
        event.preventDefault()
        this.setState(()=> ({[event.target.name]: event.target.value}))
    }

    render() {
        console.log("whatever")
        return (
            <div className="checkout-container">
                <div className="billing-container">
                    <h2>Billing</h2>
                    <form className="billing-form">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" name="name" type="text" value={this.state.name} onChange={this.changeHandler}/>

                        <label htmlFor="email">Email Address</label>
                        <input id="email" name="email" type="email" value={this.state.email} onChange={this.changeHandler}/>

                        <label htmlFor="address">Street Address</label>
                        <input id="address" name="address" type="text" value={this.state.address} onChange={this.changeHandler}/>

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
                        <button className="checkout-btn" onClick={() => this.props.checkOut(this.orderTotal())}>Place your Order</button>
                </div>
            </div>
        )
    }
}