import React from 'react'

function AccountCard(props) {

    // renderPics = () => {
    //     return props.order.units.map(el =>

    //     )
    // }

    return (
        <div className="account-card">
            <p>Confirmation Number: {props.order.tracking}</p>
            <p>Total: ${props.order.total}</p>
        </div>
    )

}

export default AccountCard;