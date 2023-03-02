import React from 'react'
import UserPageComponent from '../../../components/Admin/UserPageComponent'
import CommonAdminComponent from '../../../components/Common/CommonAdminComponent'

const UserPage = () => {
    return (
        <CommonAdminComponent>
            <UserPageComponent />
        </CommonAdminComponent>
    )
}

export default UserPage