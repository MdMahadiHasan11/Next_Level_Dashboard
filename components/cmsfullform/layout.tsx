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
  dashboard: ["READ"],
  analytics: ["READ"],
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
