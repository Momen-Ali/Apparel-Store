import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MDGXODJo59HcZdX3ls5wcmqpYPkI7cY6czjM2TZGYeKAQVeFht2rLx6SiS6p8bDviJ16WgySNhYqcrUw9wrJ0XC008JnTmZOU"
);

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const CheckoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      country: yup.string().required("Country is required"),
      street1: yup.string().required("Street is required"),
      street2: yup.string(),
      city: yup.string().required("City is required"),
      state: yup.string().required("State is required"),
      zipCode: yup.string().required("Zip code is required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("First name is required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Last name is required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Country is required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Street is required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("City is required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("State is required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Zip code is required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    //copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({});
  };
  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };
    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }
  return (
    <Box width="80%" margin="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={CheckoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: "0",
                      padding: "15px 40",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: "0",
                    padding: "15px 40",
                  }}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
