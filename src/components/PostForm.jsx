import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputBox, Select } from "./index.js";
import RTE from "./RTE.jsx";
import appwriteSerice from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteSerice.uploadFile(data.image[0]) : null;
      if (file) appwriteSerice.deleteFile(post.featuredimage);

      const dbPost = await appwriteSerice.updatePost({
        id: post.$id,
        ...data,
        featuredimage: file ? file.$id : post.featuredimage,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteSerice.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;
        const dbPost = await appwriteSerice.createPost({ ...data, userId: userData.$id });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
  }, []);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-6 transition-all duration-300"
    >
      <div className="w-full lg:w-2/3 px-2">
        <InputBox
          label="Title"
          placeholder="Title"
          className="mb-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
          {...register("title", { required: true })}
        />
        <InputBox
          label="Slug"
          placeholder="Slug"
          className="mb-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <div className="transition duration-300 transform hover:scale-[1.01]">
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-2">
        <InputBox
          label="Featured Image"
          type="file"
          className="mb-4 cursor-pointer file:cursor-pointer transition-all duration-300 file:hover:bg-indigo-100"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
            <img
              src={appwriteSerice.getFileView(post.featuredimage)}
              alt={post.title}
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 transition-colors duration-300 hover:bg-indigo-50"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-indigo-600"}
          className="w-full transition-all duration-300 hover:brightness-110 hover:shadow-lg"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}







// import React, { useCallback } from "react";

// // form to submit(react-hook-form)
// import { useForm } from "react-hook-form";

// // components in the form
// import Button from "../Button.jsx";
// import Input from "../Input.jsx";
// import RTE from "../RTE.jsx";
// import Select from "../Select.jsx";

// // configration by appwrite services
// import appwriteService from "../../appwrite/config.js";


// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


// // Submit function for form submit
// const submit = async (data) => {
//     if (post) {
//         const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
//         if (file) {
//             service.deleteFile(post.featuredImage)
//         }
//         const dbPost = await service.updatePost(post.$id, {
//             ...data, featuredImage: file ? file.$id : undefined
//         })
//         if (dbPost) {
//             navigate(`/post/${dbPost.$id}`)
//         }
//     } else {
//         const file = await service.uploadFile(data.image[0])
//         if (file) {
//             const fileId = file.$id
//             data.featuredImage = fileId
//             const dbPost = await service.createPost(
//                 {
//                     ...data,
//                     userId: userData.$id
//                 }
//             )
//             if(dbPost){
//                 navigate(`/post/${dbPost.$id}`)
//             }
//         }
//     }
// }

// export default function ({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.slut || "",
//             content: post?.content || "",
//             status: post?.status || "active"
//         }
//     }) // this is from controller of react-hook-from

//     const navigate = useNavigate()
//     const userData = useSelector((state) => state.auth.userData)

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value.trim()
//                 .toLocaleLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace non-alphanumeric (excluding space) with "-"
//                 .replace(/\s+/g, "-"); // Replace spaces with "-"
//     }, []);

//     React.useEffect(() => {
//         watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true })
//             }
//         })
//     }, [watch, slugTransform, setValue])

//     return (
//         <form onSubmit={handleSubmit(submit)}
//             className="flex flex-wrap"
//         >
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug  :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
//                     }}
//                 />
//                 {/* Fro content use RTE */}
//                 <RTE
//                     label="Content"
//                     name="content"
//                     control={control}
//                     defaultValue={getValues("content")}
//                 />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div >
//                         <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg" />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("image", { required: !post })}
//                 />
//                 <Button
//                     type="submit"
//                     bgColor={post ? "bg-green-400" : undefined}
//                     className="w-full"
//                 >
//                     {post ? "update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     )
// }

// /*
// const {register, handleSubmit, watch, setValue, control, getValues}
// // these are comes from useForm so that we don't need to set the state(pre build in useForm)
// */
// // !post means --> if post is not there then we want it other wise we don't want it