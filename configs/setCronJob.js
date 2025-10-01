const cron = require("node-cron");
const OrderModel = require("../model/Order.model");
const VpsModel = require("../model/Vps.model");
const setCronJob =()=>{
    cron.schedule("* * * * *", async () => {
        const now = new Date()
        const expiredOrders =await OrderModel.find({
            status:"success",
            endDate:{ $lte: now }
        })
        for (const order of expiredOrders) {
            order.status = 'completed';
            await order.save();
      
            const vps = await VpsModel.findById(order.vpsId);
            if (vps) {
              vps.status = 'INACTIVE';
              await vps.save();
            }
          }
    });
}


module.exports = {setCronJob}