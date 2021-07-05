import { localStorageKey } from "helpers/consts"

export function language() {
    if(getLanguage() == 'en')
        return en
    return jp
}

export function getLanguage() {
    var defaultLanguage = "en"
    if(localStorage.getItem(localStorageKey.language)) {
        defaultLanguage = localStorage.getItem(localStorageKey.language)
    }
    return defaultLanguage
}

export function setLanguage(language) {
    localStorage.setItem(localStorageKey.language, language)
    window.location.reload()
}

const en = {
    menu: {
        home: "Home Page",
        paymentRequest: "Payment Request",
        inputPaymentData: "Input Payment Data",
        statementPrinting: "Statement Printing",
        masterData: "Master Data",
        payees: "Payees",
        users: "Users",
        company: "Company",
        account: "Account",
        general: "General",
        template: "Template",
        accounting: "Accounting",
        deadlineProcessing: "Deadline Processing",
        paymentPlanning: "Payment Planning",
        paymentConfirmation: "Payment Confirmation",
        export: "Export",
        exportDataForBankTransfer: "Export Data for Bank Transfer",
        exportDataForTkc: "Export Data for TKC",
        profile: "Profile",
        login: "Login",
        logout: "Logout",
        requestPassword: "Request Password",
        forgotPassword: "Forgot Password",
        resetPassword: "Reset Password",
    },
    subtitle: {
        forgotPassword: "Input your email address and follow the intruction sent to your email",
    },
    placeholder: {
        companyName: "Company Name",
        userId: "User ID",
        password: "Password",
        email: "Email Address",
        oldPassword: "Old Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
    },
    sentence: {
        backToLogin: "Back To Login",
        rememberMe: "Remember Me",
    }
}

const jp = {
    menu: {
        home: "Home Page",
        paymentRequest: "Payment Request",
        inputPaymentData: "Input Payment Data",
        statementPrinting: "Statement Printing",
        masterData: "Master Data",
        payees: "Payees",
        users: "Users",
        company: "Company",
        account: "Account",
        general: "General",
        template: "Template",
        accounting: "Accounting",
        deadlineProcessing: "Deadline Processing",
        paymentPlanning: "Payment Planning",
        paymentConfirmation: "Payment Confirmation",
        export: "Export",
        exportDataForBankTransfer: "Export Data for Bank Transfer",
        exportDataForTkc: "Export Data for TKC",
        profile: "Profile",
        login: "Login",
        logout: "Logout",
        requestPassword: "Request Password",
        forgotPassword: "Forgot Password",
        resetPassword: "Reset Password",
    },
    subtitle: {
        forgotPassword: "Input your email address and follow the intruction sent to your email",
    },
    placeholder: {
        companyName: "Company Name",
        userId: "User ID",
        password: "Password",
        email: "Email Address",
        oldPassword: "Old Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
    },
    sentence: {
        backToLogin: "Back To Login",
        rememberMe: "Remember Me",
    }
}