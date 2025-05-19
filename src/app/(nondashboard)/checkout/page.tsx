"use client";

import Loading from "@/components/Loading";
import WizardStepper from "@/components/WizardStepper";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@clerk/nextjs";
import React from "react";
import CheckoutDetailsPage from "./details";
import PaymentPage from "./payment";

const CheckoutWizard = () => {
  // Check if user is loaded
  const { isLoaded } = useUser();

  const { checkoutStep } = useCheckoutNavigation();

  // Determine the step the step we're currently on. There are 3 steps, checkout details page, payment page, completion page.
  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return "Completion page";
      default:
        return "Checkout details page";
    }
  };

  if (!isLoaded) return <Loading />;
  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;
