//@ts-ignore
import styles from "./styles.module.scss";
import {
  Box,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Card from "../../components/card/Card";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api, valueRegister } from "../../services/api";
import { parseCookies } from "nookies";
import CustomSwitch from "./../../components/CustomSwitch";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function reloadPage() {
    window.location.reload();
  }

  function handleAdd(data) {
    setLoading(true);
    try {
      setTimeout(function () {
        setLoading(false);
        valueRegister(data.identificator, data.value, data.expend);
        alert("O valor foi cadastrado com sucesso");
      }, 2000);
      setTimeout(function () {
        reloadPage();
      }, 3000);

      return;
    } catch (err) {
      alert("Erro ao cadastrar o valor");
    }
  }

  const [entries, setEntries] = useState(0);
  const [expends, setExpends] = useState(0);
  const [total, setTotal] = useState("0");
  const [finances, setFinances] = useState<[any]>();

  async function getFinancials() {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = await api.get("financials", {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });

    const allFinances = response.data;

    const financialEntries = response.data
      .filter((financial) => !financial.expend)
      .map((financial) => financial.value);

    const entries = financialEntries
      .reduce((acc, number) => acc + number, 0)
      .toFixed(2);

    const financialExpends = response.data
      .filter((financial) => financial.expend)
      .map((financial) => financial.value);

    const expends = financialExpends
      .reduce((acc, number) => acc + number, 0)
      .toFixed(2);

    const total = Math.abs(entries - expends).toFixed(2);

    setEntries(entries);
    setExpends(expends);
    setTotal(`${Number(entries) < Number(expends) ? "-" : ""} ${total}`);
    setFinances(allFinances);
  }

  useEffect(() => {
    getFinancials();
  }, []);

  async function handleDelete(row) {
    const cookie = parseCookies(undefined, "authorization_token");
    const response = api.delete(`financials/${row.id}`, {
      headers: {
        Authorization: `Bearer ${cookie.authorization_token}`,
      },
    });
    alert("O valor foi excluído com sucesso");
    setTimeout(function () {
      reloadPage();
    }, 100);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 90 },
    { field: "identificator", headerName: "Identificação", width: 200 },
    { field: "value", headerName: "Valor", width: 200 },
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
    {
      field: "Tipo de despesa",
      renderCell: (cellValues) => {
        const dataGridValue = cellValues.row.expend;
        if (dataGridValue === false) {
          return <>Entrada</>;
        }
        return <>Saída</>;
      },
      width: 130,
    },
  ];

  return (
    <Box>
      <Header />
      <Box className={styles.container}>
        <Box className={styles.card}>
          <Card
            title={"Entradas"}
            icon={
              <PaidIcon
                color="success"
                fontSize="large"
                className={styles.icon}
              />
            }
            value={entries.toString()}
          />

          <Card
            title={"Saídas"}
            icon={
              <PaidIcon
                color="error"
                fontSize="large"
                className={styles.icon}
              />
            }
            value={` -${expends}`}
          />
          <Card
            title={"Total"}
            icon={<CalculateIcon fontSize="large" className={styles.icon} />}
            value={total}
          />
        </Box>
        <Box className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit(handleAdd)}>
            <Box className={styles.textField}>
              <Stack spacing={2}>
                <CustomInput
                  name="identificator"
                  type="text"
                  label="Identificação do valor"
                  {...register("identificator", {
                    required: "O campo está em branco verifique!",
                  })}
                  error={!!errors?.identificator}
                  helperText={
                    errors.identificator
                      ? errors.identificator.message.toString()
                      : null
                  }
                />
                <CustomInput
                  name="value"
                  label="Valor"
                  {...register("value", {
                    required: "O campo está em branco verifique!",
                  })}
                  error={!!errors?.value}
                  helperText={
                    errors.value ? errors.value.message.toString() : null
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <FormControlLabel
                control={
                  <CustomSwitch
                    className={styles.checkbox}
                    {...register("expend")}
                  />
                }
                label="Saída"
              />
            </Box>
            <Box className={styles.button}>
              <CustomButton
                size="large"
                endIcon={<AddCircleOutlineIcon />}
                loading={loading}
                type="submit"
              >
                Adicionar
              </CustomButton>
            </Box>
          </form>
          <Box className={styles.table}>
            <DataGrid
              rows={finances || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
