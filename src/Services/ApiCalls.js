const base_url = 'https://24urbanshop.com/';

class ApiCalls {
    async getApiCall(endPoint) {
        let url = `${base_url}` + endPoint;
        console.log(url)
        try {
            let request = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await request
            return result.json();
        } catch (error) {
            console.log(error)
            throw error.message;
        }
    }

    async postApiCall(params, endPoint) {
        var url = `${base_url}` + endPoint;
        console.log(url);
        try {
            let request = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' // , multipart/form-data
                },
                body: JSON.stringify(params)
            });

            let result = await request
            return result.json();
        }
        catch (error) {
            console.log(error)
            throw error.message;
        }
    }
}

const api = new ApiCalls();
export default api;