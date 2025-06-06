import { sendEmail } from "@/app/lib/actions";
import FormModel from "@/app/models/formModel";

import Wrapper from "../atoms/Wrapper";

interface FormProps {
  data?: FormModel;
}

export default function Form({ data }: FormProps) {
  const { id, title } = data || {};

  return (
    <section id={id}>
      <Wrapper extraClasses="flex justify-between">
        <h2 className="text-3xl font-bold mb-4 flex-1">{title}</h2>
        <form id={id} action={sendEmail} className="bg-white text-black flex-1">
          <ul>
            <li className="mb-4">
              <label className="block">Ime</label>
              <input
                type="text"
                name="firstName"
                className="w-full border-1 border-black p-2"
              />
            </li>
            <li className="mb-4">
              <label className="block">Prezime</label>
              <input
                type="text"
                name="lastName"
                className="w-full border-1 border-black p-2"
              />
            </li>
            <li className="mb-4">
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border-1 border-black p-2"
              />
            </li>
            <li className="mb-4">
              <label className="block">Pitanje</label>
              <textarea
                name="question"
                className="border-1 border-black w-full p-2"
                rows={10}
              />
            </li>
            <li>
              <button className="p-2 bg-black rounded text-white">
                Pošalji
              </button>
            </li>
          </ul>
        </form>
      </Wrapper>
    </section>
  );
}
