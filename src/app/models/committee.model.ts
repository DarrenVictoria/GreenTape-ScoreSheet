// src/app/models/committee.model.ts

export interface Question {
    id: string;
    weight: number;
}

export interface Section {
    name: string;
    sectionWeight: number;
    questions: Question[];
}

export interface Category {
    name: string;
    sections: Section[];
}

export interface SupplierData {
    answers: { [questionId: string]: string };
    scores: { [questionId: string]: number };
    categoryScore: number;
    sectionScore: number;
}

export interface Supplier {
    name: string;
    expanded: boolean;
    scorePercentage: string;
    data: SupplierData[];
}

export interface Member {
    name: string;
    categories: Category[];
    suppliers: Supplier[];
}

export interface Response {
    name: string;
    datetime: string;
    shortlisted?: boolean;
    committeeText: string;
    comment: string;
    score: number;
}

export interface Company {
    name: string;
    members: {
        committeeResponses?: Response[];
        nomineeResponses?: Response[];
        shortlistCommitteeResponses?: Response[];
        shortlistNomineeResponses?: Response[];
        preawardCommitteeResponses?: Response[];
        preawardNomineeResponses?: Response[];
    };
}

export interface Committee {
    name: string;
    members: Member[];
    responses: {
        shortlist: Company[];
        preaward: Company[];
        allShortlistPreaward: Company[];
    };
}