const {
    GH_TOKEN
} = process.env

export const config = {
    GH_TOKEN: `${GH_TOKEN}` || 'BAD_CREDENTIALS'
}