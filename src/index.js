import React from "react";
import ReactDOM from "react-dom/client";
import Button from "./components/Button";
import Accordion from "./components/Accordion";
import Form from "./components/Form/Form";
import Dropdown from "./components/Dropdown";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <header>
        <h1 className="mt-2 text-3xl font-extrabold">Componenti accessibili in React</h1>
        </header>        
    
        <main>
            <h2 className="mt-2 text-2xl font-bold">Button</h2>

            <button className="btn">sono un pulsante</button>
            <input type="button" value="sono un pulsante input" className="btn"/>

            <Button semantic="native" type="button"/>
            <Button semantic="native" type="button" text="Clicca qui" />
            <Button>Clicca qui</Button>

            <a href="#id" className="btn">non sono un pulsante</a>

            <hr className="my-2"/>

            <h2 className="mt-2 text-2xl font-bold">Form</h2>
            <Form />

            <hr className="my-2"/>

            <h2 className="mt-2 text-2xl font-bold">Accordion</h2>
            <Accordion title="titolo" semantic="native">testo</Accordion>
            <Accordion title="titolo">testo</Accordion>

            <hr className="my-2"/>

            <h2 className="mt-2 text-2xl font-bold">Dropdown</h2>
            <select className="mb-2 underline rounded-lg py-2 px-4 decoration-2 underline-offset-2 flex gap-1 transition-all hover:underline-offset-4 border border-gray-600 " aria-label="Seleziona un'opzione">
                <option>prima opzione</option>
                <option>secoda opzione</option>
                <option>terza opzione</option>
            </select>
            <label id="services">Seleziona un'opzione</label>
            <Dropdown
                id="services"
                title="Servizi"
                optionListSelected={[]}
                optionsList={[
                    { id: "0", name: "prima opzione", link: "/prima" },
                    { id: "1", name: "secoda opzione", link: "/seconda" },
                    { id: "2", name: "terza opzione", link: "/terza" },
                ]}
            />
        </main>
        <footer className="mt-8">
            ©DianaBernabei
        </footer>
    </React.StrictMode>
);
