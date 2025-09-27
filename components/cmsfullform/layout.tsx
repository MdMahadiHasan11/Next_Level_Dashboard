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

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuState, setMenuState] = useState<"full" | "collapsed" | "hidden">(
    "full"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [mobileMenuState, setMobileMenuState] = useState<
    "full" | "collapsed" | "hidden"
  >("collapsed");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMenuState = () => {
      if (typeof window !== "undefined") {
        if ((window as any).menuState) {
          setMenuState((window as any).menuState);
        }
        if ((window as any).isMobile !== undefined) {
          setIsMobile((window as any).isMobile);
        }
        if ((window as any).sidebarWidth) {
          setSidebarWidth((window as any).sidebarWidth);
        }
        if ((window as any).mobileMenuState) {
          setMobileMenuState((window as any).mobileMenuState);
        }
      }
    };

    checkMenuState();

    const interval = setInterval(checkMenuState, 50);

    return () => clearInterval(interval);
  }, []);

  const toggleMenuState = () => {
    if (isMobile) {
      if (mobileMenuState === "collapsed") {
        setMobileMenuState("full");
      } else if (mobileMenuState === "full") {
        setMobileMenuState("hidden");
      } else {
        setMobileMenuState("collapsed");
      }
      (window as any).mobileMenuState =
        mobileMenuState === "collapsed"
          ? "full"
          : mobileMenuState === "full"
          ? "hidden"
          : "collapsed";
    } else {
      if (menuState === "collapsed") {
        setMenuState("full");
      } else if (menuState === "full") {
        setMenuState("hidden");
      } else {
        setMenuState("collapsed");
      }
      (window as any).menuState =
        menuState === "collapsed"
          ? "full"
          : menuState === "full"
          ? "hidden"
          : "collapsed";
    }
  };

  const handleOutsideClick = () => {
    console.log(
      "[v0] Backdrop clicked! Current mobile state:",
      mobileMenuState
    );
    if (isMobile && mobileMenuState === "full") {
      console.log("[v0] Setting mobile menu to collapsed");
      setMobileMenuState("collapsed");
      (window as any).externalMobileMenuState = "collapsed";
      (window as any).mobileMenuState = "collapsed";
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
      return "0"; // Full mobile sidebar is overlay, so no margin needed
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
      <Sidebar />
      {isMobile && mobileMenuState === "full" && (
        <div
          className="fixed bg-black/30 z-[65]"
          onClick={handleOutsideClick}
          style={{
            pointerEvents: "auto",
            left: "16rem", // Start after the sidebar
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
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-3 sm:p-6 bg-white dark:bg-[#0F0F12] min-w-0 relative z-10">
          {children}
        </main>
      </div>

      <ThemeCustomizer />
    </div>
  );
}
