import { useState } from "react";

const Accordion = ({ title, children, semantic }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return semantic === "native" ? (
        <details className="accordion">
            <summary>{"titolo accordion" || title}</summary>
            <div>
                {"testo accordion" || children}
            </div>
        </details>
    ) : (
        <div className="accordion">
            <button
                aria-expanded={isOpen}
                aria-controls="content"
                id="accordion-title"
                onClick={toggleAccordion}
                className="w-full text-left flex rounded-lg"
            >
               
                {isOpen ? <ArrowUpIcon width="1.5rem" /> : <ArrowDownIcon width="1.5rem"/>}
                {"titolo accordion" || title}

            </button>
            <div
                id="content"
                role="region"
                aria-labelledby="accordion-title"
                hidden={!isOpen}

            >
                {"testo accordion" || children}
                
            </div>
        </div>
    );
};

export default Accordion;

export function ArrowDownIcon(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path></svg>
    )
  }


export function ArrowUpIcon(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z"></path></svg>
    )
  }