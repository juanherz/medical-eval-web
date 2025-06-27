"use client";
export const dynamic = 'force-dynamic';  // evita prerender estático

import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";   // ⭐ nuevo
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function TasksTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      // ► obtén el ID token con el módulo Auth (v6)
      const { tokens } = await fetchAuthSession();
      const idToken = tokens?.idToken?.toString();

      const res = await fetch(
        "https://3c7hgenv3f.execute-api.us-east-1.amazonaws.com/tasks?limit=20",
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      const data = await res.json();
      setRows(data.items || []);
    })();
  }, []);

  return (
    <div style={{ margin: 32 }}>
      <h2>Mis tareas</h2>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={[
            { field: "taskName", headerName: "Nombre", flex: 1 },
            { field: "evaluationType", headerName: "Tipo", width: 180 }
          ]}
          getRowId={(r) => r.taskId}
          pageSize={20}
        />
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Authenticator hideSignUp>
      {() => <TasksTable />}
    </Authenticator>
  );
}
