import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import {Link} from "react-router-dom"

const formSchema = yup.object().shape({
    name: yup.string().required("please input a name").min(2, "name must be more than 2 characters"),
    size: yup.string().required("Please a size for your pizza"),
    top1: yup.boolean().oneOf([true || false], "please choose a topping"),
    top2: yup.boolean().oneOf([true || false], "please choose a topping"),
    top3: yup.boolean().oneOf([true || false], "please choose a topping"),
    top4: yup.boolean().oneOf([true || false], "please choose a topping"),
    instructions: yup.string().required("LEt us know if there are any special instructions")
});

export default function Form() {
    // state for your button and whether you can submit depending on if you fill out required fields
    const [button, setButton] = useState(true);
    // state for our form
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        top1: "",
        top2: "",
        top3: "",
        top4: "",
        instructions: "",

    });

    // state for errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        top1: "",
        top2: "",
        top3: "",
        top4: "",
        instructions: "",
    });

    // state for our post request 
    const [post, setPost] = useState([]);
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        });
    }, [formState]);
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/pizza-orders", formState)
            .then(res => {
                setPost(res.data); 
                setFormState({
                    name: "",
                    size: "",
                    top1: "",
                    top2: "",
                    top3: "",
                    top4: "",
                    instructions: "",
                });
            })
            .catch(err => console.log("something went wrong when submitting your form", err.response));
    };

const validateChange = e => {
    yup 
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            });
        });
};
const inputChange = e => {
    e.persist(); // constantly checking to see what the user is typing in and checking if its valid
    const newFormData = {
        ...formState,
        [e.target.name]:
        e.target.type  === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
};

return (
    <form onSubmit={formSubmit}>
        <Link to={"/"}>
            <div>Home</div>
        </Link>
        <h1>Let's Build Your Pizza!</h1>
        <label htmlFor="name">
            Name: 
            <input
                id="name" // connects to the htmlFor
                type="text"
                name="name"
                value={formState.name}
                onChange={inputChange}
            />
            {/* this error 👇 connects with the schema for the first error that we have written */}
             {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null} 
        </label> <br/>
        
        <label htmlFor="size">
            What size pizza would you like?
             <select 
                id="size" 
                name="size" 
                onChange={inputChange}>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </select>
        </label> <br/>
        <label>
            <Field type="checkbox" name="top1" checked = {values.tos}/>Sausage
             {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null} 
        </label>
        <label>
            <Field type="checkbox" name="top2" checked = {values.tos}/>Sausage
             {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null} 
        </label>
        <label>
            <Field type="checkbox" name="top3" checked = {values.tos}/>Sausage
             {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null} 
        </label>
        <label>
            <Field type="checkbox" name="top4" checked = {values.tos}/>Sausage
             {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null} 
        </label>
          {/* displaying our post request data */}
          <pre>{JSON.stringify(post, null, 2)}</pre>
          <button disabled={button}>Submit</button>
    </form>
)

}
