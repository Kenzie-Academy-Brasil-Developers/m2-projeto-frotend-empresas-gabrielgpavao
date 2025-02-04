const baseUrl = 'http://localhost:6278'


export async function getAllSectors () {
    const requestAllSectors = await fetch(`${baseUrl}/sectors`, {
        method: 'GET'
    })
    const responseAllSectors = await requestAllSectors.json()

    return responseAllSectors
}


export async function getCompanies (sector) {
    const requestAllCompanies = await fetch(`${baseUrl}/companies/${sector}`, {
        method: 'GET'
    })
    const responseAllCompanies = await requestAllCompanies.json()

    return responseAllCompanies
}


export async function typeOfUser (token) {
    const requestUserType = await fetch(`${baseUrl}/auth/validate_user`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseUserType = await requestUserType.json()

    return responseUserType.is_admin
}


export async function login (body) {
    try{
        const requestLogin = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const responseLogin = await requestLogin.json()


        if (responseLogin.error == 'email invalid!') {
            throw new Error('E-mail inválido')
        } else if (responseLogin.error == 'password invalid!') {
            throw new Error('Senha inválida')
        }

        
        if (requestLogin.ok && await typeOfUser(responseLogin.token)) {
            localStorage.setItem('userToken', responseLogin.token)
            location.assign('../admin/admin.html')
            
        } else if (requestLogin.ok && !(await typeOfUser(responseLogin.token))) {
            localStorage.setItem('userToken', responseLogin.token)
            location.assign('../user/user.html')
        }

    }
    catch(error) {
        const spanError = document.querySelector('.error')
        spanError.innerText = error.message
        spanError.style.display = 'inline-block'
    }
}


export async function register (body) {

    try{
        const requestRegister = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const responseRegister = await requestRegister.json()
        
        if (responseRegister.error == 'email alread exists!') {
            throw new Error('E-mail já existente')
        }
        
        if (requestRegister.ok) {
            location.replace('../login/login.html')
        }
    }
    catch(error) {
        const spanError = document.querySelector('.error')
        spanError.innerText = error.message
        spanError.style.display = 'inline-block'
    }
}


export async function getUserInfo (token) {
    const requestUserInfo = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseUserInfo = await requestUserInfo.json()

    return responseUserInfo
}


export async function updateUserInfo (token, body) {
    const requestRegister = await fetch(`${baseUrl}/users`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}


export async function getUserCompanyInfo (token) {
    const requestCompanyInfo = await fetch(`${baseUrl}/users/departments`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseCompanyInfo = await requestCompanyInfo.json()

    return responseCompanyInfo
}


export async function getUserDepartmentInfo (token) {
    const requestDepartmentInfo = await fetch(`${baseUrl}/users/departments/coworkers`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseDepartmentInfo = await requestDepartmentInfo.json()

    return responseDepartmentInfo
}


export async function getAllDepartments (token, id = ''){
    const requestDepartments = await fetch(`${baseUrl}/departments/${id}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseDepartments = await requestDepartments.json()
    return responseDepartments
}


export async function createDepartment (token, body) {
    const requestNewDepartment = await fetch(`${baseUrl}/departments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}


export async function editDepartment (token, body, departmentId) {
    const requestEditDepartment = await fetch(`${baseUrl}/departments/${departmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const responseEditDepartment = await requestEditDepartment.json()
}


export async function deleteDepartment (token, departmentId) {
    const requestDeleteDepartment = await fetch(`${baseUrl}/departments/${departmentId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export async function hireEmployee (token, body) {
    const requestHireEmployee = await fetch(`${baseUrl}/departments/hire`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const responseHireEmployee = await requestHireEmployee.json()
}


export async function dismissEmployee (token, id) {
    const requestDismissEmployee = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    const responseDismissEmployee = await requestDismissEmployee.json()
}


export async function getAllUsers (token) {
    const requestAllUsers = await fetch(`${baseUrl}/users`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseAllUsers = await requestAllUsers.json()

    return responseAllUsers
}


export async function userOutOfWork (token) {
    const requestOutOfWork = await fetch(`${baseUrl}/admin/out_of_work`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
    })
    const responseOutOfWork = await requestOutOfWork.json()

    return responseOutOfWork
}


export async function editUserInfo (token, body, id) {
    const requestEditUserInfo = await fetch(`${baseUrl}/admin/update_user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    const responseEditUserInfo = await requestEditUserInfo.json()
}


export async function deleteUser (token, id) {
    const requestDeleteUser = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}