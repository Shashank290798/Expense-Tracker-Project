
const Razorpay = require('razorpay');
const Order = require('../models/order')
exports.purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: "rzp_test_6ArcjqoOs3fJP0" ,
            key_secret: "nCHafi7P2prr4snBs1HAlSjI"
        })
        const amount = 2500;
        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }

            req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}
 exports.updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: 'Sometghing went wrong' })
    }
}