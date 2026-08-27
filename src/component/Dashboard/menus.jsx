import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
    BiSolidMegaphone,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaSchool,
    FaBook,
    FaCalendarAlt,
    FaUserCheck,
    FaTasks,
    FaClipboardCheck,
    FaChartLine,
    FaChartBar,
    FaFileAlt,
    FaBullhorn,
    FaEnvelope,
    FaBell,
    FaBuilding,
    FaGraduationCap,
    FaCreditCard,
    FaRobot,
    FaTags,
    FaTools
} from "react-icons/fa";

import {
    MdBusiness,
    MdWorkspacePremium,
    MdSecurity,
    MdSettings,
    MdHistory,
    MdAssessment,
    MdPeople,
    MdAdminPanelSettings,
    MdFolder,
    MdFactCheck,
    MdRateReview
} from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";
import { FaBuildingFlag, FaBoxesStacked } from "react-icons/fa6";



export const SuperAdmin = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Products",
        items: [
            {
                name: "Products Management",
                icon: <FaBoxesStacked />,
                submenu: [
                    {
                        name: "Products",
                        link: "/dashboard/products",
                    },
                    {
                        name: "Create Products",
                        link: "/dashboard/product/create",
                    },
                ],
            },
            {
                name: "Category Management",
                icon: <FaTags />,
                submenu: [
                    {
                        name: "Categories",
                        link: "/dashboard/categories",
                    },
                    {
                        name: "Create Category",
                        link: "/dashboard/category/create",
                    },
                ],
            },
            {
                name: "Rental Management",
                icon: <FaTools />,
                submenu: [
                    {
                        name: "Rent Tools",
                        link: "/dashboard/rent/tools",
                    },
                    {
                        name: "Late fee",
                        link: "/dashboard/rent/late-fees",
                    },
                ],
            },
        ],
    },

    {
        section: "System",
        items: [
            {
                name: "User Management",
                icon: <BiBuildings />,
                submenu: [
                    {
                        name: "Platform users",
                        link: "/dashboard/platfrom-users",
                    },
                    {
                        name: "Create Platform user",
                        link: "/dashboard/user/create",
                    },
                ],
            },
            {
                name: "Branch Management",
                icon: <FaBuildingFlag />,
                submenu: [
                    {
                        name: "Branch",
                        link: "/dashboard/branches",
                    },
                    {
                        name: "Create Branch",
                        link: "/dashboard/branch/create",
                    },
                    {
                        name: "Assign Staff",
                        link: "/dashboard/branch/assign-staff",
                    },
                ],
            },
            {
                name: "Chatbot Management",
                icon: <FaRobot />,
                submenu: [
                    {
                        name: "Chatbot Data",
                        link: "/dashboard/website/chatbot",
                    },
                    {
                        name: "Add New Document",
                        link: "/dashboard/website/create-system-files",
                    },
                ],
            },
        ],
    },

    {
        section: "Security",
        items: [
            {
                name: "Security Management",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Login history",
                        link: "/dashboard/security/login-history",
                    },
                    {
                        name: "Audit Logs",
                        link: "/dashboard/security/audit-logs",
                    },
                ],
            },
        ],
    },
];

export const BranchAdmin = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
];


export const Staff = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Products",
        items: [
            {
                name: "Products Management",
                icon: <FaBoxesStacked />,
                submenu: [
                    {
                        name: "Products",
                        link: "/dashboard/products",
                    },
                    {
                        name: "Create Products",
                        link: "/dashboard/product/create",
                    },
                ],
            },
            {
                name: "Category Management",
                icon: <FaTags />,
                submenu: [
                    {
                        name: "Categories",
                        link: "/dashboard/categories",
                    },
                    {
                        name: "Create Category",
                        link: "/dashboard/category/create",
                    },
                ],
            },
            {
                name: "Rental Management",
                icon: <FaTools />,
                submenu: [
                    {
                        name: "Rent Tools",
                        link: "/dashboard/rent/tools",
                    },
                    {
                        name: "Late fee",
                        link: "/dashboard/rent/late-fees",
                    },
                ],
            },
        ],
    },
    {
        section: "System",
        items: [
            {
                name: "Chatbot Management",
                icon: <FaRobot />,
                submenu: [
                    {
                        name: "Chatbot Data",
                        link: "/dashboard/website/chatbot",
                    },
                    {
                        name: "Add New Document",
                        link: "/dashboard/website/create-system-files",
                    },
                ],
            },
        ],
    },
];



export const Customer = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Products",
        items: [
            {
                name: "Products",
                icon: <FaTools />,
                submenu: [
                    {
                        name: "Rent Tools",
                        link: "/dashboard/rentels",
                    },
                    {
                        name: "Rented Tools",
                        link: "/dashboard/rentel/rented",
                    },
                    {
                        name: "Rented History",
                        link: "/dashboard/rentel/history",
                    },
                    {
                        name: "Late Fees",
                        link: "/dashboard/rentel/my-late-fees",
                    },
                ],
            },
        ],
    },
];

export const menus = {
    super_admin: SuperAdmin,
    branch_admin: BranchAdmin,
    staff: Staff,
    customer: Customer
};