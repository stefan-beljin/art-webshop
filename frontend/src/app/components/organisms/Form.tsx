"use client";

import { useActionState, useMemo } from "react";

import { sendEmail } from "@/app/lib/actions";
import FormModel from "@/app/models/formModel";
import Wrapper from "../atoms/Wrapper";
import ImageAtom from "../atoms/Image";
import { FaArrowRight } from "react-icons/fa";

import { $ZodIssue } from "zod/v4/core";

interface FormProps {
  data?: FormModel;
}

interface FormDataModel {
  firstName: string;
  lastName: string;
  email: string;
  question: string;
}

interface FormActionStateProps {
  errors: $ZodIssue[] | undefined;
  success: boolean;
  formData: FormDataModel | undefined;
}

const initialState: FormActionStateProps = {
  errors: undefined,
  success: false,
  formData: undefined,
};

export default function Form({ data }: FormProps) {
  const { id, title, image } = data || {};
  const [state, formAction] = useActionState(sendEmail, initialState);

  const groupedErrors = useMemo(() => {
    const grouped = state.errors?.reduce((groupedErrors, error) => {
      const key =
        error.path && error.path.length > 0 ? error.path[0] : "general";
      return {
        ...groupedErrors,
        [key]: error.message,
      };
    }, {} as Record<string, string>);

    return grouped || {};
  }, [state]);

  return (
    <section id={id}>
      <Wrapper extraClasses="md:flex justify-between gap-[40px]">
        {state.success ? (
          <p>
            Hvala što ste zainteresovani, odgovoriću vam u najkraćem mogućem
            roku.
          </p>
        ) : (
          <>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {image && (
                <ImageAtom
                  image={image}
                  className="mb-4 rounded-[16px] w-[80%]"
                />
              )}
              <p className="sm:flex gap-[10px] items-center text-[28px] hidden">
                Popunite formu! <FaArrowRight className="animate-point" />
              </p>
            </div>
            <form
              id={id}
              action={formAction}
              className="bg-white text-black flex-1"
            >
              <ul>
                <li className="mb-4">
                  <label className="block">Ime</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={
                      state.formData?.firstName
                        ? String(state.formData.firstName)
                        : ""
                    }
                    className="w-full border-1 border-black p-2"
                  />
                  {groupedErrors && groupedErrors["firstName"] && (
                    <span className="mb-4 text-red-600">
                      {groupedErrors["firstName"]}
                    </span>
                  )}
                </li>
                <li className="mb-4">
                  <label className="block">Prezime</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={
                      state.formData?.lastName
                        ? String(state.formData.lastName)
                        : ""
                    }
                    className="w-full border-1 border-black p-2"
                  />
                  {groupedErrors && groupedErrors["lastName"] && (
                    <span className="mb-4 text-red-600">
                      {groupedErrors["lastName"]}
                    </span>
                  )}
                </li>
                <li className="mb-4">
                  <label className="block">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={
                      state.formData?.email ? String(state.formData.email) : ""
                    }
                    className="w-full border-1 border-black p-2"
                  />
                  {groupedErrors && groupedErrors["email"] && (
                    <span className="mb-4 text-red-600">
                      {groupedErrors["email"]}
                    </span>
                  )}
                </li>
                <li className="mb-4">
                  <label className="block">Pitanje</label>
                  <textarea
                    name="question"
                    defaultValue={
                      state.formData?.question
                        ? String(state.formData.question)
                        : ""
                    }
                    className="border-1 border-black w-full p-2"
                    rows={10}
                  />
                  {groupedErrors && groupedErrors["question"] && (
                    <span className="mb-4 text-red-600">
                      {groupedErrors["question"]}
                    </span>
                  )}
                </li>
                <li>
                  <button className="p-2 bg-black rounded text-white">
                    Pošalji
                  </button>
                </li>
              </ul>
            </form>
          </>
        )}
      </Wrapper>
    </section>
  );
}
