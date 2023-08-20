import ky from "ky";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID

const $api = ky.create({
  prefixUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
})

export const getDataGoogleSheet = (range: string) =>
    $api(`${SHEET_ID}/values/${range}?key=${API_KEY}&valueRenderOption=FORMATTED_VALUE&majorDimension=COLUMNS`)
        .json()
