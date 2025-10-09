"use client";

import type React from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  CRUDOperation,
  menuData,
  MenuItem,
  SubMenuItem,
} from "@/constant/sidebar-manu-data";
import {
  ChevronDown,
  HelpCircle,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import { hasPermissionSet, mainMenuData } from "@/lib/permission-function";
import { usePermissions } from "@/hooks/use-permission";

type MenuState = "full" | "collapsed" | "hidden";

type PermissionsObject = Record<string, CRUDOperation[]>;

interface SidebarProps {
  menuState: MenuState;
  mobileMenuState: MenuState;
  isMobile: boolean;
  sidebarWidth: number;
  onToggleMenuState: () => void;
  onSetMenuState: (state: MenuState) => void;
  onSidebarWidthChange: (width: number) => void;
  onMobileMenuStateChange: (state: MenuState) => void;
}

export default function Sidebar({
  menuState,
  mobileMenuState,
  isMobile,
  sidebarWidth,
  onToggleMenuState,
  onSetMenuState,
  onSidebarWidthChange,
  onMobileMenuStateChange,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const { permissions } = usePermissions();
  const filteredMenuData = mainMenuData({ searchQuery, permissions });

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
            hasPermissionSet(
              permissions,
              item.permissionKey,
              item.requiredOperation
            ) &&
            hasChildren &&
            !isCollapsed
          ) {
            toggleExpanded(itemId);
          } else if (
            hasPermissionSet(
              permissions,
              item.permissionKey,
              item.requiredOperation
            ) &&
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
            hasPermissionSet(
              permissions,
              item.permissionKey,
              item.requiredOperation
            ) &&
            hasChildren
          ) {
            setIsExpanded(!isExpanded);
          } else if (
            hasPermissionSet(
              permissions,
              item.permissionKey,
              item.requiredOperation
            ) &&
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
                      href="/dashboard-cms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                        MH
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
                    <Link
                      href="/dashboard-cms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <div className="flex justify-center w-full">MH</div>
                    </Link>
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
                href="/dashboard-cms"
                // target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white transition-opacity duration-200">
                  MH.com
                </span>
              </Link>
            ) : (
              <Link
                href="/dashboard-cms"
                // target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <div className="flex justify-center w-full">MH</div>
              </Link>
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
