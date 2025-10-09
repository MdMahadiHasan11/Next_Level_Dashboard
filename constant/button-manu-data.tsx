import type React from "react";
export type PermissionAction = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  hrefId?: string;
  permission?: {
    module: string;
    action: PermissionAction;
  };
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  children?: MenuItem[];
}

export interface UserPermissions {
  [module: string]: PermissionAction[];
}

import { Eye, Edit, Trash2, Plus } from "lucide-react";

export const MENU_CONFIG: MenuItem[] = [
  {
    id: "invoice-air-ticket-create",
    label: "Create Air Ticket Invoice",
    icon: <Plus className="w-4 h-4" />,
    variant: "default",
    href: "/invoices/air-ticket/create",
    hrefId: "/invoices/air-ticket/create/:path*",
    permission: {
      module: "invoice_air_ticket",
      action: "UPDATE",
    },
  },
  {
    id: "invoice-air-ticket-create",
    label: "Create Air Ticket Invoice",
    // icon: <Plus className="w-4 h-4" />,
    variant: "default",
    href: "/invoices/air-ticket/view",
    // hrefId: "/invoices/air-ticket/:path*",
    permission: {
      module: "invoice_air_ticket",
      action: "READ",
    },
  },
  {
    id: "invoice-air-ticket-view",
    label: "View Air Ticket Invoices",
    icon: <Eye className="w-4 h-4" />,
    href: "/invoices/air-ticket/read",
    permission: {
      module: "invoice_air_ticket",
      action: "READ",
    },
  },
  // {
  //   id: "invoice-air-ticket-edit",
  //   label: "Edit Air Ticket Invoice",
  //   icon: <Edit className="w-4 h-4" />,
  //   permission: {
  //     module: "invoice_air_ticket",
  //     action: "UPDATE",
  //   },
  // },
  // {
  //   id: "invoice-air-ticket-delete",
  //   label: "Delete Air Ticket Invoice",
  //   icon: <Trash2 className="w-4 h-4" />,
  //   permission: {
  //     module: "invoice_air_ticket",
  //     action: "DELETE",
  //   },
  //   variant: "destructive",
  // },
];
