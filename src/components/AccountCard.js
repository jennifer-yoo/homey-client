import React from 'react'

function AccountCard(props) {

    // renderPics = () => {
    //     return props.order.units.map(el =>

    //     )
    // }

    const renderDate = () => {
        let date = props.order.created_at
        return date[5]+date[6]+"/"+date[8]+date[9]+"/"+date[0]+date[1]+date[2]+date[3]
    }

    return (
        <div className="order-card">
            <p>Date Placed: {renderDate()}</p>
            <p>Order Number: {props.order.tracking}</p>
            <p>Total: ${props.order.total}</p>
        </div>
    )

}

export default AccountCard;