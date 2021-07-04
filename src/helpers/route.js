export default function getRoute(name, query) {
    var path = routerList?.find(i => i.name == name)?.path
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            path = path?.replace(":" + key, query[key]);
        }
    }
    return path
}

export const routerList = [
    { name: "home",                     path: "/" },

    // ---------------------<AUTH>---------------------
    { name: "auth.login",               path: "/auth/login" },
    { name: "auth.forgot.password",     path: "/auth/request-password" },
    { name: "auth.reset.password",      path: "/auth/reset-password" },
    // ---------------------<AUTH>---------------------
    
    // ---------------------<Payment Request>---------------------
    { name: "input.payment.data",               path: "/payment-request/input-payment-data" },
    { name: "statement.printing",               path: "/payment-request/statement-printing" },
    // ---------------------<Payment Request>---------------------
    
    // ---------------------<Master Data>---------------------
    { name: "payees",       path: "/master-data/payees" },
    { name: "users",        path: "/master-data/users" },
    { name: "company",      path: "/master-data/company" },
    { name: "account",      path: "/master-data/account" },
    { name: "general",      path: "/master-data/general" },
    { name: "template",     path: "/master-data/template" },
    // ---------------------<Master Data>---------------------
    
    // ---------------------<Accounting>---------------------
    { name: "deadline.processing",      path: "/accounting/deadline-processing" },
    { name: "payment.planning",         path: "/accounting/payment-planning" },
    { name: "payment.confirmation",     path: "/accounting/payment-confirmation" },
    // ---------------------<Accounting>---------------------
    
    // ---------------------<Export>---------------------
    { name: "export.bank.transfer",     path: "/export/bank-transfer" },
    { name: "export.tkc",               path: "/export/tkc" },
    // ---------------------<Export>---------------------

]