const state = {
    common_query: {a: 1, b: 2, c: 3},
}

const mutations = {
    // 保存查询条件
    SET_COMMON_QUERY: (state, {common_query}) => {
        state.common_query = common_query
    },

}
const actions = {
    // 保存查询条件
    setCommonQuery({commit}, {common_query}) {
        commit('SET_COMMON_QUERY', {common_query})
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}