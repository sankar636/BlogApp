// Appwrite Database Api(reference)

import conf from '../conf/conf.js'

import { Client, ID, Databases, Storage, Query } from 'appwrite'

// Part(1) ---> using class(OOPs)
export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(slug, {title, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            
        }
    }

    async updatePost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,            
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
                )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // getPost(single document)
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error);            
            return false
        }
    }
    // getAllPost
    // indexes in appwrite
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(error);            
            return false
        }
    }

    // file upload services
    async uplloadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
         console.log(error);
         return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

// export class Service{}

const service = new Service()

export default service


// A database is like a structured Excel sheet where data is organized in rows and columns.
// A bucket is like a Google Drive folder where you store and retrieve different types of files.


/*
//Part(2.)  ---> using function

// Initialize client, database, and storage
const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const databases = new Databases(client);
const bucket = new Storage(client);

// Post services
async function createPost(slug, { title, content, featuredImage, status, userId }) {
    try {
        return await databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status, userId }
        );
    } catch (error) {
        console.log("Service :: createPost :: error", error);
        throw error;
    }
}

async function updatePost({ title, slug, content, featuredImage, status }) {
    try {
        return await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            { title, content, featuredImage, status }
        );
    } catch (error) {
        console.log("Service :: updatePost :: error", error);
        throw error;
    }
}

async function deletePost(slug) {
    try {
        await databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.log("Service :: deletePost :: error", error);
        return false;
    }
}

async function getPost(slug) {
    try {
        return await databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("Service :: getPost :: error", error);
        return false;
    }
}

async function getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        console.log("Service :: getPosts :: error", error);
        return false;
    }
}

// File services
async function uploadFile(file) {
    try {
        return await bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Service :: uploadFile :: error", error);
        return false;
    }
}

async function deleteFile(fileId) {
    try {
        await bucket.deleteFile(conf.appwriteBucketId, fileId);
        return true;
    } catch (error) {
        console.log("Service :: deleteFile :: error", error);
        return false;
    }
}

function getFilePreview(fileId) {
    return bucket.getFilePreview(conf.appwriteBucketId, fileId);
}

// Export all functions together as a service
const service = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    uploadFile,
    deleteFile,
    getFilePreview,
};

export default service;

*/