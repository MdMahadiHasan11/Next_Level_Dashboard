"use client";

import { UserPermissions } from "@/constant/button-manu-data";
import { useState, useEffect } from "react";

// Mock function - replace with your actual API call
async function fetchUserPermissions(): Promise<UserPermissions> {
  return {
    invoice_air_ticket: ["CREATE", "READ", "UPDATE", "DELETE"],
    projects: ["READ"],
    dashboardAnalytics: ["CREATE"],
    clients: ["READ"],
    sales_report: ["READ"],
  };
}

export function usePermissions() {
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPermissions()
      .then(setPermissions)
      .finally(() => setLoading(false));
  }, []);

  return { permissions, loading };
}
