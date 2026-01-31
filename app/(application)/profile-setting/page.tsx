"use client"
import React, { useRef } from "react";

import style from "../application.module.css"

function ProfilesSetting() {
    const fileEleRef= useRef<HTMLInputElement>(null);

    const ImageFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.currentTarget.files?.[0];
        if (!file) return;
        console.log("selected file:", file);
        const res = await fetch("/api/application/upload-file", { method: "POST" });
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
    }

    // http://localhost:3000/api/application/upload-file
    return (
        <div className={style["profile-wrapper"]}>
            <div className={style["profile-box"]}>
                <div className={style["user-profile-pic-box"]}>
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
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilesSetting;