export interface User {
    
        id: number;
        name: string;
        username: string;
        email: string;
        address : Address;
        phone: number;   
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: geo;
}



export interface geo {
    lat: number;
    lng: number;
}
