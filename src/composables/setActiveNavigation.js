import  createStore  from '../store/index'

export const setActiveNav = (page) => {
    createStore.dispatch('setActiveNavigation', {page, value: true})    
}

