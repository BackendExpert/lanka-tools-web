import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import API from "../../../services/api";
import DateInput from "../../../component/Form/DateInput";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import DefaultInput from "../../../component/Form/DefaultInput";
import TextAreaInput from "../../../component/Form/TextAreaInput";
import FileInput from "../../../component/Form/FileInput";
import Toast from "../../../component/Toast/Toast";

const UpdateProfile = ({ profiledata, token }) => {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const { values, handleChange, setValues } = useForm({
        first_name: "",
        last_name: "",
        mobile: "",
        dob: "",
        bio: "",
        profile_image: null,

        address: {
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
        },

        billing_address: {
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
        },
    });

    useEffect(() => {
        if (profiledata) {
            setValues({
                first_name: profiledata.first_name || "",
                last_name: profiledata.last_name || "",
                mobile: profiledata.mobile || "",
                dob: profiledata.dob
                    ? profiledata.dob.split("T")[0]
                    : "",
                bio: profiledata.bio || "",
                profile_image: null,

                address: {
                    address_line_1:
                        profiledata.address?.address_line_1 || "",
                    address_line_2:
                        profiledata.address?.address_line_2 || "",
                    city:
                        profiledata.address?.city || "",
                    state:
                        profiledata.address?.state || "",
                    postal_code:
                        profiledata.address?.postal_code || "",
                    country:
                        profiledata.address?.country || "",
                },

                billing_address: {
                    address_line_1:
                        profiledata.billing_address?.address_line_1 || "",
                    address_line_2:
                        profiledata.billing_address?.address_line_2 || "",
                    city:
                        profiledata.billing_address?.city || "",
                    state:
                        profiledata.billing_address?.state || "",
                    postal_code:
                        profiledata.billing_address?.postal_code || "",
                    country:
                        profiledata.billing_address?.country || "",
                },
            });
        }
    }, [profiledata, setValues]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleBillingAddressChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            billing_address: {
                ...prev.billing_address,
                [name]: value,
            },
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            if (values.first_name) {
                formData.append("first_name", values.first_name);
            }

            if (values.last_name) {
                formData.append("last_name", values.last_name);
            }

            if (values.mobile) {
                formData.append("mobile", values.mobile);
            }

            if (values.dob) {
                formData.append("dob", values.dob);
            }

            if (values.bio) {
                formData.append("bio", values.bio);
            }

            if (values.profile_image) {
                formData.append(
                    "profile_image",
                    values.profile_image
                );
            }

            if (values.address.address_line_1) {
                formData.append(
                    "address[address_line_1]",
                    values.address.address_line_1
                );
            }

            if (values.address.address_line_2) {
                formData.append(
                    "address[address_line_2]",
                    values.address.address_line_2
                );
            }

            if (values.address.city) {
                formData.append(
                    "address[city]",
                    values.address.city
                );
            }

            if (values.address.state) {
                formData.append(
                    "address[state]",
                    values.address.state
                );
            }

            if (values.address.postal_code) {
                formData.append(
                    "address[postal_code]",
                    values.address.postal_code
                );
            }

            if (values.address.country) {
                formData.append(
                    "address[country]",
                    values.address.country
                );
            }

            if (values.billing_address.address_line_1) {
                formData.append(
                    "billing_address[address_line_1]",
                    values.billing_address.address_line_1
                );
            }

            if (values.billing_address.address_line_2) {
                formData.append(
                    "billing_address[address_line_2]",
                    values.billing_address.address_line_2
                );
            }

            if (values.billing_address.city) {
                formData.append(
                    "billing_address[city]",
                    values.billing_address.city
                );
            }

            if (values.billing_address.state) {
                formData.append(
                    "billing_address[state]",
                    values.billing_address.state
                );
            }

            if (values.billing_address.postal_code) {
                formData.append(
                    "billing_address[postal_code]",
                    values.billing_address.postal_code
                );
            }

            if (values.billing_address.country) {
                formData.append(
                    "billing_address[country]",
                    values.billing_address.country
                );
            }

            const res = await API.patch(
                "/profile/update-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }

        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    "Something went wrong",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-4 text-lg font-bold text-gray-500 border-b border-gray-200 pb-2">
                Update Personal Information
            </div>

            <form onSubmit={handleUpdateProfile}>

                <div className="md:flex">
                    <div className="w-full">
                        <FileInput
                            label="Select Your Profile Image"
                            name="profile_image"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "profile_image",
                                        value:
                                            e.target.files?.[0] || null,
                                    },
                                })
                            }
                        />
                    </div>

                    <div className="w-full md:ml-2">
                        <DefaultInput
                            label="Enter First Name"
                            value={values.first_name}
                            name="first_name"
                            placeholder="Enter Your First Name"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="md:w-1/2 w-full md:mr-2">
                        <DefaultInput
                            label="Enter Last Name"
                            value={values.last_name}
                            name="last_name"
                            placeholder="Enter Your Last Name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:w-1/2 w-full">
                        <DefaultInput
                            label="Enter Mobile Number"
                            value={values.mobile}
                            name="mobile"
                            placeholder="Enter Your Mobile Number"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <DateInput
                        label="Enter Your Date of Birth"
                        value={values.dob}
                        name="dob"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <TextAreaInput
                        label="Enter Bio"
                        value={values.bio}
                        name="bio"
                        onChange={handleChange}
                        placeholder="Enter your Bio"
                    />
                </div>

                <div className="mt-6 mb-4 border-b border-gray-200 pb-2">
                    <h3 className="text-lg font-bold text-gray-700">
                        Residential Address
                    </h3>

                    <p className="text-sm text-gray-400">
                        Enter your current residential address
                    </p>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="Address Line 1"
                            value={values.address.address_line_1}
                            name="address_line_1"
                            placeholder="Enter Address Line 1"
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="Address Line 2"
                            value={values.address.address_line_2}
                            name="address_line_2"
                            placeholder="Enter Address Line 2"
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="City"
                            value={values.address.city}
                            name="city"
                            placeholder="Enter City"
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="State / Province"
                            value={values.address.state}
                            name="state"
                            placeholder="Enter State / Province"
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="Postal Code"
                            value={values.address.postal_code}
                            name="postal_code"
                            placeholder="Enter Postal Code"
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="Country"
                            value={values.address.country}
                            name="country"
                            placeholder="Enter Country"
                            onChange={handleAddressChange}
                        />
                    </div>
                </div>

                <div className="mt-6 mb-4 border-b border-gray-200 pb-2">
                    <h3 className="text-lg font-bold text-gray-700">
                        Billing Address
                    </h3>

                    <p className="text-sm text-gray-400">
                        Enter your billing address
                    </p>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="Address Line 1"
                            value={
                                values.billing_address.address_line_1
                            }
                            name="address_line_1"
                            placeholder="Enter Address Line 1"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="Address Line 2"
                            value={
                                values.billing_address.address_line_2
                            }
                            name="address_line_2"
                            placeholder="Enter Address Line 2"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="City"
                            value={values.billing_address.city}
                            name="city"
                            placeholder="Enter City"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="State / Province"
                            value={values.billing_address.state}
                            name="state"
                            placeholder="Enter State / Province"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="w-full md:w-1/2 md:mr-2">
                        <DefaultInput
                            label="Postal Code"
                            value={
                                values.billing_address.postal_code
                            }
                            name="postal_code"
                            placeholder="Enter Postal Code"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <DefaultInput
                            label="Country"
                            value={
                                values.billing_address.country
                            }
                            name="country"
                            placeholder="Enter Country"
                            onChange={
                                handleBillingAddressChange
                            }
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <DefaultButton
                        type="submit"
                        label={
                            loading
                                ? "Updating..."
                                : "Update My Data"
                        }
                    />
                </div>

            </form>
        </div>
    );
};

export default UpdateProfile;