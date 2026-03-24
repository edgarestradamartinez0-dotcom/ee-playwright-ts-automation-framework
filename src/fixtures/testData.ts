export const LoginData = {
    invalidUser: {
        email: 'invalid@test.com',
        password: 'wrongpassword',
    },
    emptyUser: {
        email: '',
        password: '',
    },
};

export const ProductData = {
    validSearchTerm: 'dress',
    invalidSearchTerm: 'xyzabcnotaproduct123',
};

export const ApiData = {
    validUserId: 1,
    invalidUserId: 9999,
    newUser: {
        name: 'Edgar',
        job: 'Senior QA Engineer',
    },
    updatedUser: {
        job: 'Lead QA Engineer',
    },
};

export const ExpectedText = {
    homeTitle: 'Automation Exercise',
    loginError: 'Your email or password is incorrect',
    searchedProductsHeading: 'Searched Products',
};
