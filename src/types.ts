export type applicationData = applicationName &  otherInfo;


export interface applicationName {
    firstName? :string;
    middleName? :string;
    lastName? :string;
    suffix? :string;
}

export interface otherInfo {
    email? :string;
    phoneNumber? :string;
    address: address;
    notes? :string;
    company? :company;
}

export interface company {
    name? :string;
    website? :string;
    employees? : number;
}

export interface address {
    street? :string;
    city? :string;
    state? :string;
    zipCode? :string;
    country? :string;
    additionalInfo? :string;
    primary? :boolean;
    secondary? :boolean;
    mailing? :boolean;
    billing? :boolean;
    shipping? :boolean;
}