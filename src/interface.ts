export interface Auth {
    method: string,
    token: string
}

export interface IOrder {
    createdAt: string
    customer: string
    note: string
    product_id: string
    tags: string
    time: Date
    updatedAt: string
    _v: number
    _id: string
}