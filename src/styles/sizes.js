// 575.98px
// 767.98
// 991.98px
// 1199.98px

export default {
    up(){},
    down(size){
        const sizes = {
            xs: '575.98px',
            sm: '767.98px',
            md: '991.98px',
            lg: '1199.98px'
        }
        return `@media(max-width: ${sizes[size]})`;
    }
}