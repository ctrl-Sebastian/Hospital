import {z} from 'zod'

export const createBillSchema = z.object({
    balance: z.number({
        required_error: 'Balance must be an integer'
    }),
    billStatus: z.string({
        required_error: 'Bill Status must be a string'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    })
})