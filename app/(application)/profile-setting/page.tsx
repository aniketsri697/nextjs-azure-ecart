"use client"
import React, { useRef, useState } from "react";

import style from "../application.module.css"

function ProfilesSetting() {
    const fileEleRef= useRef<HTMLInputElement>(null);
    const [publicUrl, setPublicUrl]= useState('');

    const ImageFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.currentTarget.files?.[0];
        if (!file) return;
        console.log("selected file:", file);
        const res = await fetch("/api/application/uploadfile", { method: "POST" });
        const { uploadUrl, publicUrl } = await res.json();

        // 2️⃣ Upload file directly to Azure
        await fetch(uploadUrl, {
            method: "PUT",
            headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": file.type,
            },
            body: file,
        });

        console.log("Image uploaded!");
        console.log("Public URL:", publicUrl);
        if (publicUrl) {
            setPublicUrl(publicUrl);
        }
    }

    const sendNotification= async () => {
        fetch("https://fa-notification-app-dev-abfzaufqbdcbfzfd.centralindia-01.azurewebsites.net/api/OrderProcessTrigger",  {
            method: "POST",
            body: JSON.stringify({
                "name":"Aniket","email":"aniket697@gmail.com"
            })
        }).then((res) => res.json)
        .then((res) => {
            alert("Successful!!")
        })
        .catch((error) => {
            console.error("ERROR::: ",error);
        })
    }

    // http://localhost:3000/api/application/upload-file
    return (
        <div className={style["profile-wrapper"]}>
            <div className={style["profile-box"]}>
                <button onClick={sendNotification}>Send notification</button>
                <div className={style["user-profile-pic-box"]}>
                    {
                        publicUrl ?
                            <img src={publicUrl} alt="Img url" />
                        :
                        <>
                            <input type="file" style={{ display: "none" }}  ref={fileEleRef} onChange={ImageFileHandler}/>
                            <div
                                onClick={() =>  fileEleRef.current?.click()}
                                style={{
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                border: "3px solid white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: "#333"
                                }}
                            >
                                📸 Upload
                            </div>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilesSetting;