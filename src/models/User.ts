// src/models/User.ts

export interface Comment {
postId: number;
id: number;
name: string;
email: string;
body: string;
}

export interface Post {
userId: number;
id: number;
title: string;
body: string;
comments: Comment[];
}

export interface Address {
street: string;
suite: string;
city: string;
zipcode: string;
geo: {
lat: string;
lng: string;
};
}

export interface Company {
name: string;
catchPhrase: string;
bs: string;
}

export interface User {
id: number;
name: string;
username: string;
email: string;
address: Address;
phone: string;
website: string;
company: Company;
posts: Post[];
}