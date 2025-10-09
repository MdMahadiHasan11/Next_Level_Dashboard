"use client";

import { UserPermissions } from "@/constant/button-manu-data";
import { useState, useEffect } from "react";

// Mock function - replace with your actual API call
async function fetchUserPermissions(): Promise<UserPermissions> {
  // This would be your actual API call
  // For now, returning mock data
  return {
    invoice_air_ticket: ["CREATE", "READ", "UPDATE", "DELETE"],
  };
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<UserPermissions>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPermissions()
      .then(setPermissions)
      .finally(() => setLoading(false));
  }, []);

  return { permissions, loading };
}
