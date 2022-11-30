//@ts-ignore
import styles from "./styles.module.scss";
import { Box, IconButton } from "@mui/material";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { parseCookies } from "nookies";
import { api } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomButton } from "./../../components/CustomButton";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";


const User = () => {
  const [users, setUsers] = useState<[any]>();
  const navigate = useNavigate();
  async function getUsers() {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = await api.get("users", {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });

    const allUsers = response.data;

    setUsers(allUsers);
  }

  useEffect(() => {
    getUsers();
  }, []);

  
  function reloadPage() {
    window.location.reload();
  }

  async function handleDelete(row) {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = api.delete(`users/${row.id}`, {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });
    alert("O usuário foi excluído com sucesso");
    setTimeout(function () {
      reloadPage();
    }, 100);
  }


  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "username", headerName: "Email", width: 300 },
    {
      field: "Excluir",
      renderCell: (cellValues) => {
        const datGridValue = cellValues.row.id;
        return (
          <IconButton
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => handleDelete(cellValues.row)}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
      width: 130,
    },
  ];

  console.log(users);

  return (
    <Box>
      <Header />
      <Box className={styles.container}>
        <Box className={styles.title}>
          <Typography variant="h4" className={styles.typography} sx={{ fontWeight:"bold"}}>Usuários</Typography>
        </Box>
        <Box className={styles.table}>
          <DataGrid
            rows={users || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
        <Box className={styles.newUser}>
          <Box>
            <CustomButton
            onClick={() => navigate("/newUsers")}
              endIcon={
                <PersonAddOutlinedIcon
                  sx={{
                    marginBottom: "0.250rem",
                    marginRight: "0.250rem",
                  }}
                />
              }

              className={styles.button}
            >
              Novo Usuário
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default User;
