import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import {Link} from "react-router-dom"

const formSchema = yup.object().shape({
    name: yup.string().required("please input a name").min(2, "name must be more than 2 characters"),
    email: yup.string().email("must be a valid email").required("email is a required field"),
    address: yup.string().required("address is a required field"),
    flavor: yup.string().required("we need to know your flavor!!!"),
    size: yup.string().required("must include a size for your shirt"),
    terms: yup.boolean().oneOf([true], "must agree to terms")
});

export default function Form() {
    // state for your button and whether you can submit depending on if you fill out required fields
    const [button, setButton] = useState(true);
    // state for our form
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        address: "",
        flavor: "",
        size: "",
        terms: ""
    });