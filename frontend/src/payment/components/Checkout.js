import React, { Component } from "react";
import { Button } from "antd";
import { Input } from "antd";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_amount: 0,
      refund_id: 0
    };

    this.paymentHandler = this.paymentHandler.bind(this);
    this.refundHandler = this.refundHandler.bind(this);
  }

  paymentHandler(e) {
    e.preventDefault();

    const { payment_amount } = this.state;
    const { influencerUsername } = this.props;
    const self = this;
    const options = {
      key: "rzp_test_Cb7G7uqX6QuPAo",
      amount: payment_amount * 100,
      name: "Payments",
      description: "Pay the amount to keep enjoying Collabere",

      handler(response) {
        const paymentId = response.razorpay_payment_id;
        const url =
          process.env.URL +
          "/api/v1/rzp_capture/" +
          paymentId +
          "/" +
          payment_amount;
        // Using my server endpoints to capture the payment
        fetch(url, {
          method: "get",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
          .then(resp => resp.json())
          .then(function(data) {
            console.log("Request succeeded with JSON response", data);
            self.setState({
              refund_id: response.razorpay_payment_id
            });
          })
          .catch(function(error) {
            console.log("Request failed", error);
          });
      },

      prefill: {
        name: influencerUsername
      },
      theme: {
        color: "#9D50BB"
      }
    };
    const rzp1 = new window.Razorpay(options);

    rzp1.open();
  }

  refundHandler(e) {
    e.preventDefault();
    const { refund_id } = this.state;
    const url = process.env.URL + "/api/v1/rzp_refunds/" + refund_id;

    // Using my server endpoints to initiate the refund
    fetch(url, {
      method: "get",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        console.log("Request succeeded with JSON response", data);
        alert("Refund Succeeded");
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }

  render() {
    const { payment_amount, refund_id } = this.state;
    return (
      <div>
        <Input
          value={payment_amount}
          placeholder="Amount in Rs"
          onChange={e => this.setState({ payment_amount: e.target.value })}
        />
        <div style={{ paddingTop: "2rem" }}>
          <Button type="primary" onClick={this.paymentHandler}>
            Make Payment
          </Button>
        </div>
      </div>
    );
  }
}

export default Checkout;
