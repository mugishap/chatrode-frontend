import React from 'react'
import AdminHomeComponent from '../../components/Admin/AdminHomeComponent'
import AdminComponent from '../../components/Admin/AdminHomeComponent'
import Sidebar from '../../components/Chat/Sidebar/Sidebar'
import CommonAdminComponent from '../../components/Common/CommonAdminComponent'

const Dashboard = () => {
  return (
    <CommonAdminComponent>
      <AdminHomeComponent />
    </CommonAdminComponent>
  )
}

export default Dashboard