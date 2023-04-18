"use client";

import * as React from "react";
import { EmptyListings } from "./components/EmptyListings";

type ErrorStateProps = {
  error: Error;
};

const ErrorState = (props: ErrorStateProps) => {
  React.useEffect(() => {
    console.log({ error: props.error });
  }, [props.error]);

  return <EmptyListings title="Uh oh" subTitle="Something went wrong" />;
};

export default ErrorState;
