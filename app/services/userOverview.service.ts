import { User } from "../model/user.model.js";
let pagedDefault: string = '?page=1&pagesize=2'

export class userOverviewServices {
    private apiUrl: string;

    constructor() {
        this.apiUrl = `http://localhost:46211/api/users${pagedDefault}`
    }

    getAll(): Promise<User[]> {
    return fetch(this.apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw { status: response.status, message: errorMessage }
                })
            }
            return response.json()
        })
        .then((responseData) => {
            return responseData.data as User[];
        })
        .catch(error => {
            console.error('Error', error.status)
            throw error
        });
    }
}

