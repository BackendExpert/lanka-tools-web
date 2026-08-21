import React, { useState } from 'react'
import useForm from '../../../hooks/useForm';
import API from '../../../services/api';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import DefaultInput from '../../../component/Form/DefaultInput';
import Toast from '../../../component/Toast/Toast';

const UpdatePassword = ({ token }) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        current_pass: '',
        new_pass: ''
    });

    const headleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.patch('/profile/update-password', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => window.location.reload(), 3000);
            }
        }
        catch (err) {
            // console.log(err.response?.data);
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="">
                <form onSubmit={headleUpdatePassword} method="post">
                    <div className="">
                        <DefaultInput
                            label={"Enter Current Password "}
                            type='password'
                            value={values.current_pass}
                            name={'current_pass'}
                            required
                            placeholder={"Enter Current Password"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <DefaultInput
                            label={"Enter New Password "}
                            type='password'
                            value={values.new_pass}
                            name={'new_pass'}
                            required
                            placeholder={"Enter New Password"}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="">
                        <DefaultButton
                            type='submit'
                            label={loading ? 'Updating' : 'Update Password'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword