export class Order {
  constructor(sFrom) {
      this.sFrom = sFrom;
      this.isDone = false;
      this.orderDetails = {
          item: null,
          size: null,
          toppings: [],
          drink: null
      };
 
 
      this.OrderState = {
          WELCOMING: () => {
              this.stateCur = this.OrderState.SELECTING_ITEM;
              return ["Welcome to Taste of Karachi! What would you like to order? (Biryani, Nihari, or Haleem)"];
          },
          SELECTING_ITEM: (sInput) => {
              let aReturn = [];
              if (["Biryani", "Nihari", "Haleem"].includes(sInput.toLowerCase())) {
                  this.orderDetails.item = sInput;
                  this.stateCur = this.OrderState.SELECTING_SIZE;
                  aReturn.push(`What size would you like for your ${sInput}? (Small, Medium, Large)`);
              } else {
                  aReturn.push("Sorry, we only have Biryani, Nihari, Kebabs or Haleem. Please choose one.");
              }
              return aReturn;
          },
          SELECTING_SIZE: (sInput) => {
              let aReturn = [];
              if (["small", "medium", "large"].includes(sInput.toLowerCase())) {
                  this.orderDetails.size = sInput;
                  this.stateCur = this.OrderState.SELECTING_SIDES;
                  aReturn.push("Any sides? (Naan, Desert, Rice) Type 'none' if no toppings.");
              } else {
                  aReturn.push("Please choose Small, Medium, or Large.");
              }
              return aReturn;
          },
          SELECTING_SIDES: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase() !== "none") {
                  this.orderDetails.sides = sInput.split(",").map(t => t.trim());
              }
              this.stateCur = this.OrderState.UPSELL;
              aReturn.push("Would you like a drink with that? (Coke, Water, Juice) Type 'no' if not.");
              return aReturn;
          },
          UPSELL: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase() !== "no") {
                  this.orderDetails.drink = sInput;
              }
              this.stateCur = this.OrderState.CONFIRMING;
              aReturn.push("Here is your order summary:");
              aReturn.push(`Item: ${this.orderDetails.item}`);
              aReturn.push(`Size: ${this.orderDetails.size}`);
              if (this.orderDetails.toppings.length) {
                  aReturn.push(`Sides: ${this.orderDetails.sides.join(", ")}`);
              }
              if (this.orderDetails.drink) {
                  aReturn.push(`Drink: ${this.orderDetails.drink}`);
              }
              aReturn.push("Would you like to confirm your order? (Yes/No)");
              return aReturn;
          },
          CONFIRMING: (sInput) => {
              let aReturn = [];
              if (sInput.toLowerCase().startsWith("y")) {
                  aReturn.push("Thank you for your order! It will be ready for pickup soon.");
              } else {
                  aReturn.push("Order cancelled. Have a great day!");
              }
              this.isDone = true;
              return aReturn;
          } 