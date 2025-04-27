import React, { useCallback } from "react";

// form to submit(react-hook-form)
import { useForm } from "react-hook-form";

// components in the form
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import RTE from "../RTE.jsx";
import Select from "../Select.jsx";

// configration by appwrite services
import service from "../../appwrite/config.js";


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function ({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slut || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    }) // this is from controller of react-hook-from

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim()
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace non-alphanumeric (excluding space) with "-"
                .replace(/\s+/g, "-"); // Replace spaces with "-"
    }, []);

    React.useEffect(() => {
        watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title),{shouldValidate: true})
            }
        })
     }, [watch, slugTransform,setValue])

     return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input 
                label = "Title"
                placeholder = "Title"
                className="mb-4"
                {...register("title",{ required: true })}
                />
                <Input
                label = "Slug  :"
                placeholder = "Slug"
                className="mb-4"
                {...register("slug",{required: true})}
                onInput={(e) => {
                    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate: true})
                }}
                />
                {/* Fro content use RTE */}
                <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div >
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select
                options={["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("image", {required: !post})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-400": undefined}
                className="w-full"
                >
                    {post ? "update": "Submit"}
                </Button>
            </div>
        </form>
     )
}

/*
const {register, handleSubmit, watch, setValue, control, getValues}  
// these are comes from useForm so that we don't need to set the state(pre build in useForm)
*/
// !post means --> if post is not there then we want it other wise we don't want it