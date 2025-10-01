"use client";

import type React from "react";
import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  FileText,
  Database,
  Globe,
  Mail,
  Calendar,
  ImageIcon,
  Zap,
  Code,
  Layers,
  Monitor,
  PieChart,
  TrendingUp,
  Activity,
  UserPlus,
  UserX,
  Lock,
  Key,
  Eye,
  Bell,
  MessageSquare,
  Camera,
  Headphones,
  Play,
  Bookmark,
  Tag,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Plus,
  Minus,
  Check,
  Star,
  Map,
  Truck,
  Clock,
  Timer,
  DollarSign,
  TrendingDown,
  Puzzle,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type MenuState = "full" | "collapsed" | "hidden";

type CRUDOperation = "CREATE" | "READ" | "UPDATE" | "DELETE";
type PermissionsObject = Record<string, CRUDOperation[]>;

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
  permissionKey?: string; // Added permission key to match API structure
  requiredOperation?: CRUDOperation; // Added required operation (defaults to READ)
}

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
  permissionKey?: string; // Added permission key
  requiredOperation?: CRUDOperation; // Added required operation
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

interface SidebarProps {
  menuState: MenuState;
  mobileMenuState: MenuState;
  isMobile: boolean;
  sidebarWidth: number;
  onToggleMenuState: () => void;
  onSetMenuState: (state: MenuState) => void;
  onSidebarWidthChange: (width: number) => void;
  onMobileMenuStateChange: (state: MenuState) => void;
  userPermissions?: PermissionsObject; // Updated to use new permissions structure
}

const menuData: MenuSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard-cms",
        icon: Home,
        // badge: "3",
        permissionKey: "dashboard",
        children: [
          {
            id: "analytics",
            label: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart2,
            permissionKey: "analytics",
          },
          {
            id: "reports",
            label: "Reports",
            href: "/dashboard/reports",
            icon: FileText,
            permissionKey: "reports",
            children: [
              {
                id: "sales-reports",
                label: "Sales Reports",
                href: "/dashboard/reports/sales",
                icon: TrendingUp,
                permissionKey: "sales_report",
              },
              {
                id: "user-reports",
                label: "User Reports",
                href: "/dashboard/reports/users",
                icon: Users2,
                permissionKey: "reports",
              },
              {
                id: "financial-reports",
                label: "Financial Reports",
                href: "/dashboard/reports/financial",
                icon: DollarSign,
                permissionKey: "profit_loss",
              },
            ],
          },
          {
            id: "real-time",
            label: "Real-time",
            href: "/dashboard/realtime",
            icon: Activity,
            isNew: true,
            permissionKey: "dashboardRealtime",
          },
        ],
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        permissionKey: "analytics",
      },
      {
        id: "organization",
        label: "Organization",
        href: "/organization",
        icon: Building2,
        permissionKey: "organization",
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: Folder,
        badge: "12",
        permissionKey: "projects",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    items: [
      {
        id: "products",
        label: "Products",
        href: "/products",
        icon: Package,
        permissionKey: "products",
        children: [
          {
            id: "all-products",
            label: "All Products",
            href: "/products/all",
            icon: Package,
            permissionKey: "product",
          },
          {
            id: "categories",
            label: "Categories",
            href: "/products/categories",
            icon: Tag,
            permissionKey: "products",
            children: [
              {
                id: "electronics",
                label: "Electronics",
                href: "/products/categories/electronics",
                icon: Monitor,
                permissionKey: "products",
              },
              {
                id: "clothing",
                label: "Clothing",
                href: "/products/categories/clothing",
                icon: ShoppingCart,
                permissionKey: "products",
              },
              {
                id: "books",
                label: "Books",
                href: "/products/categories/books",
                icon: FileText,
                permissionKey: "products",
              },
            ],
          },
          {
            id: "inventory",
            label: "Inventory",
            href: "/products/inventory",
            icon: Database,
            permissionKey: "products",
            requiredOperation: "UPDATE",
          },
          {
            id: "reviews",
            label: "Reviews",
            href: "/products/reviews",
            icon: Star,
            permissionKey: "products",
          },
        ],
      },
      {
        id: "orders",
        label: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        badge: "5",
        permissionKey: "orders",
        children: [
          {
            id: "all-orders",
            label: "All Orders",
            href: "/orders/all",
            icon: ShoppingCart,
            permissionKey: "orders",
          },
          {
            id: "pending",
            label: "Pending",
            href: "/orders/pending",
            icon: Clock,
            badge: "3",
            permissionKey: "orders",
          },
          {
            id: "processing",
            label: "Processing",
            href: "/orders/processing",
            icon: Timer,
            permissionKey: "orders",
            requiredOperation: "UPDATE",
          },
          {
            id: "shipped",
            label: "Shipped",
            href: "/orders/shipped",
            icon: Truck,
            permissionKey: "orders",
          },
          {
            id: "delivered",
            label: "Delivered",
            href: "/orders/delivered",
            icon: Check,
            permissionKey: "orders",
          },
        ],
      },
      {
        id: "customers",
        label: "Customers",
        href: "/customers",
        icon: Users2,
        permissionKey: "customers",
        children: [
          {
            id: "all-customers",
            label: "All Customers",
            href: "/customers/all",
            icon: Users2,
            permissionKey: "customers",
          },
          {
            id: "segments",
            label: "Segments",
            href: "/customers/segments",
            icon: Filter,
            permissionKey: "customers",
            children: [
              {
                id: "vip",
                label: "VIP Customers",
                href: "/customers/segments/vip",
                icon: Star,
                permissionKey: "customers",
              },
              {
                id: "new",
                label: "New Customers",
                href: "/customers/segments/new",
                icon: UserPlus,
                permissionKey: "customers",
              },
              {
                id: "inactive",
                label: "Inactive",
                href: "/customers/segments/inactive",
                icon: UserX,
                permissionKey: "customers",
              },
            ],
          },
          {
            id: "reviews",
            label: "Customer Reviews",
            href: "/customers/reviews",
            icon: MessageSquare,
            permissionKey: "customers",
          },
        ],
      },
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    items: [
      {
        id: "invoice-air-ticket",
        label: "Air Ticket Invoice",
        href: "/invoices/air-ticket",
        icon: Receipt,
        permissionKey: "invoice_air_ticket",
      },
      {
        id: "invoice-non-commission",
        label: "Non Commission Invoice",
        href: "/invoices/non-commission",
        icon: Receipt,
        permissionKey: "invoice_non_commission",
      },
      {
        id: "invoice-reissue",
        label: "Re-issue Invoice",
        href: "/invoices/reissue",
        icon: Receipt,
        permissionKey: "invoice_re_issue",
      },
      {
        id: "invoice-other",
        label: "Other Invoice",
        href: "/invoices/other",
        icon: Receipt,
        permissionKey: "invoice_other",
      },
      {
        id: "invoice-visa",
        label: "Visa Invoice",
        href: "/invoices/visa",
        icon: Receipt,
        permissionKey: "invoice_visa",
      },
      {
        id: "invoice-tour",
        label: "Tour Package Invoice",
        href: "/invoices/tour-package",
        icon: Receipt,
        permissionKey: "invoice_tour_package",
      },
      {
        id: "invoice-umrah",
        label: "Umrah Invoice",
        href: "/invoices/umrah",
        icon: Receipt,
        permissionKey: "invoice_umrah",
      },
    ],
  },
  {
    id: "refunds",
    label: "Refunds",
    items: [
      {
        id: "air-ticket-refund",
        label: "Air Ticket Refund",
        href: "/refunds/air-ticket",
        icon: TrendingDown,
        permissionKey: "air_ticket_refund",
      },
      {
        id: "other-refund",
        label: "Other Refund",
        href: "/refunds/other",
        icon: TrendingDown,
        permissionKey: "other_refund",
      },
      {
        id: "tour-package-refund",
        label: "Tour Package Refund",
        href: "/refunds/tour-package",
        icon: TrendingDown,
        permissionKey: "tour_package_refund",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    items: [
      {
        id: "transactions",
        label: "Transactions",
        href: "/transactions",
        icon: Wallet,
        permissionKey: "transactions",
        children: [
          {
            id: "all-transactions",
            label: "All Transactions",
            href: "/transactions/all",
            icon: Wallet,
            permissionKey: "transactions",
          },
          {
            id: "income",
            label: "Income",
            href: "/transactions/income",
            icon: TrendingUp,
            permissionKey: "transactions",
          },
          {
            id: "expenses",
            label: "Expenses",
            href: "/transactions/expenses",
            icon: TrendingDown,
            permissionKey: "transactions",
          },
        ],
      },
      {
        id: "invoices",
        label: "Invoices",
        href: "/invoices",
        icon: Receipt,
        badge: "2",
        permissionKey: "invoices",
      },
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
        permissionKey: "payments",
        children: [
          {
            id: "payment-methods",
            label: "Payment Methods",
            href: "/payments/methods",
            icon: CreditCard,
            permissionKey: "payments",
          },
          {
            id: "payment-history",
            label: "Payment History",
            href: "/payments/history",
            icon: Clock,
            permissionKey: "payments",
          },
          {
            id: "refunds",
            label: "Refunds",
            href: "/payments/refunds",
            icon: Minus,
            permissionKey: "payments",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "cheque-management",
        label: "Cheque Management",
        href: "/finance/cheque",
        icon: CreditCard,
        permissionKey: "cheque_management",
      },
      {
        id: "loan-management",
        label: "Loan Management",
        icon: Wallet,
        permissionKey: "loan_management",
        children: [
          {
            id: "loan-authority",
            label: "Loan Authority",
            href: "/finance/loan/authority",
            icon: Shield,
            permissionKey: "loan_authority",
          },
          {
            id: "loan-information",
            label: "Loan Information",
            href: "/finance/loan/information",
            icon: FileText,
            permissionKey: "loan_information",
          },
          {
            id: "loan-receive",
            label: "Loan Receive",
            href: "/finance/loan/receive",
            icon: Download,
            permissionKey: "loan_receive",
          },
          {
            id: "loan-payment",
            label: "Loan Payment",
            href: "/finance/loan/payment",
            icon: Upload,
            permissionKey: "loan_payment",
          },
        ],
      },
    ],
  },
  {
    id: "client-management",
    label: "Client Management",
    items: [
      {
        id: "clients",
        label: "Clients",
        href: "/clients",
        icon: Users2,
        permissionKey: "clients",
      },
      {
        id: "money-receipt",
        label: "Money Receipt",
        href: "/clients/money-receipt",
        icon: Receipt,
        permissionKey: "money_receipt",
      },
      {
        id: "client-advance-return",
        label: "Client Advance Return",
        href: "/clients/advance-return",
        icon: TrendingDown,
        permissionKey: "client_advance_return",
      },
    ],
  },
  {
    id: "vendor-management",
    label: "Vendor Management",
    items: [
      {
        id: "vendors",
        label: "Vendors",
        href: "/vendors",
        icon: Building2,
        permissionKey: "vendors",
      },
      {
        id: "vendor-payment",
        label: "Vendor Payment",
        href: "/vendors/payment",
        icon: CreditCard,
        permissionKey: "vendor_payment",
      },
      {
        id: "vendor-advance-return",
        label: "Vendor Advance Return",
        href: "/vendors/advance-return",
        icon: TrendingDown,
        permissionKey: "vendor_advance_return",
      },
    ],
  },
  {
    id: "passport",
    label: "Passport",
    items: [
      {
        id: "passport-management",
        label: "Passport Management",
        href: "/passport",
        icon: FileText,
        permissionKey: "passport_management",
      },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    items: [
      {
        id: "pages",
        label: "Pages",
        href: "/pages",
        icon: FileText,
        permissionKey: "pages",
        children: [
          {
            id: "all-pages",
            label: "All Pages",
            href: "/pages/all",
            icon: FileText,
            permissionKey: "pages",
          },
          {
            id: "blog",
            label: "Blog",
            href: "/pages/blog",
            icon: Edit,
            permissionKey: "pages",
            children: [
              {
                id: "posts",
                label: "Posts",
                href: "/pages/blog/posts",
                icon: FileText,
                permissionKey: "pages",
              },
              {
                id: "categories",
                label: "Categories",
                href: "/pages/blog/categories",
                icon: Tag,
                permissionKey: "pages",
                requiredOperation: "UPDATE",
              },
              {
                id: "tags",
                label: "Tags",
                href: "/pages/blog/tags",
                icon: Bookmark,
                permissionKey: "pages",
                requiredOperation: "UPDATE",
              },
            ],
          },
          {
            id: "landing-pages",
            label: "Landing Pages",
            href: "/pages/landing",
            icon: Globe,
            permissionKey: "pages",
          },
        ],
      },
      {
        id: "media",
        label: "Media",
        href: "/media",
        icon: ImageIcon,
        permissionKey: "media",
        children: [
          {
            id: "images",
            label: "Images",
            href: "/media/images",
            icon: ImageIcon,
            permissionKey: "media",
          },
          {
            id: "videos",
            label: "Videos",
            href: "/media/videos",
            icon: Play,
            permissionKey: "media",
          },
          {
            id: "audio",
            label: "Audio",
            href: "/media/audio",
            icon: Headphones,
            permissionKey: "media",
          },
          {
            id: "documents",
            label: "Documents",
            href: "/media/documents",
            icon: FileText,
            permissionKey: "media",
          },
        ],
      },
      {
        id: "seo",
        label: "SEO",
        href: "/seo",
        icon: Search,
        isNew: true,
        permissionKey: "seo",
        children: [
          {
            id: "keywords",
            label: "Keywords",
            href: "/seo/keywords",
            icon: Search,
            permissionKey: "seo",
          },
          {
            id: "meta-tags",
            label: "Meta Tags",
            href: "/seo/meta-tags",
            icon: Tag,
            permissionKey: "seo",
          },
          {
            id: "sitemap",
            label: "Sitemap",
            href: "/seo/sitemap",
            icon: Map,
            permissionKey: "seo",
          },
        ],
      },
    ],
  },
  {
    id: "team",
    label: "Team & Communication",
    items: [
      {
        id: "members",
        label: "Members",
        href: "/members",
        icon: Users2,
        permissionKey: "members",
        children: [
          {
            id: "all-members",
            label: "All Members",
            href: "/members/all",
            icon: Users2,
            permissionKey: "members",
          },
          {
            id: "roles",
            label: "Roles",
            href: "/members/roles",
            icon: Shield,
            permissionKey: "members",
            requiredOperation: "UPDATE",
            children: [
              {
                id: "admin",
                label: "Administrators",
                href: "/members/roles/admin",
                icon: Shield,
                permissionKey: "members",
              },
              {
                id: "editor",
                label: "Editors",
                href: "/members/roles/editor",
                icon: Edit,
                permissionKey: "members",
              },
              {
                id: "viewer",
                label: "Viewers",
                href: "/members/roles/viewer",
                icon: Eye,
                permissionKey: "members",
              },
            ],
          },
          {
            id: "permissions",
            label: "Permissions",
            href: "/members/permissions",
            icon: Lock,
            permissionKey: "members",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "chat",
        label: "Chat",
        href: "/chat",
        icon: MessagesSquare,
        badge: "12",
        permissionKey: "chat",
        children: [
          {
            id: "channels",
            label: "Channels",
            href: "/chat/channels",
            icon: MessagesSquare,
            permissionKey: "chat",
          },
          {
            id: "direct-messages",
            label: "Direct Messages",
            href: "/chat/dm",
            icon: Mail,
            permissionKey: "chat",
          },
          {
            id: "notifications",
            label: "Notifications",
            href: "/chat/notifications",
            icon: Bell,
            permissionKey: "chat",
          },
        ],
      },
      {
        id: "meetings",
        label: "Meetings",
        href: "/meetings",
        icon: Video,
        permissionKey: "meetings",
        children: [
          {
            id: "scheduled",
            label: "Scheduled",
            href: "/meetings/scheduled",
            icon: Calendar,
            permissionKey: "meetings",
          },
          {
            id: "recordings",
            label: "Recordings",
            href: "/meetings/recordings",
            icon: Camera,
            permissionKey: "meetings",
          },
          {
            id: "rooms",
            label: "Meeting Rooms",
            href: "/meetings/rooms",
            icon: Monitor,
            permissionKey: "meetings",
          },
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & Utilities",
    items: [
      {
        id: "plugins",
        label: "Plugins",
        href: "/plugins",
        icon: Puzzle,
        badge: "8",
        permissionKey: "plugins",
        children: [
          {
            id: "installed",
            label: "Plugins đã cài",
            href: "/plugins",
            icon: Package,
            permissionKey: "plugins",
          },
          {
            id: "add-new",
            label: "Thêm mới",
            href: "/plugins",
            icon: Plus,
            permissionKey: "plugins",
            requiredOperation: "CREATE",
          },
        ],
      },
      {
        id: "api",
        label: "API",
        href: "/api",
        icon: Code,
        permissionKey: "api",
        children: [
          {
            id: "documentation",
            label: "Documentation",
            href: "/api/docs",
            icon: FileText,
            permissionKey: "api",
          },
          {
            id: "keys",
            label: "API Keys",
            href: "/api/keys",
            icon: Key,
            permissionKey: "api",
            requiredOperation: "UPDATE",
          },
          {
            id: "webhooks",
            label: "Webhooks",
            href: "/api/webhooks",
            icon: Zap,
            permissionKey: "api",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "integrations",
        label: "Integrations",
        href: "/integrations",
        icon: Layers,
        permissionKey: "integrations",
        children: [
          {
            id: "third-party",
            label: "Third Party",
            href: "/integrations/third-party",
            icon: Globe,
            permissionKey: "integrations",
          },
          {
            id: "plugins",
            label: "Plugins",
            href: "/integrations/plugins",
            icon: Plus,
            permissionKey: "integrations",
            requiredOperation: "UPDATE",
          },
          {
            id: "extensions",
            label: "Extensions",
            href: "/integrations/extensions",
            icon: Zap,
            permissionKey: "integrations",
            requiredOperation: "UPDATE",
          },
        ],
      },
      {
        id: "backup",
        label: "Backup & Restore",
        href: "/backup",
        icon: Database,
        permissionKey: "backup",
        children: [
          {
            id: "create-backup",
            label: "Create Backup",
            href: "/backup/create",
            icon: Download,
            permissionKey: "backup",
            requiredOperation: "CREATE",
          },
          {
            id: "restore",
            label: "Restore",
            href: "/backup/restore",
            icon: Upload,
            permissionKey: "backup",
            requiredOperation: "UPDATE",
          },
          {
            id: "schedule",
            label: "Schedule",
            href: "/backup/schedule",
            icon: Clock,
            permissionKey: "backup",
            requiredOperation: "UPDATE",
          },
        ],
      },
    ],
  },
  {
    id: "configuration",
    label: "Configuration",
    items: [
      {
        id: "app-config",
        label: "App Config",
        href: "/config/app",
        icon: Settings,
        permissionKey: "app_config",
      },
      {
        id: "profile-setting",
        label: "Profile Setting",
        href: "/config/profile",
        icon: Users2,
        permissionKey: "profile_setting",
      },
      {
        id: "role-permission",
        label: "Role & Permission",
        href: "/config/roles",
        icon: Shield,
        permissionKey: "role_permission",
      },
      {
        id: "users",
        label: "Users",
        href: "/config/users",
        icon: Users2,
        permissionKey: "users",
      },
      {
        id: "products",
        label: "Products",
        href: "/config/products",
        icon: Package,
        permissionKey: "products",
      },
      {
        id: "visa-types",
        label: "Visa Types",
        href: "/config/visa-types",
        icon: FileText,
        permissionKey: "visa_types",
      },
      {
        id: "room-types",
        label: "Room Types",
        href: "/config/room-types",
        icon: Building2,
        permissionKey: "room_types",
      },
      {
        id: "transport-types",
        label: "Transport Types",
        href: "/config/transport-types",
        icon: Truck,
        permissionKey: "transport_types",
      },
      {
        id: "departments",
        label: "Departments",
        href: "/config/departments",
        icon: Building2,
        permissionKey: "departments",
      },
      {
        id: "employee",
        label: "Employee",
        href: "/config/employee",
        icon: Users2,
        permissionKey: "employee",
      },
      {
        id: "tour-group",
        label: "Tour Group",
        href: "/config/tour-group",
        icon: Users2,
        permissionKey: "tour_group",
      },
      {
        id: "airports",
        label: "Airports",
        href: "/config/airports",
        icon: Globe,
        permissionKey: "airports",
      },
      {
        id: "airlines",
        label: "Airlines",
        href: "/config/airlines",
        icon: Globe,
        permissionKey: "airlines",
      },
      {
        id: "database-backup",
        label: "Database Backup",
        href: "/config/backup",
        icon: Database,
        permissionKey: "database_backup",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    items: [
      {
        id: "client-ledger",
        label: "Client Ledger",
        href: "/reports/client-ledger",
        icon: FileText,
        permissionKey: "client_ledger",
      },
      {
        id: "vendor-ledger",
        label: "Vendor Ledger",
        href: "/reports/vendor-ledger",
        icon: FileText,
        permissionKey: "vendor_ledger",
      },
      {
        id: "account-ledger",
        label: "Account Ledger",
        href: "/reports/account-ledger",
        icon: FileText,
        permissionKey: "account_ledger",
      },
      {
        id: "client-due-advance",
        label: "Client Due/Advance",
        href: "/reports/client-due-advance",
        icon: DollarSign,
        permissionKey: "client_due_advance",
      },
      {
        id: "vendor-due-advance",
        label: "Vendor Due/Advance",
        href: "/reports/vendor-due-advance",
        icon: DollarSign,
        permissionKey: "vendor_due_advance",
      },
      {
        id: "sales-report",
        label: "Sales Report",
        href: "/reports/sales",
        icon: TrendingUp,
        permissionKey: "sales_report",
      },
      {
        id: "profit-loss",
        label: "Profit & Loss",
        href: "/reports/profit-loss",
        icon: PieChart,
        permissionKey: "profit_loss",
      },
      {
        id: "login-history",
        label: "Login History",
        href: "/reports/login-history",
        icon: Clock,
        permissionKey: "login_history",
      },
      {
        id: "audit-trail",
        label: "Audit Trail",
        href: "/reports/audit-trail",
        icon: Eye,
        permissionKey: "audit_trail",
      },
    ],
  },
];

export default function Sidebar({
  menuState,
  mobileMenuState,
  isMobile,
  sidebarWidth,
  onToggleMenuState,
  onSetMenuState,
  onSidebarWidthChange,
  onMobileMenuStateChange,
  userPermissions = {}, // Default to empty object
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const hasPermission = (
    permissionKey?: string,
    requiredOperation: CRUDOperation = "READ"
  ): boolean => {
    // If no permission key is specified, allow access
    if (!permissionKey) return true;

    // Check if the permission key exists in user permissions
    const operations = userPermissions[permissionKey];

    // If the key doesn't exist or has no operations, deny access
    if (!operations || operations.length === 0) return false;

    // Check if the required operation is in the allowed operations
    return operations.includes(requiredOperation);
  };

  const filterByPermissions = (items: MenuItem[]): MenuItem[] => {
    return items
      .filter((item) =>
        hasPermission(item.permissionKey, item.requiredOperation)
      )
      .map((item) => {
        if (item.children) {
          const filteredChildren = filterSubMenuByPermissions(item.children);
          return {
            ...item,
            children:
              filteredChildren.length > 0 ? filteredChildren : undefined,
          };
        }
        return item;
      });
  };

  const filterSubMenuByPermissions = (items: SubMenuItem[]): SubMenuItem[] => {
    return items
      .filter((item) =>
        hasPermission(item.permissionKey, item.requiredOperation)
      )
      .map((item) => {
        if (item.children) {
          const filteredChildren = filterSubMenuByPermissions(item.children);
          return {
            ...item,
            children:
              filteredChildren.length > 0 ? filteredChildren : undefined,
          };
        }
        return item;
      });
  };

  const filterMenuItems = (items: MenuItem[], query: string): MenuItem[] => {
    if (!query.trim()) return items;

    const searchLower = query.toLowerCase();

    const filterRecursive = (
      item: MenuItem | SubMenuItem
    ): MenuItem | SubMenuItem | null => {
      const matchesLabel = item.label.toLowerCase().includes(searchLower);

      if (item.children) {
        const filteredChildren = item.children
          .map((child) => filterRecursive(child))
          .filter(Boolean) as SubMenuItem[];

        if (matchesLabel || filteredChildren.length > 0) {
          return {
            ...item,
            children:
              filteredChildren.length > 0 ? filteredChildren : item.children,
          };
        }
      } else if (matchesLabel) {
        return item;
      }

      return null;
    };

    return items
      .map((item) => filterRecursive(item))
      .filter(Boolean) as MenuItem[];
  };

  const filteredMenuData = menuData
    .map((section) => ({
      ...section,
      items: filterMenuItems(filterByPermissions(section.items), searchQuery),
    }))
    .filter((section) => section.items.length > 0);

  function handleNavigation() {
    if (isMobile) {
      onMobileMenuStateChange("collapsed");
    }
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(
        200,
        Math.min(400, startWidth + (e.clientX - startX))
      );
      onSidebarWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  function NavItem({
    item,
    level = 0,
    parentId = "",
  }: {
    item: MenuItem | SubMenuItem;
    level?: number;
    parentId?: string;
  }) {
    const itemId = `${parentId}-${item.id}`;
    const isExpanded = expandedItems.has(itemId);
    const hasChildren = item.children && item.children.length > 0;
    const showText = isMobile
      ? mobileMenuState === "full"
      : menuState === "full";
    const showExpandIcon = hasChildren && showText;

    const paddingLeft =
      level === 0 ? "px-3" : level === 1 ? "pl-8 pr-3" : "pl-12 pr-3";

    const [popoverOpen, setPopoverOpen] = useState(false);
    const isCollapsed = isMobile
      ? mobileMenuState === "collapsed"
      : menuState === "collapsed";

    const renderPopoverContent = () => {
      if (!hasChildren) {
        return (
          <div className="p-2">
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  New
                </span>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="p-2">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                {item.badge}
              </span>
            )}
            {item.isNew && (
              <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="space-y-1">
            {item.children!.map((child) => (
              <PopoverNavItem
                key={child.id}
                item={child}
                level={1}
                onNavigate={() => setPopoverOpen(false)}
              />
            ))}
          </div>
        </div>
      );
    };

    const content = (
      <div
        className={cn(
          "flex items-center py-2 text-sm rounded-md transition-colors sidebar-menu-item hover:bg-gray-50 dark:hover:bg-[#1F1F23] relative group cursor-pointer",
          paddingLeft
        )}
        onClick={() => {
          if (
            hasPermission(item.permissionKey, item.requiredOperation) &&
            hasChildren &&
            !isCollapsed
          ) {
            toggleExpanded(itemId);
          } else if (
            hasPermission(item.permissionKey, item.requiredOperation) &&
            item.href &&
            !hasChildren
          ) {
            window.location.href = item.href;
            handleNavigation();
          }
        }}
        title={isCollapsed ? item.label : undefined}
      >
        {item.icon && (
          <item.icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon" />
        )}

        {showText && (
          <>
            <span className="ml-3 flex-1 transition-opacity duration-200 sidebar-menu-text">
              {item.label}
            </span>

            <div className="flex items-center space-x-1">
              {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                  New
                </span>
              )}
              {item.badge && (
                <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                  {item.badge}
                </span>
              )}
              {showExpandIcon && (
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isExpanded ? "rotate-180" : "rotate-0"
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
    );

    if (isCollapsed) {
      return (
        <div>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <div
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
              >
                {item.href && !hasChildren ? (
                  <Link href={item.href}>{content}</Link>
                ) : (
                  content
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              sideOffset={8}
              className="w-auto min-w-[200px] max-w-[300px]"
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(false)}
            >
              {renderPopoverContent()}
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    return (
      <div>
        {item.href && !hasChildren ? (
          <Link href={item.href}>{content}</Link>
        ) : (
          content
        )}
        {hasChildren && isExpanded && showText && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                level={level + 1}
                parentId={itemId}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  function PopoverNavItem({
    item,
    level = 0,
    onNavigate,
  }: {
    item: SubMenuItem;
    level?: number;
    onNavigate: () => void;
  }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft =
      level === 0 ? "px-2" : level === 1 ? "pl-6 pr-2" : "pl-10 pr-2";

    const content = (
      <div
        className={cn(
          "flex items-center py-1.5 text-sm rounded-md transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
          paddingLeft,
          "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        )}
        onClick={() => {
          if (
            hasPermission(item.permissionKey, item.requiredOperation) &&
            hasChildren
          ) {
            setIsExpanded(!isExpanded);
          } else if (
            hasPermission(item.permissionKey, item.requiredOperation) &&
            item.href
          ) {
            window.location.href = item.href;
            onNavigate();
          }
        }}
      >
        {item.icon && <item.icon className="h-3 w-3 flex-shrink-0 mr-2" />}
        <span className="flex-1">{item.label}</span>

        <div className="flex items-center space-x-1">
          {item.isNew && (
            <span className="px-1 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">
              New
            </span>
          )}
          {item.badge && (
            <span className="px-1 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            />
          )}
        </div>
      </div>
    );

    return (
      <div>
        {item.href && !hasChildren ? (
          <Link
            href={item.href}
            onClick={() => {
              onNavigate();
            }}
          >
            {content}
          </Link>
        ) : (
          content
        )}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <PopoverNavItem
                key={child.id}
                item={child}
                level={level + 1}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const showText = menuState === "full";

  if (isMobile) {
    return (
      <>
        <nav
          className={`
            fixed inset-y-0 left-0 z-[70] bg-white dark:bg-[#0F0F12]
            border-r border-gray-200 dark:border-[#1F1F23]
            transform transition-all duration-300 ease-in-out
            ${
              mobileMenuState === "hidden"
                ? "-translate-x-full w-0"
                : mobileMenuState === "collapsed"
                ? "translate-x-0 w-16"
                : "translate-x-0 w-64"
            }
          `}
        >
          {mobileMenuState !== "hidden" && (
            <div className="h-full flex flex-col">
              <div className="h-16 px-3 flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23]">
                {mobileMenuState === "full" ? (
                  <>
                    <Link
                      href="https://cmsfullform.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <img
                        src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                        alt="CMSFullForm"
                        width={32}
                        height={32}
                        className="flex-shrink-0"
                      />
                      <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                        CMSFullForm
                      </span>
                    </Link>
                    <button
                      onClick={onToggleMenuState}
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      title="Hide sidebar"
                    >
                      <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </>
                ) : (
                  <div className="flex justify-center w-full">
                    <img
                      src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                      alt="CMSFullForm"
                      width={32}
                      height={32}
                      className="flex-shrink-0"
                    />
                  </div>
                )}
              </div>

              {mobileMenuState === "full" && (
                <div className="px-3 py-3 border-b border-gray-200 dark:border-[#1F1F23]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search menu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-8 h-9 text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div
                className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="space-y-6">
                  {filteredMenuData.map((section) => (
                    <div key={section.id}>
                      {mobileMenuState === "full" && (
                        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label">
                          {section.label}
                        </div>
                      )}
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <NavItem
                            key={item.id}
                            item={item}
                            parentId={section.id}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
                <div className="space-y-1">
                  <NavItem
                    item={{
                      id: "settings",
                      label: "Settings",
                      href: "/settings",
                      icon: Settings,
                    }}
                  />
                  <NavItem
                    item={{
                      id: "help",
                      label: "Help",
                      href: "/help",
                      icon: HelpCircle,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  }

  return (
    <nav
      className={`
        fixed inset-y-0 left-0 z-[60] bg-white dark:bg-[#0F0F12]
        border-r border-gray-200 dark:border-[#1F1F23] transition-all duration-300 ease-in-out
        ${
          menuState === "hidden"
            ? "w-0 border-r-0"
            : menuState === "collapsed"
            ? "w-16"
            : ""
        }
      `}
      style={{
        overflow: menuState === "hidden" ? "hidden" : "visible",
        width:
          menuState === "hidden"
            ? 0
            : menuState === "collapsed"
            ? "4rem"
            : `${sidebarWidth}px`,
      }}
    >
      {menuState !== "hidden" && (
        <div className="h-full flex flex-col relative">
          <div className="h-16 px-3 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            {showText ? (
              <Link
                href="https://cmsfullform.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 hidden dark:block"
                />
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 block dark:hidden"
                />
                <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white transition-opacity duration-200">
                  CMSFullForm
                </span>
              </Link>
            ) : (
              <div className="flex justify-center w-full">
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 hidden dark:block"
                />
                <img
                  src="https://cmsfullform.com/themes/cmsfullform/Backend/Assets/favicon/apple-icon-60x60.png"
                  alt="CMSFullForm"
                  width={32}
                  height={32}
                  className="flex-shrink-0 block dark:hidden"
                />
              </div>
            )}
          </div>

          {showText && (
            <div className="px-3 py-3 border-b border-gray-200 dark:border-[#1F1F23]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-8 h-9 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="space-y-6">
              {filteredMenuData.map((section) => (
                <div key={section.id}>
                  {showText && (
                    <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider sidebar-section-label transition-opacity duration-200">
                      {section.label}
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavItem
                        key={item.id}
                        item={item}
                        parentId={section.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem
                item={{
                  id: "settings",
                  label: "Settings",
                  href: "/settings",
                  icon: Settings,
                }}
              />
              <NavItem
                item={{
                  id: "help",
                  label: "Help",
                  href: "/help",
                  icon: HelpCircle,
                }}
              />
            </div>
          </div>

          {menuState === "full" && (
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500/20 transition-colors group"
              onMouseDown={handleMouseDown}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gray-300 dark:bg-gray-600 rounded-l opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
