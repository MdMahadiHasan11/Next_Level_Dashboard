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
  Target,
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
import { useState, useEffect } from "react";
import { ReactElement } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input"; // Added Input component

type MenuState = "full" | "collapsed" | "hidden";

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ComponentType<any>;
  badge?: string;
  isNew?: boolean;
  children?: SubMenuItem[];
}

interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}

const menuData: MenuSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
        badge: "3",
        children: [
          {
            id: "analytics",
            label: "Analytics",
            href: "/dashboard/analytics",
            icon: BarChart2,
          },
          {
            id: "reports",
            label: "Reports",
            href: "/dashboard/reports",
            icon: FileText,
            children: [
              {
                id: "sales-reports",
                label: "Sales Reports",
                href: "/dashboard/reports/sales",
                icon: TrendingUp,
              },
              {
                id: "user-reports",
                label: "User Reports",
                href: "/dashboard/reports/users",
                icon: Users2,
              },
              {
                id: "financial-reports",
                label: "Financial Reports",
                href: "/dashboard/reports/financial",
                icon: DollarSign,
              },
            ],
          },
          {
            id: "real-time",
            label: "Real-time",
            href: "/dashboard/realtime",
            icon: Activity,
            isNew: true,
          },
        ],
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: BarChart2,
        children: [
          {
            id: "overview",
            label: "Overview",
            href: "/analytics/overview",
            icon: PieChart,
          },
          {
            id: "performance",
            label: "Performance",
            href: "/analytics/performance",
            icon: TrendingUp,
          },
          {
            id: "audience",
            label: "Audience",
            href: "/analytics/audience",
            icon: Target,
          },
        ],
      },
      {
        id: "organization",
        label: "Organization",
        href: "/organization",
        icon: Building2,
      },
      {
        id: "projects",
        label: "Projects",
        href: "/projects",
        icon: Folder,
        badge: "12",
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
        children: [
          {
            id: "all-products",
            label: "All Products",
            href: "/products/all",
            icon: Package,
          },
          {
            id: "categories",
            label: "Categories",
            href: "/products/categories",
            icon: Tag,
            children: [
              {
                id: "electronics",
                label: "Electronics",
                href: "/products/categories/electronics",
                icon: Monitor,
              },
              {
                id: "clothing",
                label: "Clothing",
                href: "/products/categories/clothing",
                icon: ShoppingCart,
              },
              {
                id: "books",
                label: "Books",
                href: "/products/categories/books",
                icon: FileText,
              },
            ],
          },
          {
            id: "inventory",
            label: "Inventory",
            href: "/products/inventory",
            icon: Database,
          },
          {
            id: "reviews",
            label: "Reviews",
            href: "/products/reviews",
            icon: Star,
          },
        ],
      },
      {
        id: "orders",
        label: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        badge: "5",
        children: [
          {
            id: "all-orders",
            label: "All Orders",
            href: "/orders/all",
            icon: ShoppingCart,
          },
          {
            id: "pending",
            label: "Pending",
            href: "/orders/pending",
            icon: Clock,
            badge: "3",
          },
          {
            id: "processing",
            label: "Processing",
            href: "/orders/processing",
            icon: Timer,
          },
          {
            id: "shipped",
            label: "Shipped",
            href: "/orders/shipped",
            icon: Truck,
          },
          {
            id: "delivered",
            label: "Delivered",
            href: "/orders/delivered",
            icon: Check,
          },
        ],
      },
      {
        id: "customers",
        label: "Customers",
        href: "/customers",
        icon: Users2,
        children: [
          {
            id: "all-customers",
            label: "All Customers",
            href: "/customers/all",
            icon: Users2,
          },
          {
            id: "segments",
            label: "Segments",
            href: "/customers/segments",
            icon: Filter,
            children: [
              {
                id: "vip",
                label: "VIP Customers",
                href: "/customers/segments/vip",
                icon: Star,
              },
              {
                id: "new",
                label: "New Customers",
                href: "/customers/segments/new",
                icon: UserPlus,
              },
              {
                id: "inactive",
                label: "Inactive",
                href: "/customers/segments/inactive",
                icon: UserX,
              },
            ],
          },
          {
            id: "reviews",
            label: "Customer Reviews",
            href: "/customers/reviews",
            icon: MessageSquare,
          },
        ],
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
        children: [
          {
            id: "all-transactions",
            label: "All Transactions",
            href: "/transactions/all",
            icon: Wallet,
          },
          {
            id: "income",
            label: "Income",
            href: "/transactions/income",
            icon: TrendingUp,
          },
          {
            id: "expenses",
            label: "Expenses",
            href: "/transactions/expenses",
            icon: TrendingDown,
          },
        ],
      },
      {
        id: "invoices",
        label: "Invoices",
        href: "/invoices",
        icon: Receipt,
        badge: "2",
      },
      {
        id: "payments",
        label: "Payments",
        href: "/payments",
        icon: CreditCard,
        children: [
          {
            id: "payment-methods",
            label: "Payment Methods",
            href: "/payments/methods",
            icon: CreditCard,
          },
          {
            id: "payment-history",
            label: "Payment History",
            href: "/payments/history",
            icon: Clock,
          },
          {
            id: "refunds",
            label: "Refunds",
            href: "/payments/refunds",
            icon: Minus,
          },
        ],
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
        children: [
          {
            id: "all-pages",
            label: "All Pages",
            href: "/pages/all",
            icon: FileText,
          },
          {
            id: "blog",
            label: "Blog",
            href: "/pages/blog",
            icon: Edit,
            children: [
              {
                id: "posts",
                label: "Posts",
                href: "/pages/blog/posts",
                icon: FileText,
              },
              {
                id: "categories",
                label: "Categories",
                href: "/pages/blog/categories",
                icon: Tag,
              },
              {
                id: "tags",
                label: "Tags",
                href: "/pages/blog/tags",
                icon: Bookmark,
              },
            ],
          },
          {
            id: "landing-pages",
            label: "Landing Pages",
            href: "/pages/landing",
            icon: Globe,
          },
        ],
      },
      {
        id: "media",
        label: "Media",
        href: "/media",
        icon: ImageIcon,
        children: [
          {
            id: "images",
            label: "Images",
            href: "/media/images",
            icon: ImageIcon,
          },
          {
            id: "videos",
            label: "Videos",
            href: "/media/videos",
            icon: Play,
          },
          {
            id: "audio",
            label: "Audio",
            href: "/media/audio",
            icon: Headphones,
          },
          {
            id: "documents",
            label: "Documents",
            href: "/media/documents",
            icon: FileText,
          },
        ],
      },
      {
        id: "seo",
        label: "SEO",
        href: "/seo",
        icon: Search,
        isNew: true,
        children: [
          {
            id: "keywords",
            label: "Keywords",
            href: "/seo/keywords",
            icon: Search,
          },
          {
            id: "meta-tags",
            label: "Meta Tags",
            href: "/seo/meta-tags",
            icon: Tag,
          },
          {
            id: "sitemap",
            label: "Sitemap",
            href: "/seo/sitemap",
            icon: Map,
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
        children: [
          {
            id: "all-members",
            label: "All Members",
            href: "/members/all",
            icon: Users2,
          },
          {
            id: "roles",
            label: "Roles",
            href: "/members/roles",
            icon: Shield,
            children: [
              {
                id: "admin",
                label: "Administrators",
                href: "/members/roles/admin",
                icon: Shield,
              },
              {
                id: "editor",
                label: "Editors",
                href: "/members/roles/editor",
                icon: Edit,
              },
              {
                id: "viewer",
                label: "Viewers",
                href: "/members/roles/viewer",
                icon: Eye,
              },
            ],
          },
          {
            id: "permissions",
            label: "Permissions",
            href: "/members/permissions",
            icon: Lock,
          },
        ],
      },
      {
        id: "chat",
        label: "Chat",
        href: "/chat",
        icon: MessagesSquare,
        badge: "12",
        children: [
          {
            id: "channels",
            label: "Channels",
            href: "/chat/channels",
            icon: MessagesSquare,
          },
          {
            id: "direct-messages",
            label: "Direct Messages",
            href: "/chat/dm",
            icon: Mail,
          },
          {
            id: "notifications",
            label: "Notifications",
            href: "/chat/notifications",
            icon: Bell,
          },
        ],
      },
      {
        id: "meetings",
        label: "Meetings",
        href: "/meetings",
        icon: Video,
        children: [
          {
            id: "scheduled",
            label: "Scheduled",
            href: "/meetings/scheduled",
            icon: Calendar,
          },
          {
            id: "recordings",
            label: "Recordings",
            href: "/meetings/recordings",
            icon: Camera,
          },
          {
            id: "rooms",
            label: "Meeting Rooms",
            href: "/meetings/rooms",
            icon: Monitor,
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
        children: [
          {
            id: "installed",
            label: "Plugins đã cài",
            href: "/plugins",
            icon: Package,
          },
          {
            id: "add-new",
            label: "Thêm mới",
            href: "/plugins",
            icon: Plus,
          },
        ],
      },
      {
        id: "api",
        label: "API",
        href: "/api",
        icon: Code,
        children: [
          {
            id: "documentation",
            label: "Documentation",
            href: "/api/docs",
            icon: FileText,
          },
          {
            id: "keys",
            label: "API Keys",
            href: "/api/keys",
            icon: Key,
          },
          {
            id: "webhooks",
            label: "Webhooks",
            href: "/api/webhooks",
            icon: Zap,
          },
        ],
      },
      {
        id: "integrations",
        label: "Integrations",
        href: "/integrations",
        icon: Layers,
        children: [
          {
            id: "third-party",
            label: "Third Party",
            href: "/integrations/third-party",
            icon: Globe,
          },
          {
            id: "plugins",
            label: "Plugins",
            href: "/integrations/plugins",
            icon: Plus,
          },
          {
            id: "extensions",
            label: "Extensions",
            href: "/integrations/extensions",
            icon: Zap,
          },
        ],
      },
      {
        id: "backup",
        label: "Backup & Restore",
        href: "/backup",
        icon: Database,
        children: [
          {
            id: "create-backup",
            label: "Create Backup",
            href: "/backup/create",
            icon: Download,
          },
          {
            id: "restore",
            label: "Restore",
            href: "/backup/restore",
            icon: Upload,
          },
          {
            id: "schedule",
            label: "Schedule",
            href: "/backup/schedule",
            icon: Clock,
          },
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>("full");
  const [previousDesktopState, setPreviousDesktopState] =
    useState<MenuState>("full");
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default 16rem = 256px
  const [mobileMenuState, setMobileMenuState] =
    useState<MenuState>("collapsed");

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
      items: filterMenuItems(section.items, searchQuery),
    }))
    .filter((section) => section.items.length > 0);

  const toggleMobileMenuState = () => {
    setMobileMenuState((prev) => {
      switch (prev) {
        case "collapsed":
          return "full";
        case "full":
          return "hidden";
        case "hidden":
          return "collapsed";
        default:
          return "collapsed";
      }
    });
  };

  const toggleMenuState = () => {
    if (isMobile) {
      toggleMobileMenuState();
    } else {
      setMenuState((prev) => {
        switch (prev) {
          case "full":
            return "collapsed";
          case "collapsed":
            return "hidden";
          case "hidden":
            return "full";
          default:
            return "full";
        }
      });
    }
  };

  const setMenuStateFromCustomizer = (state: MenuState) => {
    if (!isMobile) {
      setMenuState(state);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      setIsMobile(!isDesktop);

      if (!isDesktop) {
        if (menuState !== "hidden") {
          setPreviousDesktopState(menuState);
        }
      } else {
        if (menuState === "hidden" && previousDesktopState !== "hidden") {
          setMenuState(previousDesktopState);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [menuState, previousDesktopState]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).toggleMenuState = toggleMenuState;
      (window as any).menuState = isMobile ? mobileMenuState : menuState;
      (window as any).isMobile = isMobile;
      (window as any).setIsMobileMenuOpen = setIsMobileMenuOpen;
      (window as any).isMobileMenuOpen = isMobileMenuOpen;
      (window as any).setMenuStateFromCustomizer = setMenuStateFromCustomizer;
      (window as any).sidebarWidth = sidebarWidth;
      (window as any).mobileMenuState = mobileMenuState;
      (window as any).setMobileMenuState = setMobileMenuState;
    }
  }, [menuState, isMobile, isMobileMenuOpen, sidebarWidth, mobileMenuState]);

  useEffect(() => {
    if (!isMobile) return;

    const checkExternalMobileState = () => {
      if (
        typeof window !== "undefined" &&
        (window as any).externalMobileMenuState
      ) {
        const externalState = (window as any).externalMobileMenuState;
        if (externalState !== mobileMenuState) {
          console.log(
            "[v0] Syncing mobile menu state from external:",
            externalState
          );
          setMobileMenuState(externalState);
          // Clear the external state after syncing
          delete (window as any).externalMobileMenuState;
        }
      }
    };

    const interval = setInterval(checkExternalMobileState, 10);
    return () => clearInterval(interval);
  }, [isMobile, mobileMenuState]);

  function handleNavigation() {
    if (isMobile) {
      setMobileMenuState("collapsed");
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
      setSidebarWidth(newWidth);
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
              <div className="h-4 w-4"> </div>
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
            <item.icon className="h-4 w-4" />
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
          if (hasChildren && !isCollapsed) {
            toggleExpanded(itemId);
          } else if (item.href && !hasChildren) {
            window.location.href = item.href;
            handleNavigation();
          }
        }}
        title={isCollapsed ? item.label : undefined}
      >
        <item.icon className="h-4 w-4 flex-shrink-0 sidebar-menu-icon" />

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
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          } else if (item.href) {
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

  const getSidebarWidth = () => {
    if (isMobile) {
      return "w-64";
    }
    if (menuState === "collapsed") {
      return "w-16";
    }
    return `w-[${sidebarWidth}px]`;
  };

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
                      onClick={toggleMobileMenuState}
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
                  scrollbarWidth: "none" /* Firefox */,
                  msOverflowStyle: "none" /* IE and Edge */,
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
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
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
