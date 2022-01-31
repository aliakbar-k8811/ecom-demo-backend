const { orderController } = require("../src/controllers/order-controller");
const { orderRepo } = require("../src/repositories/order-repo");

test("This should calculate discounts based on cart items", async () => {
  const repositories = { orderRepo };
  const orderControllerConn = await orderController(repositories);
  const cartDetails = {
    cart_items: [
      {
        user_id: 1,
        product_id: 1,
        title: "Product A",
        desc: "The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.",
        sku: "PA001",
        price: 30,
        quantity: 5,
        product_discounts: [
          {
            id: 1,
            promotion_type_id: 5,
            promotion_type: "Multi buy",
            discount_type_id: 1,
            discount_type: "Product",
            discount_unit_id: 1,
            discount_unit: "Price",
            discount_value: 15,
            valid_from: "2022-01-30T18:15:14.000Z",
            valid_until: "2022-02-28T18:12:47.000Z",
            order_value_unit_id: 1,
            order_value_unit: "Product",
            min_order_value: 3,
            max_discount_amount: null,
            applied_disc_amount: 15,
          },
        ],
        discount: 15,
        total_price: 135,
      },
      {
        user_id: 1,
        product_id: 2,
        title: "Product B",
        desc: "The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.",
        sku: "PA002",
        price: 20,
        quantity: 4,
        product_discounts: [
          {
            id: 2,
            promotion_type_id: 5,
            promotion_type: "Multi buy",
            discount_type_id: 1,
            discount_type: "Product",
            discount_unit_id: 1,
            discount_unit: "Price",
            discount_value: 5,
            valid_from: "2021-11-01T18:24:21.000Z",
            valid_until: "2022-02-24T18:19:51.000Z",
            order_value_unit_id: 1,
            order_value_unit: "Product",
            min_order_value: 2,
            max_discount_amount: null,
            applied_disc_amount: 10,
          },
        ],
        discount: 10,
        total_price: 70,
      },
    ],
    cart_discounts: [
      {
        id: 4,
        promotion_type_id: 2,
        promotion_type: "Flat price",
        discount_type_id: 2,
        discount_type: "Cart",
        discount_unit_id: 1,
        discount_unit: "Price",
        discount_value: 20,
        valid_from: "2022-01-31T10:48:52.000Z",
        valid_until: "2022-03-09T10:46:28.000Z",
        order_value_unit_id: 2,
        order_value_unit: "Price",
        min_order_value: 150,
        max_discount_amount: null,
        applied_disc_amount: 20,
      },
    ],
  };

  const cartSummaryRes = {
    total_items: 2,
    total_items_quantity: 9,
    total_cart_price: 205,
    amount_pay: 185,
    total_saved: 45,
    discounts_applied: [
      {
        id: 1,
        promotion_type_id: 5,
        promotion_type: "Multi buy",
        discount_type_id: 1,
        discount_type: "Product",
        discount_unit_id: 1,
        discount_unit: "Price",
        discount_value: 15,
        valid_from: "2022-01-30T18:15:14.000Z",
        valid_until: "2022-02-28T18:12:47.000Z",
        order_value_unit_id: 1,
        order_value_unit: "Product",
        min_order_value: 3,
        max_discount_amount: null,
        applied_disc_amount: 15,
      },
      {
        id: 2,
        promotion_type_id: 5,
        promotion_type: "Multi buy",
        discount_type_id: 1,
        discount_type: "Product",
        discount_unit_id: 1,
        discount_unit: "Price",
        discount_value: 5,
        valid_from: "2021-11-01T18:24:21.000Z",
        valid_until: "2022-02-24T18:19:51.000Z",
        order_value_unit_id: 1,
        order_value_unit: "Product",
        min_order_value: 2,
        max_discount_amount: null,
        applied_disc_amount: 10,
      },
      {
        id: 4,
        promotion_type_id: 2,
        promotion_type: "Flat price",
        discount_type_id: 2,
        discount_type: "Cart",
        discount_unit_id: 1,
        discount_unit: "Price",
        discount_value: 20,
        valid_from: "2022-01-31T10:48:52.000Z",
        valid_until: "2022-03-09T10:46:28.000Z",
        order_value_unit_id: 2,
        order_value_unit: "Price",
        min_order_value: 150,
        max_discount_amount: null,
        applied_disc_amount: 20,
      },
    ],
  };

  const data = await orderControllerConn.getCartSummary(cartDetails);
  expect(data).toStrictEqual(cartSummaryRes);
});