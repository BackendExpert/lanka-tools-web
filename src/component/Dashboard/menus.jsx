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
    FaTags
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
        section: "Plans",
        items: [
            {
                name: "Plans Management",
                icon: <MdFactCheck />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New  Plan",
                        link: "/dashboard/Plan/create",
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
    {
        section: "Plans",
        items: [
            {
                name: "Plans Management",
                icon: <MdFactCheck />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New  Plan",
                        link: "/dashboard/Plan/create",
                    },
                ],
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
    {
        section: "Plans",
        items: [
            {
                name: "Plans Management",
                icon: <MdFactCheck />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New  Plan",
                        link: "/dashboard/Plan/create",
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
];

export const menus = {
    super_admin: SuperAdmin,
    branch_admin: BranchAdmin,
    staff: Staff,
    customer: Customer
};