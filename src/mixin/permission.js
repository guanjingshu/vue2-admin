import { isBaphd } from "@/utils";
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            menuList: state => state.user.menuList
        })
    },
    methods: {
        checkPermission(staType) {
            if(isBaphd()) {
                return true;
            }else {
                let codeName
                if(staType === '产品规模') {
                    codeName = 'productScale'
                }
            }
            return this.menuList.some(item => item.codeName === codeName)
        }
    }
}

