import React from "react";

export interface Post {
    id?: number | string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  export interface PostFormProps {
    formTitle: string;
    title: string;
    content: string;
    onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onContentChange: (content: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
    loading: boolean;
  }


  export interface PostDeleteModalProps {
    post: Post | null;
    open: boolean;
    handleClose: () => void;
    handleSubmit: (event: React.FormEvent) => void;
    loading: boolean;
  }
  