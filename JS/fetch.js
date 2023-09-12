export const fetchApi = async(url) =>{
    const responde = await fetch(url)
    const data = responde.json()
    return data;
}