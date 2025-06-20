export interface occupationType{
    eng_name: string,
    chi_name: string,
    created_at: string,
    occupation_id: number,
    price: number,
    price_id: string,
    img_url: string,
    img_path: string,
    category: string,
}

export interface questionType{
    question: string,
    answer: string,
    created_at: string,
    question_id: number,
    occupation_id: number,
    [key: string]: any
}

export interface cartType{
    cart_id: number,
    occupation_id: number,
    user_id: string,
    occupation: any
}

export interface atsResultType{
    id: number,
    job_title: string,
    job_description: string,
    response: {
        rating: number,
        summary: string,
        strengths: atsContentType[],
        areasOfImprovement: atsContentType[]
    }
}

export interface atsContentType{
    header: string,
    paragraph: string,
}
  