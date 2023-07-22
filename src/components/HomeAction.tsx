"use client";

import store from "@/lib/store";
import Result from "./Result";
import Form from "./Form";

export default function HomeAction() {
  const { nutrients } = store();

  return (
    <div className="mx-auto flex justify-center items-center">
      {nutrients ? <Result /> : <Form />}
    </div>
  );
}
