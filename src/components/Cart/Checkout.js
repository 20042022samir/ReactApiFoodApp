import classes from './Checkout.module.css'
import { useRef, useState } from 'react';

const isEmphty = value => value.trim() === ''
const isNotFiveChars = value => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputValidty, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;

        const enteredNameIsValid = isEmphty(enteredName);
        const enteredStreetIsValid = isEmphty(enteredStreet);
        const enteredPostalCodeIsValid = isNotFiveChars(enteredPostalCode);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        const formIsValid = enteredNameIsValid
            && enteredStreetIsValid
            && enteredPostalCodeIsValid;

        if (!formIsValid) {
            return
        }

    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name' >Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidty.name && <p style={{ color: 'red' }}>Please enter valid name!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='street'  >Your Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidty.street && <p style={{ color: 'red' }}>Please enter valid name!</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Your Name</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidty.postalCode && <p style={{ color: 'red' }}>Please enter valid name!</p>}
            </div>
            <button type='submit'>Confirm</button>
        </form>
    )
}

export default Checkout