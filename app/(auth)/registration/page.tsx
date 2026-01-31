"use client"

import { useEffect, useState } from "react";
import useFetchHelper from "@/lib/utility/custom-components/fetchHelper";
import style from "../auth.module.css";
import { useRouter } from "next/navigation";

function Registration() {

    const { isPending, fetchUrl, responeData, error } = useFetchHelper();
    const [formPayload, setFormPyload]= useState({
        fullName: '',
        gender: '',
        password: '',
        confirmPassword: '',
        email: ''
    });
    const router= useRouter();

    useEffect(() => {
        if (responeData) {
            console.log("response ",responeData);
            router.push('/profile-setting')
        }
    },[responeData]);

    const formInputTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPyload(payload => {
            return {
                ...payload,
                [event.target.id]: event.target.value
            }
        })
    }

    const formOptionelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormPyload(payload => {
            return {
                ...payload,
                [event.target.name]: event.target.id
            }
        })
    }

    const registerNewUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("aDATA ",formPayload);
        fetchUrl("/api/auth/register", "POST" ,formPayload)
    };



    return (
        <div className={style["form-wrapper"]}>
            <form className={`flex flex-col gap-2 ${style["auth-form-wrapper"]}`} onSubmit={registerNewUser}>
                <div className="flex flex-col grow gap-1">
                    <small><label htmlFor="fullName">Full Name:</label></small>
                    <input type="text" placeholder="Enter Your Name" id="fullName" onChange={formInputTextHandler}/>      
                </div>

                <div className="flex flex-col grow gap-1">
                    <small><label htmlFor="Email">Email:</label></small>
                    <input type="email" placeholder="Enter Your Email" id="email" onChange={formInputTextHandler}/>      
                </div>

                <div className="flex flex-col gap-1">
                    <small>Gender:</small>

                    <div>
                        <input type="radio" id="male" name="gender" className="mr-2" onChange={formOptionelectHandler}/>
                        <label htmlFor="male">He/Him</label>
                    </div>    

                    <div>
                        <input type="radio" id="female" name="gender" className="mr-2" onChange={formOptionelectHandler}/>
                        <label htmlFor="female">She/Her</label>
                    </div>
                    
                    <div>
                        <input type="radio" id="unmentioned" name="gender" className="mr-2" onChange={formOptionelectHandler}/>
                        <label htmlFor="unmentioned">Don't want to disclose</label>
                    </div>
                    
                </div>

                <div className="flex flex-col flex-1">
                    <small><label htmlFor="password">Password:</label></small>
                    <input type="password" placeholder="Enter Your Password" id="password" onChange={formInputTextHandler}/>      
                </div>

                <div className="flex flex-col flex-1">
                    <small><label htmlFor="confirmPassword">Confirm Password:</label></small>
                    <input type="password" placeholder="Enter Your Password" id="confirmPassword" onChange={formInputTextHandler}/>      
                </div>

                <button type="submit" className={style["submit-button"]}>Create My Store!</button>
            </form>
        </div>
    )
}

export default Registration;