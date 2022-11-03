import { editUserInfo, deleteUser } from "../../../request.js";
import { renderUsersList } from "./admin.js";

const userToken = localStorage.getItem('userToken')


export function createEditUserModal (userId) {
    let divModalEditUser = document.createElement('div')
    let sectionModalEdit = document.createElement('section')
    let spanCloseModal   = document.createElement('span')
    let h2ModalTitle     = document.createElement('h2')
    let formEdit         = document.createElement('form')

    divModalEditUser.className = 'modal-bg'
    sectionModalEdit.classList = 'modal modal-edit'
    spanCloseModal.className   = 'close-modal'
    spanCloseModal.innerText   = 'X'
    spanCloseModal.addEventListener('click', () => {divModalEditUser.remove()})
    h2ModalTitle.innerText     = 'Editar Usuário'

    formEdit.insertAdjacentHTML('afterbegin', `
        <form>
            <select id="select" class="default">
                <option value="null">Selecionar modalidade de trabalho </option>
                <option value="presencial">Presencial</option>
                <option value="home office">Home Office</option>
                <option value="hibrido">Híbrido</option>
            </select>

            <select class="default">
                <option value="null">Selecionar nível profissional</option>
                <option value="estágio">Estagiário</option>
                <option value="júnior">Junior</option>
                <option value="pleno">Pleno</option>
                <option value="sênior">Sênior</option>
            </select>
            <button type="submit">Editar</button>
        </form>
    `)
    
    formEdit.addEventListener('submit', async (event) => {
        event.preventDefault()
        let editedUserBody = {}

        let editedKindOfWork = formEdit.elements[0].value
        let editedProLevel   = formEdit.elements[1].value

        editedUserBody = {
            kind_of_work: editedKindOfWork,
	        professional_level: editedProLevel
        }

        await editUserInfo(userToken, editedUserBody, userId)

        await renderUsersList()
        divModalEditUser.remove()
    })
    
    sectionModalEdit.append(spanCloseModal, h2ModalTitle, formEdit)
    divModalEditUser.appendChild(sectionModalEdit)
    document.body.appendChild(divModalEditUser)
     
}

export function createDeleteUserModal (userName, userId) {
    let divModalDeleteUser = document.createElement('div')
    let sectionModalDelete = document.createElement('section')
    let spanCloseModal = document.createElement('span')
    let pMessage = document.createElement('p')
    let buttonDelete = document.createElement('button')


    divModalDeleteUser.className = 'modal-bg'
    sectionModalDelete.classList = 'modal modal-delete'
    spanCloseModal.innerText = 'X'
    spanCloseModal.addEventListener('click', () => { divModalDeleteUser.remove() })
    pMessage.innerText = `Realmente deseja remover o usuário ${userName}?`
    buttonDelete.innerText = 'Deletar'

    buttonDelete.addEventListener('click', async () => {
        await deleteUser(userToken, userId)

        await renderUsersList()
        divModalDeleteUser.remove()
    })


    sectionModalDelete.append(spanCloseModal, pMessage, buttonDelete)
    divModalDeleteUser.appendChild(sectionModalDelete)
    document.body.appendChild(divModalDeleteUser)
}