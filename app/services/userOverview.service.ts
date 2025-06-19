import { User } from "../model/user.model.js";
import { UserFormData } from "../model/userFormData.model.js";
const pagedDefault: string = '?page=1&pagesize=10'

export class UserOverviewServices {
    private apiUrl: string;

    constructor() {
        this.apiUrl = `http://localhost:46211/api/users`
    }

    getAll(): Promise<User[]> {
        return fetch(this.apiUrl + pagedDefault)
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

    getById(id: string): Promise<User> {
        return fetch(this.apiUrl + '/' + id)
            .then(response => {
                if (!response.ok) {
                    const error: any = new Error('Request failed. Status: ' + response.status);
                    error.response = response
                    throw error
                }
                return response.json()
            })
            .catch(error => {
                console.error('Error:', error.message);
                if (error.response && error.response.status === 404) {
                    alert('ERROR: Korisnik ne postoji!');
                } else {
                    alert('ERROR: Došlo je do greške pri učitavanju korisnika. Probajte ponovo!');
                }
                throw error;
            });
    }

    add(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((book: User) => {
                return book;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    update(id:string, formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((book: User) => {
                return book;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }


    delete(user: User): Promise<void> {
        return fetch(`http://localhost:46211/api/users/${user.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(message => {
                        throw new Error(`Greška ${response.status}: ${message}`);
                    });
                }
            })
            .catch(error => {
                console.error('Greška pri brisanju:', error.message);
                alert('Došlo je do greške pri brisanju korisnika. Pokušajte ponovo.');
                throw error;
            });
    }
}


