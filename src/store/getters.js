const getters = {
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  token: state => state.user.token,
  status: state => state.user.status,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  isAdded: state => state.permission.isAdded,
}
export default getters
