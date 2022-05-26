import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircleIcon from "@mui/icons-material/Circle";
import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";

const testData = [
  {
    material_id: 2,
    business_id: 1,
    measurement_id: 1,
    safety_stock_qty: 0.1,
    name: "Jamur Tiram",
  },
  {
    material_id: 3,
    business_id: 1,
    measurement_id: 3,
    safety_stock_qty: 0.3,
    name: "Minyak Goreng",
  },
];

const headCells = [
  { label: "NO" },
  { label: "NAME" },
  { label: "QTY" },
  { label: "MEAS." },
  { label: "STATUS" },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "6px 10px",
  [`&.${tableCellClasses.head}`]: {
    color: "#464F60",
    fontSize: 10,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F2F5FA",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFFFFF",
  },
  // "&:hover": {
  //   backgroundColor: "#E8EBEF",
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function MaterialTable() {
  const ROWS_PER_PAGE = 10;

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer
      component={Box}
      sx={{
        backgroundColor: "#F4F7FC",
        boxShadow:
          "0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1), 0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12), 0px 0px 1.27568px rgba(0, 0, 0, 0.08);",
        borderRadius: "5px",
        minWidth: "404px",
        maxWidth: "40%",
        overflowX: "hidden",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <Stack
              component={StyledTableCell}
              alignItems="center"
              justifyItems="center"
            >
              <InfoIcon sx={{ width: "17px" }} />
            </Stack>
            {headCells.map((cell) => (
              <StyledTableCell key={cell.label}>{cell.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {testData
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((data, i) => (
              <StyledTableRow key={data.material_id}>
                <StyledTableCell
                  sx={{ width: "30px", padding: 0 }}
                  align="center"
                >
                  <Checkbox
                    color="primary"
                    size="small"
                    defaultChecked={i === 0}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ width: "35px" }}>
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell>{data.name}</StyledTableCell>
                <StyledTableCell sx={{ width: "60px" }}>0</StyledTableCell>
                <StyledTableCell sx={{ width: "60px" }}>Kg</StyledTableCell>
                <StyledTableCell sx={{ width: "70px" }}>
                  <CircleIcon color="signatureGreen" fontSize="10" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          <StyledTableRow>
            <StyledTableCell colSpan={12} sx={{ padding: 0 }}>
              <TablePagination
                component="div"
                count={testData.length}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    minHeight: "40px",
                  },
                }}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
