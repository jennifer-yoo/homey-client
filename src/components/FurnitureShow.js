import React, { Component } from 'react';

export default class FurnitureShow extends Component {

    // renderItems = () => {
    //     const { match, info } = this.props
    //     info.map(el => 
    //         <div className="item-card">
    //         <div className="item-info">
    //             <img className="card-pic" src={el.image} alt={el.name}></img>
    //             <p>{el.name}</p>
    //             <p>${el.price}</p>
    //             <p>{el.rating} out of 5</p>
    //             <form className="add-form" onSubmit={(event) => this.props.addToCart(this.props.info, event, this.props.quantity)}>
    //                 <label htmlFor="quantity">Quantity</label>
    //                 <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
    //                 <button className="add-cart-btn" type="submit">Add to Cart</button>
    //             </form>
    //         </div>
    //         </div>
    //     )
    // }

    // renderItems = () => {
    //     const { match, info } = this.props

    //     return (
    //         <div className="item-card">
    //             <div className="item-info">
    //                 <img className="card-pic" src={info[match.params.furnitureId].image} alt={info[match.params.furnitureId].name}></img>
    //                 <p>{info[match.params.furnitureId].name}</p>
    //                 <p>${info[match.params.furnitureId].price}</p>
    //                 <p>{info[match.params.furnitureId].rating} out of 5</p>
    //                 <form className="add-form" onSubmit={(event) => this.props.addToCart(this.props.info, event, this.props.quantity)}>
    //                     <label htmlFor="quantity">Quantity</label>
    //                     <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
    //                     <button className="add-cart-btn" type="submit">Add to Cart</button>
    //                 </form>
    //             </div>
    //         </div>
    //     )
    // }

    render () {
        // const { id, room, category, price, name, color, rating, image} = this.props.info
        console.log("i am in show pg")
        const { match, info } = this.props

        return (
            <div className="item-card">
                <div className="item-info">
                    <img className="card-pic" src={info[match.params.furnitureId].image} alt={info[match.params.furnitureId].name}></img>
                    <p>{info[match.params.furnitureId].name}</p>
                    <p>${info[match.params.furnitureId].price}</p>
                    <p>{info[match.params.furnitureId].rating} out of 5</p>
                    <form className="add-form" onSubmit={(event) => this.props.addToCart(this.props.info, event, this.props.quantity)}>
                        <label htmlFor="quantity">Quantity</label>
                        <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
                        <button className="add-cart-btn" type="submit">Add to Cart</button>
                    </form>
                </div>
            </div>

            // <div>
            //     {this.renderItems()}
            // </div>


            // <div className="item-card">
            //     <div className="item-info">
            //         <img className="card-pic" src={image} alt={name}></img>
            //         <p>{name}</p>
            //         <p>${price}</p>
            //         <p>{rating} out of 5</p>
            //         <form className="add-form" onSubmit={(event) => this.props.addToCart(this.props.info, event, this.props.quantity)}>
            //             <label htmlFor="quantity">Quantity</label>
            //             <input id="quantity" name="quantity" type="number" min="1" max="10" value={this.props.quantity} onChange={this.props.changeHandler}/>
            //             <button className="add-cart-btn" type="submit">Add to Cart</button>
            //         </form>
            //     </div>
            // </div>
        )
    }
}