export default {
    mounted(el) {
        el.addEventListener('click', (e) => {
            e.target.select()
        })
    }
}