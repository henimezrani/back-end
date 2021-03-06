const Order = require("../../models/order");

const getAllByUserId = userId => {
  return Order.find({ userId }).populate("products.productId userId");
};

const getOneById = (id, product) => {
  return Order.findOne({ _id: id }).populate("products.productId userId");
};

const createOrder = (userId, orderDetails) => {
  let order = new Order({
    userId,
    products: orderDetails.products,
    paymentMethod: orderDetails.paymentMethod,
    orderPrice: orderDetails.orderPrice,
    deliveryInfo: orderDetails.deliveryInfo,
    paymentMethod: orderDetails.deliveryInfo.payment_method
  });
  return order.save();
};

//not needed anymore
const addProducts = (id, product) => {
  return Order.findByIdAndUpdate({ _id: id }, { $push: { products: product } }, { useFindAndModify: false, new: true }).populate("products.productId userId");
};

const updateProducts = (id, product) => {
  return Order.update(
    { _id: id, "products._id": product._id },
    {
      $set: {
        "products.$.selectedSize": product.selectedSize,
        "products.$.selectedQuantity": product.selectedQuantity,
        "products.$.selectedColor": product.selectedColor,
        "products.$.totalProductPrice": product.totalProductPrice
      }
    },
    { useFindAndModify: false }
  );
};

const deleteProducts = (id, product) => {
  return Order.findByIdAndUpdate({ _id: id }, { $pull: { products: product } }, { useFindAndModify: false, new: true }).populate("products.productId userId");
};

module.exports.getOneById = getOneById;
module.exports.createOrder = createOrder;
module.exports.addProducts = addProducts;
module.exports.deleteProducts = deleteProducts;
module.exports.updateProducts = updateProducts;
module.exports.getAllByUserId = getAllByUserId;
