export const PATH = {
    any: '*',
    root: '/',
    auth: '/auth',
    reg: '/reg',
    notFound: '/404',
    main: {
        root: '/main',
        products: 'products',
        productInfo: 'products/:id',
        sale: 'sale',
        userProducts: 'myproducts',
        cart: 'cart',
    },
    admin: {
        root: '/admin',
        applications: 'applications',
        users: 'users'
    },
}

export const ROLE = {
    client: 'client',
    admin: 'admin'
}

export const LS_TOKEN = "token";
