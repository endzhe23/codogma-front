import {axiosInstance} from "@/helpers/axiosInstance";
import {Article} from "@/types";
import Cookies from "js-cookie";

export const createArticle = async (requestData: {
    categoryIds: number[],
    title: string,
    content: string,
    tags?: string[],
    images?: File[]
}): Promise<Article> => {
    try {
        const response = await axiosInstance.post("/articles", requestData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating article: " + error.message);
        throw error;
    }
}


export const updateArticle = (id: number, requestData: {
    title?: string,
    content?: string
    categoryIds: number[]
}) => {
    axiosInstance.put(`/articles/${id}`, requestData)
        .then(() => console.log("Article updated successfully"))
        .catch((error: any) => {
            console.error("Error updating article: " + error.message);
        });
}

export const getArticles = async (category?: number, page: number = 0, size: number = 10, tag?: string, content?: string): Promise<{
    totalElements: number,
    totalPages: number,
    content: Article[]
}> => {
    try {
        const response = await axiosInstance.get('/articles', {params: {tag, content, category, page, size}});
        return {
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            content: response.data.content.map((article: Article) => ({
                ...article,
                authorAvatarUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${article.authorAvatarUrl}`
            }))
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}

export const getArticleById = async (id: number): Promise<Article> => {
    try {
        const response = await axiosInstance.get(`/articles/${id}`);
        const article: Article = response.data
        const username = article.username
        Cookies.set('username', username, {secure: true, sameSite: 'strict'});
        window.dispatchEvent(new Event("storage"));
        return {
            ...article,
            authorAvatarUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${article.authorAvatarUrl}`
        };
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

export const deleteArticle = (id: number) => {
    axiosInstance.delete(`/articles/${id}`)
        .then(() => console.log("Article deleted successfully"))
        .catch((error) => console.error(error))
}