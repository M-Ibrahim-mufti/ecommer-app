export default class Development {
    BASE_URL = 'http://localhost:3000';
    BACKEND_URL = 'http://localhost:5000';
    
    setHeaders = (token) => {
        headers = {
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${token}` 
            }
        }
    };
}
