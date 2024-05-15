import { useState, useEffect, useRef, useCallback } from "react";

// Componente Dropdown che consente la selezione di opzioni da una lista
const Dropdown = ({ optionsList, optionListSelected, title, id }) => {
    // Variabili di stato per gestire il comportamento del dropdown
    const [isOptionsOpen, setIsOptionsOpen] = useState(false); // Controlla se le opzioni del dropdown sono visibili
    const [selectedOption, setSelectedOption] = useState([]); // Memorizza le opzioni selezionate
    const [isFocused, setIsFocused] = useState(0); // Gestisce l'opzione attualmente focalizzata
    const optionsRef = useRef([]); // Ref per gestire gli elementi delle opzioni
    const ref = useRef(null); // Ref per gestire l'elemento contenitore del dropdown

    // useCallback per aggiornare le opzioni selezionate
    const refreshSelectedOption = useCallback(() => {
        setSelectedOption((selectedOption) =>
            selectedOption.map((optionElement) => optionElement)
        );
    }, [setSelectedOption]);

    // Funzione per alternare la visibilità della lista delle opzioni
    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    // Funzione per eliminare un'opzione dalle opzioni selezionate
    const deleteOption = (option) => {
        const index = selectedOption.indexOf(option);
        let newSelectedOption = [...selectedOption];
        newSelectedOption.splice(index, 1);
        setSelectedOption(newSelectedOption);
        refreshSelectedOption();
    };

    // Funzione per selezionare o deselezionare un'opzione
    const setSelected = (option) => {
        if (option) {
            if (!selectedOption.includes(option)) {
                setSelectedOption([...selectedOption, option]);
            } else {
                deleteOption(option);
            }
        }
        refreshSelectedOption();
    };

    // Gestisce la navigazione tramite tastiera all'interno della lista delle opzioni
    const handleListKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                setIsOptionsOpen(false);
                break;
            case "ArrowUp":
                e.preventDefault();
                setIsFocused(
                    isFocused - 1 >= 0 ? isFocused - 1 : optionsList.length - 1
                );
                break;
            case "ArrowDown":
                e.preventDefault();
                setIsFocused(
                    isFocused === optionsList.length - 1 || isFocused == null
                        ? 0
                        : isFocused + 1
                );
                break;
            default:
                break;
        }
        refreshSelectedOption();
    };

    // Imposta l'opzione focalizzata quando si passa sopra di essa con il mouse
    const onHoverOption = (index) => {
        setIsFocused(index);
    };

    // Gestisce i click al di fuori del dropdown per chiuderlo
    const handleClickOutside = (event) => {
        if (ref.current && event.target && !ref.current.contains(event.target)) {
            setIsOptionsOpen(false);
        }
    };

    // Confronta due opzioni in ordine alfabetico per nome
    const compare = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    // Inizializza le opzioni selezionate quando il componente viene montato o aggiornato
    useEffect(() => {
        setSelectedOption(optionListSelected);
    }, [optionListSelected]);

    // Imposta i listener degli eventi per i click al di fuori del dropdown e focalizza l'opzione corrente
    useEffect(() => {
        if (isFocused != null) {
            optionsRef.current = optionsRef.current.slice(0, optionsList.length);
            optionsRef.current[isFocused]?.focus();
        }
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [isFocused, optionsList]);

    return (
        <div ref={ref}>
            {/* Bottone per alternare la visibilità delle opzioni del dropdown */}
            <button
                type="button"
                id={id}
                aria-expanded={isOptionsOpen}
                aria-haspopup="listbox"
                onClick={toggleOptions}
                onKeyDown={handleListKeyDown}
                className="underline rounded-lg py-2 px-4 decoration-2 underline-offset-2 flex gap-1 transition-all hover:underline-offset-4 border border-gray-600"
            >
                <div className="flex w-5/6 flex-row flex-wrap gap-2">
                    {title}
                </div>
                <div id="arrow" className="flex justify-end">
                    {isOptionsOpen ? (
                        <ArrowUpIcon width="1.5rem" />
                    ) : (
                        <ArrowDownIcon width="1.5rem" />
                    )}
                </div>
            </button>
            {/* Lista delle opzioni */}
            {isOptionsOpen ? (
                <div
                    role="listbox"
                    aria-label="lista di opzioni"
                    tabIndex={-1}
                    onKeyDown={handleListKeyDown}
                    aria-activedescendant={"button" + optionsList[isFocused]}
                    className="absolute bg-white border md:pl-0 border-neutral-200 rounded-lg mt-2 shadow-sm"
                >
                    {optionsList.sort(compare).map((option, index) => (
                        <div
                            key={index}
                            role="option"
                            aria-selected={Boolean(selectedOption.includes(option.id))}
                        >
                            <button
                                type="button"
                                key={index}
                                id={"button" + option.id}
                                aria-label={option.name}
                                role="menuitem"
                                tabIndex={0}
                                ref={(el) => {
                                    if (el) {
                                        optionsRef.current[index] = el;
                                    }
                                }}
                                onClick={() => setSelected(option.id)}
                                onMouseEnter={() => onHoverOption(index)}
                                value={option.id}
                                className="flex w-full items-center gap-2 px-4 py-2"
                            >
                                <span>
                                    {option.name}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Dropdown;

// Componente ArrowDownIcon per rendere l'icona SVG della freccia verso il basso
export function ArrowDownIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
            ></path>
        </svg>
    );
}

// Componente ArrowUpIcon per rendere l'icona SVG della freccia verso l'alto
export function ArrowUpIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z"
            ></path>
        </svg>
    );
}
