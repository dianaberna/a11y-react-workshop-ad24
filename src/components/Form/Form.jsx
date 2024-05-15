import { useEffect, useState } from 'react';
import Button from '../Button';

// Componente AccessibleForm per la gestione di un form accessibile
const AccessibleForm = () => {
    // Stato per memorizzare i dati del form
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: ''
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const label = {
        "name": "Nome",
        "lastname": "Cognome",
        "email": "Email"
    }

    // Stato per memorizzare gli errori di validazione
    const [errors, setErrors] = useState({});
    // Stato per gestire il messaggio del banner di feedback
    const [bannerMessage, setBannerMessage] = useState('');
    // Stato per gestire la classe CSS del banner di feedback
    const [bannerClass, setBannerClass] = useState('');

    // Gestore del cambio di input per aggiornare i dati del form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        validateInput(name, value);
    };

    // Gestore dell'evento blur per validare l'input quando perde il focus
    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateInput(name, value);
    };

    // Gestore dell'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();

        setBannerMessage('');
        setHasSubmitted(true);

        // Controlla se tutti i campi sono validi
        let count = 0;

        for(const key in formData) {
            if(!validateInput(key, formData[key])) count++
        }

        // Se il form è valido, mostra un messaggio di successo, altrimenti mostra un messaggio di errore
        if (count === 0) {
            setBannerMessage('Inviato con successo');
            setBannerClass('border-l-4 border-green-600 bg-green-100 p-2 my-4');
        }
    };

    // Funzione per validare l'input in base al nome del campo e al valore
    const validateInput = (name, value) => {
        let error = '';

        // Validazione per i campi nome e cognome
        if (name === 'name' || name === 'lastname') {
            if (!value) {
                error = `↳ ${capitalizeFirstLetter(label[name])} è un campo obbligatorio`;
            } else if (containsNumbers(value)) {
                error = `↳ ${capitalizeFirstLetter(label[name])} non può contenere numeri`;
            }
        // Validazione per il campo email
        } else if (name === 'email') {
            if (!value) {
                error = `↳ ${capitalizeFirstLetter(label[name])} è un campo obbligatorio`;
            } else if (!isValidEmail(value)) {
                error = `↳ ${capitalizeFirstLetter(label[name])} non è un indirizzo valido`;
            }
        }

        // Aggiorna lo stato degli errori
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));

        return error === '' ? true : false;
    };


    // Funzione per verificare se una stringa contiene numeri
    const containsNumbers = (str) => /\d/.test(str);

    // Funzione per verificare se una stringa è un'email valida
    const isValidEmail = (str) => /\S+@\S+\.\S+/.test(str);

    // Funzione per capitalizzare la prima lettera di una stringa
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);


    useEffect(()=>{
        const invalidFieldsCount = Object.values(errors).filter((error) => error).length;

        if(invalidFieldsCount && hasSubmitted) {
            setHasSubmitted(false);
            setBannerMessage(`Invio fallito: ${invalidFieldsCount} camp${invalidFieldsCount === 1 ? 'o non è valido' : 'i non sono validi'}`);
            setBannerClass('border-l-4 border-red-600 bg-red-100 p-2 my-4');
        }
    }, [errors, hasSubmitted])

    return (
        <div>
            <form id="accessibleForm" onSubmit={handleSubmit} className="flex flex-col items-start">
                <label htmlFor="name">{label.name} (obbligatorio)</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyUp={handleInputChange}
                    aria-required="true"
                    autoComplete="given-name"
                    className="mb-2"
                />
                {/* Messaggio di errore per il campo nome */}
                {errors.name && <span id="name-error" role="alert" className="text-red-600">{errors.name}</span>}

                <label htmlFor="lastname">{label.lastname} (obbligatorio)</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyUp={handleInputChange}
                    aria-required="true"
                    autoComplete="family-name"
                    className="mb-2"
                />
                {/* Messaggio di errore per il campo cognome */}
                {errors.lastname && <span id="lastname-error" role="alert" className="text-red-600">{errors.lastname}</span>}

                <label htmlFor="email">{label.email} (obbligatorio)</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyUp={handleInputChange}
                    aria-required="true"
                    autoComplete="email"
                />
                {/* Messaggio di errore per il campo email */}
                {errors.email && <span id="email-error" role="alert" className="text-red-600">{errors.email}</span>}

                {/* Banner di feedback per il risultato dell'invio del form */}
                {bannerMessage && <span id="bannerCheckSubmit" role="alert" className={bannerClass}>{bannerMessage}</span>}
                <Button type="submit" semantic="native">Invia i miei dati</Button>
            </form>
        </div>
    );
};

export default AccessibleForm;