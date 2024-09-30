const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  icons: (state) => {
    const iconList = state.user.iconList;
    return iconList
  }
}
export default getters
