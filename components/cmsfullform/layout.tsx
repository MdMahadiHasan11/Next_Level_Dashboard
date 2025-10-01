"use client";

import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeCustomizer } from "../theme-customizer";

interface LayoutProps {
  children: ReactNode;
}

type MenuState = "full" | "collapsed" | "hidden";
type CRUDOperation = "CREATE" | "READ" | "UPDATE" | "DELETE";

type PermissionsObject = {
  [key: string]: CRUDOperation[];
};

const exampleUserPermissions: PermissionsObject = {
  invoice_air_ticket: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_non_commission: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_re_issue: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_other: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_visa: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_tour_package: ["CREATE", "READ", "UPDATE", "DELETE"],
  invoice_umrah: ["CREATE", "READ", "UPDATE", "DELETE"],
  refunds: [], // No access to refunds section
  air_ticket_refund: ["CREATE", "READ", "UPDATE", "DELETE"],
  other_refund: ["CREATE", "READ", "UPDATE", "DELETE"],
  tour_package_refund: ["CREATE", "READ", "UPDATE", "DELETE"],
  cheque_management: ["READ", "UPDATE"], // Only read and update, no create/delete
  loan_management: [],
  loan_authority: ["CREATE", "READ", "UPDATE", "DELETE"],
  loan_information: ["CREATE", "READ", "UPDATE", "DELETE"],
  loan_receive: ["CREATE", "READ", "UPDATE", "DELETE"],
  loan_payment: ["CREATE", "READ", "UPDATE", "DELETE"],
  client_management: [],
  clients: ["CREATE", "READ", "UPDATE", "DELETE"],
  money_receipt: ["CREATE", "READ", "UPDATE", "DELETE"],
  client_advance_return: ["CREATE", "READ", "UPDATE", "DELETE"],
  vendor_management: [],
  vendors: ["CREATE", "READ", "UPDATE", "DELETE"],
  vendor_payment: ["CREATE", "READ", "UPDATE", "DELETE"],
  vendor_advance_return: ["CREATE", "READ", "UPDATE", "DELETE"],
  passport_management: ["CREATE", "READ", "UPDATE", "DELETE"],
  configuration: [],
  app_config: ["CREATE", "READ", "UPDATE"],
  profile_setting: ["READ", "UPDATE"],
  role_permission: ["CREATE", "READ", "UPDATE", "DELETE"],
  users: ["CREATE", "READ", "UPDATE", "DELETE"],
  products: ["CREATE", "READ", "UPDATE", "DELETE"],
  visa_types: ["CREATE", "READ", "UPDATE", "DELETE"],
  room_types: ["CREATE", "READ", "UPDATE", "DELETE"],
  transport_types: ["CREATE", "READ", "UPDATE", "DELETE"],
  departments: ["CREATE", "READ", "UPDATE", "DELETE"],
  employee: ["CREATE", "READ", "UPDATE", "DELETE"],
  tour_group: ["CREATE", "READ", "UPDATE", "DELETE"],
  airports: ["CREATE", "READ", "UPDATE", "DELETE"],
  airlines: ["CREATE", "READ", "UPDATE", "DELETE"],
  database_backup: ["READ"],
  reports: [],
  client_ledger: ["READ"],
  vendor_ledger: ["READ"],
  account_ledger: ["READ"],
  client_due_advance: ["READ"],
  vendor_due_advance: ["READ"],
  sales_report: ["READ"],
  profit_loss: ["READ"],
  login_history: ["READ"],
  audit_trail: ["READ"],
};
export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [userPermissions, setUserPermissions] = useState(
    exampleUserPermissions
  );
  const [mounted, setMounted] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>("full");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [mobileMenuState, setMobileMenuState] =
    useState<MenuState>("collapsed");
  const [previousDesktopState, setPreviousDesktopState] =
    useState<MenuState>("full");

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleMenuState = () => {
    if (isMobile) {
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

  const handleOutsideClick = () => {
    if (isMobile && mobileMenuState === "full") {
      setMobileMenuState("collapsed");
    }
  };

  if (!mounted) {
    return null;
  }

  const getMarginLeft = () => {
    if (isMobile) {
      if (mobileMenuState === "hidden") {
        return "0";
      }
      if (mobileMenuState === "collapsed") {
        return "4rem"; // 64px for collapsed mobile sidebar
      }
      return "0";
    }
    if (menuState === "hidden") {
      return "0";
    }
    if (menuState === "collapsed") {
      return "4rem";
    }
    return `${sidebarWidth}px`;
  };

  return (
    <div className={`flex h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar
        menuState={menuState}
        mobileMenuState={mobileMenuState}
        isMobile={isMobile}
        sidebarWidth={sidebarWidth}
        onToggleMenuState={toggleMenuState}
        onSetMenuState={setMenuState}
        onSidebarWidthChange={setSidebarWidth}
        onMobileMenuStateChange={setMobileMenuState}
        userPermissions={userPermissions}
      />
      {isMobile && mobileMenuState === "full" && (
        <div
          className="fixed bg-black/30 z-[65]"
          onClick={handleOutsideClick}
          style={{
            pointerEvents: "auto",
            left: "16rem",
            top: "0",
            right: "0",
            bottom: "0",
          }}
        />
      )}
      <div
        className="w-full flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0"
        style={{
          marginLeft: getMarginLeft(),
        }}
      >
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
          <TopNav onToggleMenu={toggleMenuState} />
        </header>
        <main className="flex-1 overflow-auto p-3 sm:p-6 bg-white dark:bg-[#0F0F12] min-w-0 relative z-10">
          {children}
        </main>
      </div>

      <ThemeCustomizer />
    </div>
  );
}
