"use client";

import React from "react";
import StoreProvider from "@/state/redux"; // Include everthing we need to create a redux store

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
