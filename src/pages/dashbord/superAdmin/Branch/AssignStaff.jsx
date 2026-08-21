import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../../../services/api'
import Toast from '../../../../component/Toast/Toast'
import useForm from '../../../../hooks/useForm'
import Dropdown from '../../../../component/Form/Dropdown'
import DefaultButton from '../../../../component/Buttons/DefaultButton'

const AssignStaff = () => {
    const token = localStorage.getItem('access_token')
    const [branches, setBranches] = useState([])
    const [users, setUsers] = useState([])
    const [toast, setToast] = useState(false)
    const [assignLoading, setAssignLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)
    const navigate = useNavigate()

    const { values: assignValues, handleChange: handleAssignChange } = useForm({
        branchId: '',
        staffId: '',
    })

    const { values: removeValues, handleChange: handleRemoveChange } = useForm({
        branchId: '',
        staffId: '',
    })

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await API.get('/admin/fetch-all-branches', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setBranches(res.data.result)
                }
            } catch (err) {
                setToast({
                    success: false,
                    message: err.response?.data?.message || 'Failed to fetch branches',
                })
            }
        }

        if (token) fetchBranches()
    }, [token])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get('/admin/fetch-users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    const staffUsers = res.data.result.filter(
                        (user) => user.role?.role === 'staff'
                    )

                    setUsers(staffUsers)
                }
            } catch (err) {
                setToast({
                    success: false,
                    message: err.response?.data?.message || 'Failed to fetch users',
                })
            }
        }

        if (token) fetchUsers()
    }, [token])

    const selectedAssignBranch = branches.find(
        (branch) => branch._id === assignValues.branchId
    )

    const selectedRemoveBranch = branches.find(
        (branch) => branch._id === removeValues.branchId
    )

    const assignedStaffIds = selectedAssignBranch?.staff_members?.map((staff) =>
        typeof staff === 'string' ? staff : staff?._id
    ) || []

    const removeAssignedStaffIds = selectedRemoveBranch?.staff_members?.map((staff) =>
        typeof staff === 'string' ? staff : staff?._id
    ) || []

    const availableUsers = users.filter(
        (user) => !assignedStaffIds.includes(user._id)
    )

    const assignedUsers = users.filter(
        (user) => removeAssignedStaffIds.includes(user._id)
    )

    const branchOptions = branches.map((branch) => ({
        value: branch._id,
        label: branch.branch_name,
    }))

    const assignUserOptions = availableUsers.map((user) => ({
        value: user._id,
        label: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
    }))

    const removeUserOptions = assignedUsers.map((user) => ({
        value: user._id,
        label: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
    }))

    const handleAssignBranchChange = (e) => {
        handleAssignChange(e)

        handleAssignChange({
            target: {
                name: 'staffId',
                value: '',
            },
        })
    }

    const handleRemoveBranchChange = (e) => {
        handleRemoveChange(e)

        handleRemoveChange({
            target: {
                name: 'staffId',
                value: '',
            },
        })
    }

    const headleAssignStaff = async (e) => {
        e.preventDefault()

        if (!assignValues.branchId || !assignValues.staffId) {
            setToast({
                success: false,
                message: 'Please select a branch and staff member',
            })
            return
        }

        setAssignLoading(true)

        try {
            const res = await API.patch(
                `/admin/assign-staff/${assignValues.branchId}/${assignValues.staffId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setAssignLoading(false)
        }
    }

    const headleRemoveStaff = async (e) => {
        e.preventDefault()

        if (!removeValues.branchId || !removeValues.staffId) {
            setToast({
                success: false,
                message: 'Please select a branch and staff member',
            })
            return
        }

        setRemoveLoading(true)

        try {
            const res = await API.patch(
                `/admin/remove-staff/${removeValues.branchId}/${removeValues.staffId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setRemoveLoading(false)
        }
    }

    return (
        <div className="">
            {toast && (
                <div className="fixed top-20 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Assign Staff
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Select a branch and assign one staff member.
                        </p>
                    </div>

                    <form onSubmit={headleAssignStaff}>
                        <Dropdown
                            label="Branch"
                            name="branchId"
                            value={assignValues.branchId}
                            onChange={handleAssignBranchChange}
                            required
                            options={branchOptions}
                        />

                        <Dropdown
                            label="Staff Member"
                            name="staffId"
                            value={assignValues.staffId}
                            onChange={handleAssignChange}
                            required
                            options={assignValues.branchId ? assignUserOptions : []}
                        />

                        <DefaultButton
                            type="submit"
                            label={assignLoading ? 'Assigning...' : 'Assign Staff'}
                        />
                    </form>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Remove Staff
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Select a branch to see its assigned staff.
                        </p>
                    </div>

                    <form onSubmit={headleRemoveStaff}>
                        <Dropdown
                            label="Branch"
                            name="branchId"
                            value={removeValues.branchId}
                            onChange={handleRemoveBranchChange}
                            required
                            options={branchOptions}
                        />

                        <Dropdown
                            label="Assigned Staff"
                            name="staffId"
                            value={removeValues.staffId}
                            onChange={handleRemoveChange}
                            required
                            options={removeValues.branchId ? removeUserOptions : []}
                        />

                        <DefaultButton
                            type="submit"
                            label={removeLoading ? 'Removing...' : 'Remove Staff'}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AssignStaff