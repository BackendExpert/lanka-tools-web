import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import {
    FaUsers,
    FaBox,
    FaLayerGroup,
    FaMoneyBillWave,
    FaClock,
} from 'react-icons/fa6'
import { useAuth } from '../../../context/AuthContext'

const CountData = () => {
    const token = localStorage.getItem('access_token')

    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [categories, setCategoris] = useState([])
    const [income, setIncome] = useState([])
    const [latefee, setLateFees] = useState([])
    const [loading, setLoading] = useState(true)
    const [rentalTools, setRentalTools] = useState([])

    const { auth } = useAuth()

    const role = String(
        auth?.role?.role ||
        auth?.role ||
        auth?.user?.role?.role ||
        auth?.user?.role ||
        ''
    ).toLowerCase().trim()

    const isCustomer = role === 'customer'
    const isStaff = role === 'staff'

    useEffect(() => {
        const fetchmyretaltools = async () => {
            try {
                const res = await API.get('/rentel/my-rental-tools', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setRentalTools(res.data.result || [])
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (token) {
            fetchmyretaltools()
        }
    }, [token])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get('/product/fetch-products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setProducts(res.data.result || [])
                }
            } catch (error) {
                console.error('Products:', error)
            }
        }

        if (token) {
            fetchProducts()
        }
    }, [token])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await API.get('/product/fetch-categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setCategoris(res.data.result || [])
                }
            } catch (error) {
                console.error('Categories:', error)
            }
        }

        if (token) {
            fetchCategories()
        }
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
                    setUsers(res.data.result || [])
                }
            } catch (error) {
                console.error('Users:', error)
            }
        }

        if (token && !isCustomer) {
            fetchUsers()
        }
    }, [token, isCustomer])

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const res = await API.get('/rentel/rented-list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })


                if (res.data.success === true) {
                    setIncome(res.data.result || [])
                }
            } catch (error) {
                console.error('Rentals:', error)
            }
        }

        if (token && !isCustomer) {
            fetchRentals()
        }
    }, [token, isCustomer])

    useEffect(() => {
        const fetchLateFees = async () => {
            try {
                const endpoint = isCustomer
                    ? '/rentel/my-late-fees'
                    : '/rentel/fetch-late-fees'

                const res = await API.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setLateFees(res.data.result || [])
                }
            } catch (error) {
                console.error('Late Fees:', error)
            }
        }

        if (token) {
            fetchLateFees()
        }
    }, [token, isCustomer])

    useEffect(() => {
        setLoading(false)
    }, [products, categories, users, income, latefee])

    const totalIncome = income.reduce((total, item) => {
        return (
            total +
            Number(
                item.totalAmount ??
                item.total_amount ??
                item.amount ??
                item.rental_amount ??
                item.payment_amount ??
                0
            )
        )
    }, 0)

    const totalLateFees = latefee
        .filter(item => {
            return (
                item.is_pay_overdue !== true &&
                item.isPayOverdue !== true
            )
        })
        .reduce((total, item) => {
            return (
                total +
                Number(
                    item.override_cost ??
                    item.overrideCost ??
                    item.overdue_cost ??
                    item.overdueCost ??
                    item.amount ??
                    item.late_fee ??
                    item.lateFee ??
                    0
                )
            )
        }, 0)

    const staffCount = users.filter(user => {
        return (
            String(
                user.role?.role ||
                user.role ||
                ''
            ).toLowerCase().trim() === 'staff'
        )
    }).length

    const customerCount = users.filter(user => {
        return (
            String(
                user.role?.role ||
                user.role ||
                ''
            ).toLowerCase().trim() === 'customer'
        )
    }).length

    const adminCount = users.filter(user => {
        return (
            String(
                user.role?.role ||
                user.role ||
                ''
            ).toLowerCase().trim() === 'super_admin'
        )
    }).length

    let countData = []

    if (isCustomer) {
        countData = [
            {
                id: 1,
                name: 'Products',
                icon: FaBox,
                count: products.length,
                subtitle: 'Total rental products',
            },
            {
                id: 2,
                name: 'Categories',
                icon: FaLayerGroup,
                count: categories.length,
                subtitle: 'Total product categories',
            },
            {
                id: 4,
                name: 'My Rental Tools',
                icon: FaBox,
                count: rentalTools.length,
                subtitle: 'Your rented tools',
            },
            {
                id: 3,
                name: 'My Late Fees',
                icon: FaClock,
                count: `$${totalLateFees.toFixed(2)}`,
                subtitle: 'Outstanding overdue fees',
            },

        ]
    }

    if (isStaff) {
        countData = [
            {
                id: 1,
                name: 'Products',
                icon: FaBox,
                count: products.length,
                subtitle: 'Total rental products',
            },
            {
                id: 2,
                name: 'Categories',
                icon: FaLayerGroup,
                count: categories.length,
                subtitle: 'Total product categories',
            },
            {
                id: 3,
                name: 'Customers',
                icon: FaUsers,
                count: customerCount,
                subtitle: 'Total customers',
            },
            {
                id: 4,
                name: 'Rentals',
                icon: FaBox,
                count: income.length,
                subtitle: 'Total rental records',
            },
            {
                id: 5,
                name: 'Total Income',
                icon: FaMoneyBillWave,
                count: `$${totalIncome.toFixed(2)}`,
                subtitle: 'Total rental income',
            },
            {
                id: 6,
                name: 'Total Late Fees',
                icon: FaClock,
                count: `$${totalLateFees.toFixed(2)}`,
                subtitle: 'Total unpaid overdue fees',
            },
        ]
    }

    if (!isCustomer && !isStaff) {
        countData = [
            {
                id: 1,
                name: 'Users',
                icon: FaUsers,
                count: users.length,
                subtitle: 'Total registered users',
            },
            {
                id: 2,
                name: 'Staff',
                icon: FaUsers,
                count: staffCount,
                subtitle: 'Total staff members',
            },
            {
                id: 3,
                name: 'Customers',
                icon: FaUsers,
                count: customerCount,
                subtitle: 'Total customers',
            },
            {
                id: 4,
                name: 'Admins',
                icon: FaUsers,
                count: adminCount,
                subtitle: 'Total administrators',
            },
            {
                id: 5,
                name: 'Products',
                icon: FaBox,
                count: products.length,
                subtitle: 'Total rental products',
            },
            {
                id: 6,
                name: 'Categories',
                icon: FaLayerGroup,
                count: categories.length,
                subtitle: 'Total product categories',
            },
            {
                id: 7,
                name: 'Rentals',
                icon: FaBox,
                count: income.length,
                subtitle: 'Total rental records',
            },
            {
                id: 8,
                name: 'Total Income',
                icon: FaMoneyBillWave,
                count: `$${totalIncome.toFixed(2)}`,
                subtitle: 'Total rental income',
            },
            {
                id: 9,
                name: 'Total Late Fees',
                icon: FaClock,
                count: `$${totalLateFees.toFixed(2)}`,
                subtitle: 'Total unpaid overdue fees',
            },
        ]
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4].map(item => (
                    <div
                        key={item}
                        className="h-40 animate-pulse bg-slate-100"
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={`
            grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 
            ${auth.role === 'staff' || auth.role === 'super_admin' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}
        `}>
            {countData.map(item => {
                const Icon = item.icon

                return (
                    <div
                        key={item.id}
                        className="group bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                                    {item.name}
                                </p>

                                <p className="mt-3 truncate text-3xl font-black tracking-tight text-slate-950">
                                    {item.count}
                                </p>

                                <p className="mt-2 text-xs font-medium text-slate-500">
                                    {item.subtitle}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400 text-slate-950 transition-all duration-300 group-hover:bg-slate-950 group-hover:text-yellow-400">
                                <Icon className="text-xl" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2">
                            <div className="h-1.5 flex-1 bg-slate-100">
                                <div className="h-full w-1/3 bg-yellow-400 transition-all duration-500 group-hover:w-full" />
                            </div>

                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                                Overview
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CountData