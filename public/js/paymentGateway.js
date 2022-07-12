// const createOrder = async()=>{
//     const order = await fetch('https://sandbox.cashfree.com/pg/order',{
//         method : 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "x-api-version": "2022-01-01",
//             "Accept": "application/json",
//             "x-client-id": "177288cf66b69314bdb8a5cd24882771",
//             "x-client-secret": "a081ce60a1a29662e7feae17d854abda56fcb52d"
//         },
//         body : {
//             "customer_details": {
//                 "customer_id": "adnan123",
//                 "customer_phone": "8788967972"
//             },
//             "order_amount": 89,
//             "order_currency": "INR"
//         }

//     })

//     console.log(await order.json())
// }

// createOrder()